import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DATABASE_URL;

if (!DB) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const dbConnect = async (): Promise<void> => {
    try{
        await mongoose.connect(DB);
        console.log("DB connected successfully");
    }catch(error){
        console.log("Error while connecting to database");
        process.exit(1);
    }
}
