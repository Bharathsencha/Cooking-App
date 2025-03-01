import { useState, DragEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, FileVideo, AlertCircle } from "lucide-react";

import { uploadVideoToCloudinary } from "../firebase/cloudinary";
import { saveVideoToFirestore } from "../firebase/videos";
import { auth } from "../firebase/config";

import imageCompression from "browser-image-compression";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();

const loadFFmpeg = async () => {
  if (!ffmpeg.loaded) {
    await ffmpeg.load();
  }
};

export default function UploadVideo({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    await loadFFmpeg();

    const inputName = "input.mp4";
    const outputName = "output.mp4";

    ffmpeg.writeFile(inputName, await fetchFile(file));

    await ffmpeg.exec([
      "-i", inputName,
      "-vf", "scale=-1:720",  // Rescale to max 720p
      "-c:v", "libx264", "-crf", "28",  // Lower quality slightly to save space
      "-preset", "fast",
      outputName
    ]);

    const data = await ffmpeg.readFile(outputName);
    return new File([data], "compressed.mp4", { type: "video/mp4" });
  };

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };

    let compressedFile = await imageCompression(file, options);

    if (file.type === "image/png") {
      compressedFile = await imageCompression.getFilefromDataUrl(
        await imageCompression.getDataUrlFromFile(compressedFile),
        "image/jpeg"
      );
    }

    return compressedFile;
  };

  const handleUpload = async () => {
    if (!file || !title) {
      setError("Please select a file and enter a title!");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const { currentUser: user } = auth;
      const userId = user?.uid;
      if (!userId) {
        setError("You must be logged in to upload a video.");
        setUploading(false);
        return;
      }

      let processedFile = file;

      if (file.type.startsWith("video/")) {
        processedFile = await compressVideo(file);
      } else if (file.type.startsWith("image/")) {
        processedFile = await compressImage(file);
      }

      const videoUrl = await uploadVideoToCloudinary(processedFile);
      await saveVideoToFirestore(userId, videoUrl, title);

      alert("Upload successful!");
      onClose();

      setFile(null);
      setTitle("");
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed. Please try again.");
    }

    setUploading(false);
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
                      <FileVideo className="h-12 w-12 text-green-500 mb-3" />
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
                      placeholder="Enter video title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border p-3 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                  <Button onClick={onClose} variant="outline">
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                  <Button onClick={handleUpload} disabled={uploading || !file || !title}>
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload"}
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