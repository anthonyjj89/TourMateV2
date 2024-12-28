import { type User, type DatabaseUser } from "@repo/types";
import { AuthenticationError, ValidationError } from "@repo/shared";
import bcrypt from "bcryptjs";
import { signToken, type JWTPayload } from "./tokens";

export interface AuthService {
  database: {
    findUserByEmail: (email: string) => Promise<DatabaseUser | null>;
    findUserById: (id: string) => Promise<DatabaseUser | null>;
    createUser: (user: Omit<DatabaseUser, "id" | "createdAt" | "updatedAt">) => Promise<DatabaseUser>;
    updateUser: (id: string, data: Partial<DatabaseUser>) => Promise<DatabaseUser>;
  };
}

export class AuthenticationService {
  constructor(private readonly service: AuthService) {}

  async validateCredentials(
    email: string,
    password: string
  ): Promise<User> {
    const user = await this.service.database.findUserByEmail(email);
    if (!user) {
      throw new AuthenticationError("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new AuthenticationError("Invalid email or password");
    }

    // Return User without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async generateAuthToken(user: User): Promise<string> {
    const payload: JWTPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return signToken(payload);
  }

  async registerUser(
    email: string,
    password: string,
    name: string
  ): Promise<{ user: User; token: string }> {
    // Check if user already exists
    const existingUser = await this.service.database.findUserByEmail(email);
    if (existingUser) {
      throw new ValidationError("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const dbUser = await this.service.database.createUser({
      email,
      password: hashedPassword,
      name,
      role: "user", // Default role
    });

    // Remove password from response
    const { password: _, ...user } = dbUser;

    // Generate token
    const token = await this.generateAuthToken(user);

    return { user, token };
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.service.database.findUserById(userId);
    if (!user) {
      throw new AuthenticationError("User not found");
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      throw new AuthenticationError("Invalid current password");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user
    await this.service.database.updateUser(userId, {
      password: hashedPassword,
    });
  }

  async updateProfile(
    userId: string,
    data: Pick<User, "name" | "email">
  ): Promise<User> {
    const user = await this.service.database.findUserById(userId);
    if (!user) {
      throw new AuthenticationError("User not found");
    }

    // If email is being changed, check if new email is available
    if (data.email && data.email !== user.email) {
      const existingUser = await this.service.database.findUserByEmail(data.email);
      if (existingUser) {
        throw new ValidationError("Email already in use");
      }
    }

    // Update user
    const updatedDbUser = await this.service.database.updateUser(userId, data);
    
    // Remove password from response
    const { password: _, ...updatedUser } = updatedDbUser;
    return updatedUser;
  }
}
