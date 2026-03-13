import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { User, StudentProfile } from "@/types";

export const registerUser = async (
  email: string,
  password: string,
  role: "student" | "admin"
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userData: User = {
    uid: user.uid,
    email: user.email || email,
    role,
    createdAt: new Date(),
  };

  await setDoc(doc(db, "users", user.uid), {
    ...userData,
    createdAt: serverTimestamp(),
  });

  return userData;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<FirebaseUser> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

export const updateUserProfile = async (
  uid: string,
  profile: Partial<StudentProfile>
): Promise<void> => {
  await setDoc(
    doc(db, "users", uid),
    { profile, updatedAt: serverTimestamp() },
    { merge: true }
  );
};

export const getUserData = async (uid: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data() as User;
  }
  return null;
};

export const updateUserName = async (
  firebaseUser: FirebaseUser,
  displayName: string
): Promise<void> => {
  await updateProfile(firebaseUser, { displayName });
};

