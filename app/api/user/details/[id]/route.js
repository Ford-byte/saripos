import { cacheValidator } from "@/app/api/add-ons/cacheValidator";
import { queryDatabase } from "@/app/api/config/route";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const cacheKey = `detail_${id}`;
    const cachedData = await cacheValidator({ action: "get", key: cacheKey });

    if (cachedData) {
      return NextResponse.json({
        message: "Fetch Success (from cache)",
        data: cachedData,
      });
    }

    // Query the database with the user ID
    const query = `
      SELECT * 
      FROM user_details AS ud
      LEFT JOIN user AS u ON ud.user_id = u.id
      LEFT JOIN details AS d ON ud.details_id = d.id 
      WHERE ud.user_id = ?
    `;

    const response = await queryDatabase(query, [id]);

    if (!response || response.length === 0) {
      return NextResponse.json({ message: "Please provide details." }, { status: 404 });
    }

    // Cache the response data
    await cacheValidator({ action: "set", key: cacheKey, data: response });

    return NextResponse.json({
      message: "Fetch Success",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
