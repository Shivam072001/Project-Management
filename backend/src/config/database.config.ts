import mongoose from "mongoose";
import { config } from "./app.config";
import { logger } from "../utils/logger";

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGO_URI);
    logger.info("Connected to Mongo database");
  } catch (error) {
    logger.error("Error connecting to Mongo database", error);
    process.exit(1);
  }
};

export default connectDatabase;
