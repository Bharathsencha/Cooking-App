Go to https://cloudinary.com/ and make an account 
the  do : npm install cloudinary
Go to Dashboard → Note these values:

    Cloud Name
    API Key
    API Secret (Don’t share this!)

Create an Upload Preset (optional but recommended):

    Go to Settings → Upload
    Under Upload presets, click Add Upload Preset
    Name it something like "video_uploads"
    Set Signing Mode to "Unsigned"
    Click Save

in "cloudinary.ts" 
modify : formData.append("upload_preset", "your-upload-preset"); // Replace with your Cloudinary preset

and https://api.cloudinary.com/v1_1/your-cloud-name/video/upload`, // Replace with your Cloud Name


 Find Your Upload Preset in Cloudinary

1️⃣ Go to Cloudinary → Cloudinary Dashboard
2️⃣ Click on Settings (⚙️) in the top-right corner.
3️⃣ Select the Upload tab.
4️⃣ Scroll down to Upload presets.
5️⃣ Find an existing preset and copy its name. (It will look something like "ml_default" or "video_uploads").


>>>>Chnages made :

made new files in firebase 

    cloudinary.ts
    config.ts
    fetchdata.cs
    follow.cs
    storage.ts
    video.ts
    profile.ts

made new files in components:

    profilepicture.tsx
    uploadvideo.tsx



also mofifies homepage to have upload option