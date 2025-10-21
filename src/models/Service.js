import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String }, // Can be URL or path of uploaded image
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
