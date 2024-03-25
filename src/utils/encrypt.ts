import { AES, enc } from "crypto-js";

const SECRET_KEY = process.env.ENCRYPTION_KEY || "your-default-secret-key";

export const encryptString = (text: any) => {
  const encrypted = AES.encrypt(text, SECRET_KEY).toString();
  return removeSlashes(encrypted);
};

export const decryptString = (ciphertext: any) => {
  const adjustedCiphertext = addSlashes(ciphertext);
  const bytes = AES.decrypt(adjustedCiphertext, SECRET_KEY);
  const decrypted = bytes.toString(enc.Utf8);
  return decrypted;
};

// Function to replace slashes with dashes
const removeSlashes = (input: string): string => {
  return input.replace(/\//g, "-");
};

// Function to replace dashes with slashes
const addSlashes = (input: string): string => {
  return input.replace(/-/g, "/");
};
