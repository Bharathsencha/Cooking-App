import { useState } from "react";
import { uploadVideoToCloudinary } from "../firebase/cloudinary";
import { saveVideoToFirestore } from "../firebase/videos";
import { auth } from "../firebase/config";

export default function UploadVideo() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) {
      alert("Please select a file and enter a title!");
      return;
    }

    setUploading(true);
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not logged in");

      // Upload video to Cloudinary
      const videoUrl = await uploadVideoToCloudinary(file);

      // Save video details in Firestore
      await saveVideoToFirestore(userId, videoUrl, title);

      alert("Video uploaded successfully!");
      setFile(null);
      setTitle("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console.");
    }
    setUploading(false);
  };

  return (
    <div className="p-4 bg-card shadow-md rounded-md text-center">
      <h2 className="text-lg font-semibold mb-2">Upload Video</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <input
        type="text"
        placeholder="Enter video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
