import cloudinary from "./cloudinary";

export async function uploadPDF(
  file: File,
  folder: string,
  resourceType: "image" | "raw" = "image"
) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadedFile = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });

  return uploadedFile;
}