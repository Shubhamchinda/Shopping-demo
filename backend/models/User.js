import mongoose from "mongoose";
import {Order as order} from "./Order";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  name: String,
  password: String,
  orders: [{ type: Schema.Types.ObjectId, ref: "order" }]
});

export const User = mongoose.model("User", userSchema);
