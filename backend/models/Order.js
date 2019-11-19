import mongoose from "mongoose";
const mongoose_delete = require("mongoose-delete");

const ordersSchema = new mongoose.Schema({
  num: Number,
  name: String,
  dueDate: String,
  custAddress: String,
  phone: String,
  orderTotal: Number
});

ordersSchema.plugin(mongoose_delete, {
  overrideMethods: ["count", "find", "countDocuments"]
});

export const Order = mongoose.model("order", ordersSchema);
