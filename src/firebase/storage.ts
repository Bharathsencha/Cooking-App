import { storage } from "./config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export async function uploadVideo(file: File, userId: string) {
  const storageRef = ref(storage, `videos/${userId}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}
