import { config } from "@repo/config";
import { connectToDatabase, disconnectFromDatabase } from "./connection";
import { UserService } from "./services/user-service";

async function testUser() {
  try {
    console.log("Testing user service...");
    console.log(`URI: ${config.database.MONGODB_URI}`);
    console.log(`Database: ${config.database.MONGODB_DB_NAME}`);

    await connectToDatabase(config.database.MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB!");

    const userService = new UserService();

    // Test creating a user
    console.log("\nTesting user creation...");
    const newUser = await userService.createUser({
      email: "test@example.com",
      password: "password123",
      name: "Test User",
      role: "user",
    });
    console.log("✅ Successfully created user:", newUser);

    // Test finding user by email
    console.log("\nTesting find user by email...");
    const foundUser = await userService.findUserByEmail("test@example.com");
    console.log("✅ Successfully found user:", foundUser);

    // Test updating user
    console.log("\nTesting user update...");
    const updatedUser = await userService.updateUser(newUser.id, {
      name: "Updated Test User",
    });
    console.log("✅ Successfully updated user:", updatedUser);

    // Test deleting user
    console.log("\nTesting user deletion...");
    await userService.deleteUser(newUser.id);
    console.log("✅ Successfully deleted user");

    // Verify user is deleted
    console.log("\nVerifying user deletion...");
    const deletedUser = await userService.findUserById(newUser.id);
    if (!deletedUser) {
      console.log("✅ User successfully deleted");
    } else {
      console.log("❌ User still exists");
    }

    await disconnectFromDatabase();
    console.log("\n✅ Successfully disconnected from MongoDB!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error testing user service:", error);
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

testUser();
