import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveVideoToFirestore(userId: string, videoUrl: string, title: string) {
  await addDoc(collection(db, "videos"), {
    userId,
    videoUrl,
    title,
    createdAt: serverTimestamp(),
  });
}
