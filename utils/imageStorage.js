import { Directory, File, Paths } from "expo-file-system";

const imageDirectory = new Directory(Paths.document, "recipe-images");

export async function saveImage(uri) {
  imageDirectory.create({ idempotent: true, intermediates: true });

  const source = new File(uri);
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${source.extension || ".jpg"}`;
  const destination = new File(imageDirectory, fileName);

  await source.copy(destination);
  return fileName;
}

export function getImageUri(image) {
  return image.startsWith("http") ? image : new File(imageDirectory, image).uri;
}

export function deleteImage(image) {
  if (!image || image.startsWith("http")) return;

  const file = new File(imageDirectory, image);
  if (file.exists) file.delete();
}

export function createUploadFile(uri) {
  return new File(uri);
}
