import { createPool } from "mysql2";

// Create a connection pool
const pool = createPool({
  host: process.env.NEXT_DB_HOST,
  user: process.env.NEXT_DB_USER,
  password: process.env.NEXT_DB_PASSWORD,
  database: process.env.NEXT_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to get a connection from the pool
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

// Function to query the database
export const queryDatabase = async (query, params) => {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      connection.release(); // Release the connection back to the pool
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// GET function to test the database connection
export async function GET() {
  try {
    // Execute a simple query to check the connection
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
