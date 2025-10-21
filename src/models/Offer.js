import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discount: { type: Number, required: true }, // percentage
  applicableTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  validTill: Date
}, { timestamps: true });

export default mongoose.model("Offer", offerSchema);
