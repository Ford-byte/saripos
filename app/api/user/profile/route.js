import { queryDatabase } from "@/app/api/config/route";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const userId = formData.get("id");
    const file = formData.get("image");

    if (!userId || !file || !(file instanceof Blob)) {
      return NextResponse.json(
        { message: "Invalid input: User ID and valid image file are required" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}_${file.name || "upload.jpg"}`;
    const filePath = path.join(uploadDir, fileName);

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileBuffer);

    const imageUrl = `/uploads/${fileName}`;
    const profileId = uuidv4();

    const query = `
      INSERT INTO profile (id, image, flag) VALUES (?, ?, 1)
    `;
    await queryDatabase(query, [profileId, imageUrl]);

    const queryTwo = `INSERT INTO user_profile (id, user_id, profile_id, flag) VALUES (?, ?, ?, 1)`;
    await queryDatabase(queryTwo, [uuidv4(), userId, profileId]);

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
