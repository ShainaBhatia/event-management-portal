import mongoose from "mongoose";

export async function connectDB(){
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI){
    throw new Error("Please define MONGODB_URI in .env.local");
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error){
        console.error("MongoDB connection failed: ", error);
        throw error;
    }
}