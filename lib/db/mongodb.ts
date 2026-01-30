/* ============================================================================
   MongoDB Connection - Singleton Pattern for Serverless
   
   Uses singleton pattern to reuse MongoDB connections across
   serverless function invocations. This is critical for performance
   in serverless environments where cold starts are expensive.
   ============================================================================ */

import { MongoClient, type Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export interface MongoConnection {
  client: MongoClient;
  db: Db;
}

/**
 * Connect to MongoDB using singleton pattern
 * Reuses existing connection on subsequent calls (serverless optimization)
 */
export async function connectToDatabase(): Promise<MongoConnection> {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI environment variable is not defined. Please add it to your .env.local file."
    );
  }

  // Return cached connection if available
  if (cachedClient && cachedDb) {
    console.log("[MongoDB] Using cached connection");
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log("[MongoDB] Creating new connection...");

    const client = new MongoClient(mongoUri, {
      // Connection pool settings
      maxPoolSize: 10,
      minPoolSize: 2,
      // Timeout settings
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // Retry settings
      retryWrites: true,
      retryReads: true,
      // Compression
      compressors: ["snappy", "zlib"],
    });

    // Connect to MongoDB
    await client.connect();

    // Get database reference
    // const db = client.db("evision-it");
    const dbName = process.env.MONGODB_DB;

    if (!dbName) {
      throw new Error(
        "MONGODB_DB environment variable is not defined. Please add it to your .env.local file.",
      );
    }

    const db = client.db(dbName);

    // Verify connection with a ping
    await db.admin().ping();
    console.log("[MongoDB] Successfully connected to MongoDB");

    // Cache for subsequent calls
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("[MongoDB] Connection error:", error);
    throw error;
  }
}

/**
 * Get database reference (requires prior connection)
 */
export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

/**
 * Get collection from database
 */
export async function getCollection(collectionName: string) {
  const db = await getDatabase();
  return db.collection(collectionName);
}

/**
 * Close database connection (for cleanup)
 * Should be called during application shutdown
 */
export async function closeDatabaseConnection(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    console.log("[MongoDB] Connection closed");
  }
}

/**
 * Health check function to verify connection
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const db = await getDatabase();
    await db.admin().ping();
    return true;
  } catch {
    return false;
  }
}
