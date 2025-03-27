import { NextResponse } from "next/server";
import { queryDatabase } from "../config/route";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const query = `SELECT * FROM user`;

    const response = await queryDatabase(query);

    return NextResponse.json({
      message: "Fetch Success",
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required." },
        { status: 400 }
      );
    }

    const findUserQuery = `SELECT 1 FROM user WHERE username = ?`;
    const isUserExists = await queryDatabase(findUserQuery, [username]);

    if (isUserExists.length > 0) {
      return NextResponse.json(
        { message: "Account already in use." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = `INSERT INTO user(id, username, password, flag) VALUES(?,?,?,1)`;

    await queryDatabase(insertUserQuery, [uuid(), username, hashedPassword]);

    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/user:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
