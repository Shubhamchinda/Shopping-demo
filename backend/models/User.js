import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true, trim: true },
    name: String,
    password: String,
});


export const User = mongoose.model("User", userSchema);