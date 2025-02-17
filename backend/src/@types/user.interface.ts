import mongoose, { Document } from "mongoose";

export interface User {
  name: string;
  email: string;
  password?: string | undefined;
  profile_picture: string | null;
  is_active: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
  current_workspace: mongoose.Types.ObjectId | null;
}

export interface UserMethods {
  comparePassword(value: string): Promise<boolean>;
  omitPassword(): User;
}

// Properly extending Mongoose's Document type
export type UserDocument = Document & User & UserMethods;
