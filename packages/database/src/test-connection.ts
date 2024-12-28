import { config } from "@repo/config";
import { connectToDatabase, disconnectFromDatabase } from "./connection";
import mongoose from "mongoose";

async function testConnection() {
  try {
    console.log("Testing database connection...");
    console.log(`URI: ${config.database.MONGODB_URI}`);
    console.log(`Database: ${config.database.MONGODB_DB_NAME}`);

    await connectToDatabase(config.database.MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB!");

    // Test listing collections
    if (!mongoose.connection.db) {
      throw new Error("Database connection not established");
    }
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\nAvailable collections:");
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

    await disconnectFromDatabase();
    console.log("\n✅ Successfully disconnected from MongoDB!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error testing database connection:", error);
    process.exit(1);
  }
}

// Handle process termination
process.on("SIGINT", async () => {
  try {
    await disconnectFromDatabase();
    console.log("\n✅ Gracefully disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error disconnecting from MongoDB:", error);
    process.exit(1);
  }
});

testConnection();
