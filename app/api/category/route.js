import { NextResponse } from "next/server";
import { queryDatabase } from "../config/route";
import { v4 as uuid } from "uuid";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import NodeCache from "node-cache";

// Initialize cache with a default TTL of 60 seconds
const cache = new NodeCache({ stdTTL: 60 });

export async function GET() {
  try {
    // Check if data is in cache
    const cachedData = cache.get("categories");
    if (cachedData) {
      return NextResponse.json({
        message: "Fetch Success (from cache)",
        data: cachedData,
      });
    }
    const query = `SELECT * FROM category`;
    const response = await queryDatabase(query);

    // Store the result in cache
    cache.set("categories", response);

    return NextResponse.json({
      message: "Fetch Success",
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Ensure request is multipart/form-data
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Invalid Content-Type. Expected multipart/form-data." },
        { status: 400 }
      );
    }

    // Parse the FormData
    const formData = await req.formData();
    const category = formData.get("category");
    const file = formData.get("image");

    // Validate input
    if (!category || !file) {
      return NextResponse.json(
        { message: "Category and image are required" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create upload directory
    const uploadDir = path.join(process.cwd(), "public", "upload");
    await mkdir(uploadDir, { recursive: true });

    // Save the image
    const imageName = `${uuid()}.png`;
    const imagePath = path.join(uploadDir, imageName);
    await writeFile(imagePath, buffer);

    // Insert into the database
    const id = uuid();
    const query = `INSERT INTO category(id, category, image, flag) VALUES(?,?,?,1)`;
    await queryDatabase(query, [id, category, `/upload/${imageName}`]);

    cache.del("categories");

    return NextResponse.json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Error in POST /category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
