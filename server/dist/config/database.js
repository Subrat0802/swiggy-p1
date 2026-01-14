import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB = process.env.DATABASE_URL_NEW;
if (!DB) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}
export const dbConnect = async () => {
    try {
        await mongoose.connect(DB);
        console.log("DB connected successfully");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:");
        console.error(error);
        process.exit(1);
    }
};
//# sourceMappingURL=database.js.map