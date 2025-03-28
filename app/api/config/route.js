import { createPool } from "mysql2";

const pool = createPool({
  host: process.env.NEXT_DB_HOST,
  user: process.env.NEXT_DB_USER,
  password: process.env.NEXT_DB_PASSWORD,
  database: process.env.NEXT_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

export const queryDatabase = async (query, params) => {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      connection.release();
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export async function GET() {
  try {
    const result = await queryDatabase("SELECT NOW() AS currentTime", []);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Database connected",
        data: result,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Database connection failed",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
