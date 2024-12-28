import { DatabaseUser } from "@repo/types";
import { ValidationError } from "@repo/shared";
import { UserModel, type UserDocument } from "../models/user";

export class UserService {
  async findUserByEmail(email: string): Promise<DatabaseUser | null> {
    const user = await UserModel.findByEmail(email);
    if (!user) return null;
    return this.toDatabase(user);
  }

  async findUserById(id: string): Promise<DatabaseUser | null> {
    try {
      const user = await UserModel.findById(id);
      if (!user) return null;
      return this.toDatabase(user);
    } catch (error) {
      if (error instanceof Error && error.name === "CastError") {
        return null;
      }
      throw error;
    }
  }

  async createUser(data: Omit<DatabaseUser, "id" | "createdAt" | "updatedAt">): Promise<DatabaseUser> {
    const existingUser = await UserModel.findByEmail(data.email);
    if (existingUser) {
      throw new ValidationError("Email already in use", {
        email: ["Email already in use"],
      });
    }

    const user = await UserModel.create(data);
    return this.toDatabase(user);
  }

  async updateUser(
    id: string,
    data: Partial<Omit<DatabaseUser, "id" | "email" | "createdAt" | "updatedAt">>
  ): Promise<DatabaseUser> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ValidationError("User not found", {
        id: ["User not found"],
      });
    }

    Object.assign(user, data);
    await user.save();
    return this.toDatabase(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ValidationError("User not found", {
        id: ["User not found"],
      });
    }

    await user.deleteOne();
  }

  private toDatabase(doc: UserDocument): DatabaseUser {
    const obj = doc.toObject();
    return {
      id: obj._id.toString(),
      email: obj.email,
      password: obj.password,
      name: obj.name,
      role: obj.role,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }
}
