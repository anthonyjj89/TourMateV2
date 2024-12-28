import mongoose, { type Error as MongooseError } from "mongoose";

let isConnected = false;

export async function connectToDatabase(uri: string) {
  if (isConnected) {
    return;
  }

  try {
    const options = {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(uri, options);

    isConnected = true;
    console.log("Connected to MongoDB");

    // Handle connection errors
    mongoose.connection.on("error", (error: MongooseError) => {
      console.error("MongoDB connection error:", error);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
      isConnected = false;
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
      } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    isConnected = false;
    throw error;
  }
}

export async function disconnectFromDatabase() {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
}

export function getConnection() {
  return mongoose.connection;
}

export function isConnectedToDatabase() {
  return isConnected;
}
