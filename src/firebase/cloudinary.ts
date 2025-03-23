export const uploadVideoToCloudinary = async (file: File, progressCallback: (progress: number) => void) => {
  // Create a new XMLHttpRequest to track upload progress
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    // Add the necessary data to formData
    formData.append("file", file);
    formData.append("upload_preset", "foodieshare"); // Your Cloudinary preset
    
    // Set up progress event listener
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && progressCallback) {
        const progress = event.loaded / event.total;
        progressCallback(progress);
      }
    });
    
    // Set up load event listener for completion
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        reject(new Error(`Upload failed with status: ${xhr.status}`));
      }
    });
    
    // Set up error event listener
    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"));
    });
    
    // Set up abort event listener
    xhr.addEventListener("abort", () => {
      reject(new Error("Upload aborted"));
    });
    
    // Open and send the request
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dyroiweqo/video/upload", true);
    xhr.send(formData);
  });
};