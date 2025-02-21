import { db } from "./config";
import { doc, setDoc } from "firebase/firestore";

export async function followUser(currentUserId: string, targetUserId: string) {
  const currentUserRef = doc(db, "users", currentUserId, "following", targetUserId);
  const targetUserRef = doc(db, "users", targetUserId, "followers", currentUserId);

  await setDoc(currentUserRef, { followedAt: new Date() });
  await setDoc(targetUserRef, { followedAt: new Date() });
}
