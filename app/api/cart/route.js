import { NextResponse } from "next/server";
import { queryDatabase } from "../config/route";
import { v4 as uuid } from "uuid";
import { cacheValidator } from "../add-ons/cacheValidator";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    const cachedData = cacheValidator({ action: "get", key: "cart" });

    if (cachedData) {
      return NextResponse.json({
        message: "Fetch Success (from cache)",
        data: cachedData,
      });
    }

    const query = `SELECT * FROM cart WHERE flag = 1 AND user_id = ?`;
    const response = await queryDatabase(query, [userId]);

    if (response) {
      cacheValidator({ action: "set", key: "cart", data: response });
    }

    return NextResponse.json({
      message: "Fetch Success",
      data: response || [],
    });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message || error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { userId, cart } = await req.json();

    if (!userId || !cart) {
      return NextResponse.json(
        { message: "User ID and cart data are required" },
        { status: 400 }
      );
    }

    const isFound = await queryDatabase(
      `SELECT * FROM cart WHERE user_id = ?`,
      [userId]
    );

    if (isFound.length > 0) {
      // Call PUT method to update the cart
      return await PUT({
        json: async () => ({ id: isFound[0].id, cart }),
      });
    }

    const query = `INSERT INTO cart(id, user_id, cart, flag) VALUES(?, ?, ?, 1)`;
    const response = await queryDatabase(query, [
      uuid(),
      userId,
      JSON.stringify(cart),
    ]);

    if (response?.affectedRows) {
      cacheValidator({ action: "set", key: "cart", data: cart });
      return NextResponse.json({
        message: "Insert Success",
        data: response,
      });
    }

    return NextResponse.json({ message: "Insert failed" }, { status: 400 });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message || error },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, cart } = await req.json();

    if (!id || !cart) {
      return NextResponse.json(
        { message: "ID and cart data are required" },
        { status: 400 }
      );
    }

    const query = `UPDATE cart SET cart = ? WHERE id = ?`;
    const response = await queryDatabase(query, [JSON.stringify(cart), id]);

    if (response?.affectedRows) {
      cacheValidator({ action: "delete", key: "cart" });
      cacheValidator({ action: "set", key: "cart", data: cart });
      return NextResponse.json({
        message: "Update Success",
        data: response,
      });
    }

    return NextResponse.json({ message: "Update failed" }, { status: 400 });
  } catch (error) {
    console.error("Error in PUT:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message || error },
      { status: 500 }
    );
  }
}
