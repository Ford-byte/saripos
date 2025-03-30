import { cacheValidator } from "@/app/api/add-ons/cacheValidator";
import { queryDatabase } from "@/app/api/config/route";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const cacheKey = `user_profile_${userId}`;
    const cachedData = await cacheValidator({ action: "get", key: cacheKey });

    if (cachedData) {
      return NextResponse.json({
        message: "Fetch Success (from cache)",
        data: cachedData,
      });
    }

    // Query user profile data
    const query = `
      SELECT * FROM user_profile AS up
      LEFT JOIN profile AS p ON up.profile_id = p.id
      WHERE up.user_id = ?
    `;

    const userProfile = await queryDatabase(query, [userId]);

    if (!userProfile || userProfile.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Cache the fetched data
    await cacheValidator({ action: "set", key: cacheKey, data: userProfile });

    return NextResponse.json({
      message: "Fetch Success",
      data: userProfile,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
