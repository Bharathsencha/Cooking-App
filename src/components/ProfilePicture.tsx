import { useState } from "react";
import { uploadProfilePicture } from "../firebase/profile"; // This will remain unchanged


import { auth } from "../firebase/config";

export default function ProfilePicture() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not logged in");

      await uploadProfilePicture(userId, file); // Restore original upload logic



      alert("Profile picture updated!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Update Profile Picture</h2>
      <label htmlFor="profile-picture" className="block mb-2">Choose a profile picture</label>
      <input
        id="profile-picture"
        type="file"
        accept="image/*"
        title="Select a profile picture"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button className="mt-2 bg-primary text-white px-4 py-2 rounded" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}
