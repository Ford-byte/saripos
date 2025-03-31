import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { queryDatabase } from "../../config/route";

const JWT_SECRET = "your_jwt_secret_key";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    const query = `SELECT id, password, role, flag FROM user WHERE username = ?`;
    const response = await queryDatabase(query, [username]);

    if (response.length === 0) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const user = response[0];

    if (user.flag === 0) {
      return NextResponse.json(
        { message: "Account disabled by admin" },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // For the admin role, let's return the token and a success message as well.
    if (user.role === "admin") {
      return NextResponse.json(
        { message: "Hello Admin.", token, data: user },
        { status: 200 }
      );
    }

    // For the user role, send the login token.
    if (user.role === "user") {
      return NextResponse.json(
        { message: "Login successful", token, data: user },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message || error },
      { status: 500 }
    );
  }
}
