import mongoose from "mongoose";
import { env } from "./env.js";
import logger from "../utils/logger.js";

const connectdb = async () => {
  try {
    const con = await mongoose.connect(env.MONGODB_URI);

    logger.info(`mongodb connected `, con.connection.host);
  } catch (err) {
    logger.error("MOngoDb connection Failed:", err.message);
    process.exit(1);
  }
};
export default connectdb;
