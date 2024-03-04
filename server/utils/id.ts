import { alphabet, generateRandomString } from "oslo/crypto";

export function generateRandomID(prefix?: string) {
  const id = generateRandomString(10, alphabet("a-z", "0-9", "A-Z"));
  return prefix ? `${prefix}_${id}` : id;
}
