import mongoose from "mongoose"

const ContractSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    templateType: {
      type: String,
      required: true,
      enum: ["nda", "freelance", "ip", "custom"],
    },
    content: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    clientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "signed", "expired", "cancelled"],
      default: "draft",
    },
    projectDetails: {
      name: String,
      description: String,
      startDate: Date,
      endDate: Date,
      amount: Number,
      currency: {
        type: String,
        enum: ["INR", "USD", "EUR", "GBP"],
        default: "INR",
      },
    },
    signatures: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        email: String,
        signedAt: Date,
        ipAddress: String,
        signatureImage: String,
      },
    ],
    sentAt: Date,
    expiresAt: Date,
    metadata: {
      type: Map,
      of: String,
    },
    riskAssessment: {
      score: Number,
      issues: [String],
      recommendations: [String],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Contract || mongoose.model("Contract", ContractSchema)
