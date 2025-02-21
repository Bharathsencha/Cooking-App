import { storage, db } from "./config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

export async function uploadProfilePicture(userId: string, file: File) {
  const storageRef = ref(storage, `profilePictures/${userId}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  await updateDoc(doc(db, "users", userId), { profilePicture: downloadURL });
  return downloadURL;
}
