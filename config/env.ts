import { config } from "dotenv";

config({ path: ".env" });

export const {
  DATABASE_URL,
  JWT_SECRET,

  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,

  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = process.env;
