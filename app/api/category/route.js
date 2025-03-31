import { NextResponse } from "next/server";
import { queryDatabase } from "../config/route";
import { v4 as uuid } from "uuid";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { cacheValidator } from "../add-ons/cacheValidator";

export async function GET() {
  try {
    const cachedData = cacheValidator({ action: "get", key: "categories" });

    if (cachedData) {
      return NextResponse.json({
        message: "Fetch Success (from cache)",
        data: cachedData,
      });
    }

    const query = `SELECT * FROM category`;
    const response = await queryDatabase(query);

    cacheValidator({ action: "set", key: "categories", data: response });

    return NextResponse.json({
      message: "Fetch Success",
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Invalid Content-Type. Expected multipart/form-data." },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const category = formData.get("category");
    const file = formData.get("image");

    if (!category || !file) {
      return NextResponse.json(
        { message: "Category and image are required" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "upload/category");
    await mkdir(uploadDir, { recursive: true });

    const imageName = `${uuid()}.png`;
    const imagePath = path.join(uploadDir, imageName);
    await writeFile(imagePath, buffer);

    const id = uuid();
    const query = `INSERT INTO category(id, category, image, flag) VALUES(?,?,?,1)`;
    await queryDatabase(query, [id, category, `/upload/category/${imageName}`]);

    cacheValidator({ action: "delete", key: "categories" });

    return NextResponse.json({ message: "Category added successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
