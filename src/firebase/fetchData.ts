import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";

// Fetch all followers
export async function getFollowers(userId: string) {
  const snapshot = await getDocs(collection(db, "users", userId, "followers"));
  return snapshot.docs.map(doc => doc.id);
}

// Fetch all users you are following
export async function getFollowing(userId: string) {
  const snapshot = await getDocs(collection(db, "users", userId, "following"));
  return snapshot.docs.map(doc => doc.id);
}
