import { useState, DragEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, FileVideo, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

import { uploadVideoToCloudinary } from "../firebase/cloudinary";
import { saveVideoToFirestore } from "../firebase/videos";
import { auth } from "../firebase/config";

import imageCompression from "browser-image-compression";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

export default function UploadVideo({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<string>("");
  const [compressionStats, setCompressionStats] = useState<{
    original: string;
    compressed: string;
  } | null>(null);
  const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
  const [ffmpegLoading, setFfmpegLoading] = useState(false);
  const [ffmpegLoadingTimeout, setFfmpegLoadingTimeout] = useState(false);
  const [isVideoFile, setIsVideoFile] = useState(false);

  // Check if file is video
  useEffect(() => {
    if (file) {
      setIsVideoFile(file.type.startsWith('video/'));
      
      // Only try to load FFmpeg if it's a video file
      if (file.type.startsWith('video/') && !ffmpeg && !ffmpegLoadingTimeout) {
        loadFFmpeg();
      }
    }
  }, [file]);

  // Initialize FFmpeg when needed
  const loadFFmpeg = () => {
    if (ffmpeg || ffmpegLoading) return;
    
    setFfmpegLoading(true);
    setError(null);
    
    // Set a timeout to abort FFmpeg loading if it takes too long
    const timeoutId = setTimeout(() => {
      setFfmpegLoadingTimeout(true);
      setFfmpegLoading(false);
      console.log("FFmpeg loading timed out");
    }, 15000); // 15 second timeout
    
    const load = async () => {
      const ffmpegInstance = new FFmpeg();
      
      ffmpegInstance.on('log', ({ message }) => {
        console.log("FFmpeg log:", message);
      });

      try {
        // Try loading from CDN first
        console.log("Loading FFmpeg from CDN...");
        await ffmpegInstance.load({
          coreURL: await toBlobURL(
            'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js', 
            'text/javascript'
          ),
          wasmURL: await toBlobURL(
            'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm', 
            'application/wasm'
          ),
          workerURL: await toBlobURL(
            'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.worker.js',
            'text/javascript'
          )
        });
        
        clearTimeout(timeoutId);
        setFfmpeg(ffmpegInstance);
        setFfmpegLoading(false);
        console.log("FFmpeg loaded successfully");
      } catch (error) {
        console.error("Error loading FFmpeg:", error);
        
        clearTimeout(timeoutId);
        setFfmpegLoading(false);
        setFfmpegLoadingTimeout(true);
      }
    };
    
    load();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const compressVideo = async (file: File): Promise<File> => {
    if (!ffmpeg) {
      throw new Error("FFmpeg not loaded");
    }

    setStage("Compressing video...");
    
    const inputName = "input.mp4";
    const outputName = "output.mp4";

    // Write the file to FFmpeg's virtual file system
    await ffmpeg.writeFile(inputName, await fetchFile(file));

    // Run compression command with simpler settings
    await ffmpeg.exec([
      "-i", inputName,
      "-c:v", "libx264", 
      "-crf", "15", // Higher CRF = more compression, lower quality
      "-preset", "fast", // Use faster encoding preset
      "-vf", "scale='-2:480'", // Scale to 480p height
      "-c:a", "aac", 
      "-b:a", "96k",
      outputName
    ]);

    // Read the compressed file
    const data = await ffmpeg.readFile(outputName);
    const compressedFile = new File([data], file.name.replace(/\.[^/.]+$/, "") + "_compressed.mp4", { 
      type: "video/mp4" 
    });
    
    // Calculate size stats
    const originalSize = (file.size / (1024 * 1024)).toFixed(2);
    const compressedSize = (compressedFile.size / (1024 * 1024)).toFixed(2);
    
    setCompressionStats({
      original: originalSize + " MB",
      compressed: compressedSize + " MB"
    });
    
    return compressedFile;
  };

  const compressImage = async (file: File): Promise<File> => {
    setStage("Compressing image...");
    
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
      onProgress: (progress: number) => {
        setProgress(Math.floor(progress * 50));
      }
    };

    try {
      const compressedFile = await imageCompression(file, options);
      
      // Calculate size stats
      const originalSize = (file.size / (1024 * 1024)).toFixed(2);
      const compressedSize = (compressedFile.size / (1024 * 1024)).toFixed(2);
      
      setCompressionStats({
        original: originalSize + " MB",
        compressed: compressedSize + " MB"
      });
      
      return compressedFile;
    } catch (error) {
      console.error("Image compression failed:", error);
      // If compression fails, return original
      return file;
    }
  };

  const handleUpload = async () => {
    if (!file || !title) {
      setError("Please select a file and enter a title!");
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);
    setStage("Preparing...");

    try {
      const { currentUser: user } = auth;
      const userId = user?.uid;
      if (!userId) {
        setError("You must be logged in to upload a video.");
        setUploading(false);
        return;
      }

      let processedFile: File;

      // Compression logic based on file type
      if (file.type.startsWith("video/")) {
        if (ffmpeg) {
          try {
            processedFile = await compressVideo(file);
          } catch (error) {
            console.error("Video compression failed:", error);
            // If compression fails, use original file
            processedFile = file;
            setStage("Compression skipped. Using original file...");
          }
        } else {
          // No FFmpeg, use original file
          processedFile = file;
          setStage("Uploading original video (without compression)...");
        }
      } else if (file.type.startsWith("image/")) {
        processedFile = await compressImage(file);
      } else {
        processedFile = file;
      }

      // Upload to Cloudinary with progress tracking
      setStage("Uploading to cloud...");
      const videoUrl = await uploadVideoToCloudinary(processedFile, (uploadProgress: number) => {
        // Start from 50% (after compression) and go to 90%
        const baseProgress = file.type.startsWith("video/") && !ffmpeg ? 0 : 50;
        setProgress(baseProgress + Math.floor(uploadProgress * (90 - baseProgress)));
      }) as string;

      // Save to Firestore
      setStage("Saving your post...");
      setProgress(90);
      await saveVideoToFirestore(userId, videoUrl, title);
      
      setProgress(100);
      setStage("Complete!");
      
      // Success message
      setTimeout(() => {
        alert("Upload successful!");
        onClose();
        setFile(null);
        setTitle("");
        setProgress(0);
        setStage("");
        setCompressionStats(null);
      }, 1000);
      
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed: " + (error instanceof Error ? error.message : String(error)));
      setUploading(false);
      setProgress(0);
      setStage("");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg">
            <CardTitle className="text-white font-bold flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Create a New Post
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {isVideoFile && ffmpegLoading && (
                <div className="bg-blue-50 border border-blue-200 text-blue-600 rounded-lg p-3 flex items-center justify-center mb-4">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  <p>Loading video processing capabilities...</p>
                </div>
              )}
              
              {isVideoFile && ffmpegLoadingTimeout && (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-lg p-3 flex items-start mb-4">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Video compression unavailable</p>
                    <p className="text-sm mt-1">Your video will be uploaded without compression. This may take longer depending on file size.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="file-upload" className="text-lg font-medium block mb-3">
                  Upload Video/Image
                </Label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-12 mb-6 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : file
                        ? "border-green-400 bg-green-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                  }`}
                >
                  {file ? (
                    <>
                      {file.type.startsWith('video/') ? (
                        <FileVideo className="h-12 w-12 text-green-500 mb-3" />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-green-500 mb-3" />
                      )}
                      <p className="text-green-600 font-medium text-center">{file.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 font-medium text-center">
                        Drag and drop a video or image file here
                      </p>
                      <p className="text-gray-400 text-sm mt-1">or use the button below</p>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <Input
                      id="file-upload"
                      type="file"
                      accept="video/*, image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />

                    <div className="flex justify-center mb-6">
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 flex items-center"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {file ? "Choose a different file" : "Select a file"}
                      </Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="video-title" className="text-lg font-medium block mb-2">
                      Post Title
                    </Label>
                    <Input
                      id="video-title"
                      type="text"
                      placeholder="Enter post title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {uploading && (
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{stage}</span>
                      <span className="text-sm font-medium text-gray-700">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    {compressionStats && (
                      <div className="bg-blue-50 border border-blue-100 text-blue-700 rounded-lg p-3 mt-3 text-sm">
                        <p className="font-medium mb-1">Compression Results:</p>
                        <div className="flex justify-between">
                          <span>Original size: {compressionStats.original}</span>
                          <span>Compressed size: {compressionStats.compressed}</span>
                          <span>Saved: {(parseFloat(compressionStats.original) - parseFloat(compressionStats.compressed)).toFixed(2)} MB</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end space-x-3 mt-8">
                  <Button onClick={onClose} variant="outline" disabled={uploading}>
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                  <Button 
                    onClick={handleUpload} 
                    disabled={uploading || !file || !title || (isVideoFile && ffmpegLoading)}
                    className={uploading ? "bg-blue-500 hover:bg-blue-500" : ""}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {stage}
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}