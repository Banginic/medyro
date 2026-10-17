import cloudinary from "./cloudinary";

export async function uploadPhoto(photo: any, folder: string) {
  let photoUrl = undefined;

  const arrayBuffer = await photo.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  photoUrl = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });
  return photoUrl;
}
