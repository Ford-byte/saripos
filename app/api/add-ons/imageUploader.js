import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(file) {
  try {
    if (!file || !(file instanceof Blob)) {
      throw new Error("Invalid file");
    }

    const mimeType = file.type;
    if (!mimeType.startsWith("image/")) {
      throw new Error("The requested resource isn't a valid image.");
    }

    const uploadDir = path.join(process.cwd(), "public", "upload");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${uuidv4()}.png`;
    const filePath = path.join(uploadDir, fileName);

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, fileBuffer);

    const imageUrl = `/upload/${fileName}`;
    return imageUrl;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
}
