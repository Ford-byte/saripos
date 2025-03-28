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
        {
          message: "Username and password are required",
        },
        { status: 400 }
      );
    }

    const query = `SELECT id,password, flag FROM user WHERE username = ?`;
    const response = await queryDatabase(query, [username]);

    if (response.length === 0) {
      return NextResponse.json(
        {
          message: "Invalid username or password",
        },
        { status: 401 }
      );
    }

    const user = response[0];

    if (user.flag === 0) {
      return NextResponse.json(
        {
          message: "Account disabled by admin",
        },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid username or password",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json(
      {
        message: "Login Successfully",
        token: token,
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
