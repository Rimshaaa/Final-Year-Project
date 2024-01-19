import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["restaurant", "supplier", "admin"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dbdxsvxda/image/upload/v1699548736/niegbour_proj/dkpfjfhrzfz0xkr3ck1v.png",
    },
    is_approved: {
      type: Boolean,
      default: false,
    },
    is_rejected: { type: Boolean, default: false },
    location: {},
    ratings: [
      {
        byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
    registration_method: String,
    // verification_code: {
    //   type: String,
    // },
    // email_verified: {
    //   type: Boolean,
    //   default: false,
    // },
    resetCode: String,
    expireToken: Date,
  },
  { timestamps: true }
);
export const User = mongoose.model("user", UserSchema);
