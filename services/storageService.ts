import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/firebase/config";

const DOCUMENTS_FOLDER = "documents";

export interface UploadResult {
  url: string;
  path: string;
}

export const uploadFile = async (
  file: File,
  userId: string,
  documentType: string
): Promise<UploadResult> => {
  const timestamp = Date.now();
  const fileName = `${userId}/${documentType}/${timestamp}_${file.name}`;
  const storageRef = ref(storage, `${DOCUMENTS_FOLDER}/${fileName}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          url: downloadURL,
          path: uploadTask.snapshot.ref.fullPath,
        });
      }
    );
  });
};

export const deleteFile = async (path: string): Promise<void> => {
  const fileRef = ref(storage, path);
  await deleteObject(fileRef);
};

export const getFileUrl = async (path: string): Promise<string> => {
  const fileRef = ref(storage, path);
  return await getDownloadURL(fileRef);
};

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024;
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 10MB" };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Invalid file type. Allowed: PDF, JPEG, PNG, DOC, DOCX" };
  }

  return { valid: true };
};

