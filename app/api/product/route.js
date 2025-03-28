import { NextResponse } from "next/server";
import { queryDatabase } from "../config/route";
import { v4 as uuid } from "uuid";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { cacheValidator } from "../add-ons/cacheValidator";

export async function GET() {
  try {
    const cachedData = cacheValidator({ action: "get", key: "products" });

    if (cachedData) {
      return NextResponse.json({
        message: "Fetch Success (from cache)",
        data: cachedData,
      });
    }

    const query = `SELECT * FROM product`;
    const response = await queryDatabase(query);

    cacheValidator({ action: "set", key: "products", data: response });

    return NextResponse.json({
      message: "Fetch Success",
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
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
    const name = formData.get("name");
    const price = formData.get("price");
    const stockin = formData.get("stockin");
    const file = formData.get("image");
    const category = formData.get("category");

    if (!name || !price || !stockin || !file || !category) {
      return NextResponse.json(
        { message: "Name, price, stockin, and image are required" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "upload");
    await mkdir(uploadDir, { recursive: true });

    const imageName = `${uuid()}.png`;
    const imagePath = path.join(uploadDir, imageName);
    await writeFile(imagePath, buffer);

    const id = uuid();
    const query = `INSERT INTO product(id, name, price, stock_in, image, category, flag) VALUES(?,?,?,?,?,?,1)`;
    await queryDatabase(query, [
      id,
      name,
      price,
      stockin,
      `/upload/${imageName}`,
      category,
    ]);

    cacheValidator({ action: "delete", key: "products" });

    return NextResponse.json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error in POST /product:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
