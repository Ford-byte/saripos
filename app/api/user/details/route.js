import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { queryDatabase } from "../../config/route";
import { cacheValidator } from "../../add-ons/cacheValidator";

export async function GET() {
  try {
    const cachedData = cacheValidator({ action: "get", key: "details" });

    if (cachedData) {
      return NextResponse.json({
        message: "Fetch Success (from cache)",
        data: cachedData,
      });
    }

    const query = `SELECT * FROM details WHERE flag = 1`;
    const response = await queryDatabase(query);

    cacheValidator({ action: "set", key: "details", data: response });

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

export async function POST(req) {
  try {
    const { user_id, fullname, email, phone_number, gender, dob } =
      await req.json();

    if (!fullname || !email || !phone_number || !gender || !dob) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const details_id = uuid();

    const query = `INSERT INTO details(id, fullname, email, phone_number, gender, dob, flag) VALUES(?,?,?,?,?,?,1)`;
    
    const response = await queryDatabase(query, [
      details_id,
      fullname,
      email,
      phone_number,
      gender,
      dob,
    ]);

    const queryTwo = `INSERT INTO user_details(id, user_id, details_id,flag) VALUES(?,?,?,1)`;

    await queryDatabase(queryTwo, [uuid(), user_id, details_id]);

    cacheValidator({ action: "delete", key: "details" });

    return NextResponse.json({
      message: "Details added successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error adding data:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
