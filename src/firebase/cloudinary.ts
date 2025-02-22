export async function uploadVideoToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "foodieshare"); // Replace with your Cloudinary preset
  
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dyroiweqo/video/upload`, // Replace with your Cloud Name
      {
        method: "POST",
        body: formData,
      }
    );
  
    if (!response.ok) {
      throw new Error("Video upload failed!");
    }
  
    const data = await response.json();
    return data.secure_url; // Cloudinary URL for video
  }
  