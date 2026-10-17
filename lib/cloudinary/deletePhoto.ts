import cloudinary from "./cloudinary";

export async function deletePhoto(photoId: string) {
  if (photoId) {
    await cloudinary.uploader.destroy(photoId);
  }
}
