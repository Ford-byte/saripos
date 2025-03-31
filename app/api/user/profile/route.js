import { queryDatabase } from "@/app/api/config/route";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "../../add-ons/imageUploader";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const userId = formData.get("id");
    const file = formData.get("image");

    if (!userId || !file) {
      return NextResponse.json(
        { message: "Invalid input: User ID and valid image file are required" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(file);

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
