export async function saveImage(uri) {
  return uri;
}

export function getImageUri(image) {
  return image;
}

export function deleteImage() {}

export async function createUploadFile(uri) {
  const response = await fetch(uri);
  return response.blob();
}
