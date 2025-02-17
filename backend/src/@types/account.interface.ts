import mongoose, { Document } from "mongoose";
import { ProviderEnumType } from "../enums/account-provider.enum";

export interface Account {
  user_id: mongoose.Types.ObjectId;
  provider: ProviderEnumType;
  provider_id: string;
  refresh_token: string | null;
  token_expiry: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface AccountDocument extends Document, Account {}
