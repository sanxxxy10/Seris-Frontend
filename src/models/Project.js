import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    companyName: String,
    mobile: String,
    email: String,
    websiteLink: String,
    projectName: String,
    websiteType: String,
    budget: String,
    status: {
  type: String,
  enum: ["pending", "in-progress", "completed"], // now valid
  default: "pending"
}
,
    finalWebsiteLink: { type: String }, // 🔹 new field
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
