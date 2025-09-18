import { Client } from "pg";

export async function testDbConnection() {
  const connectionString =process.env.DATABASE_URL

  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log("✅ Database connection successful!");
    const res = await client.query("SELECT NOW()");
    console.log("🕒 DB Time:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  } finally {
    await client.end();
  }
}