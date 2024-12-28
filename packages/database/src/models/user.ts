import mongoose from "mongoose";
import type { DatabaseUser, User } from "@repo/types";

// Define base document interface without id
type UserDocumentProps = Omit<DatabaseUser, "id">;

// Define the document interface
export interface UserDocument extends mongoose.Document, UserDocumentProps {
  _id: mongoose.Types.ObjectId;
  toPublicUser(): User;
}

// Define the model interface
export interface UserModel extends mongoose.Model<UserDocument> {
  findByEmail(email: string): Promise<UserDocument | null>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "guide", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Instance methods
userSchema.methods.toPublicUser = function(this: UserDocument): User {
  const doc = this.toObject();
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    role: doc.role,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

// Static methods
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Export model
export const UserModel = mongoose.model<UserDocument, UserModel>("User", userSchema);
