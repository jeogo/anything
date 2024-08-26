import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Order interface extending Mongoose's Document interface
interface IOrder extends Document {
  fullName: string;
  phoneNumber: string;
  email?: string; // Optional email field
  wilaya: string;
  baladiya: string;
  selectedImages: { imageName: string; imageUrl: string }[]; // Array of objects with imageName and imageUrl
  totalPrice: number;
  originalPrice: number;
  discountApplied: boolean;
}

// Define the schema for the Order model
const OrderSchema: Schema<IOrder> = new Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: false },
  wilaya: { type: String, required: true },
  baladiya: { type: String, required: true },
  selectedImages: [
    {
      imageName: { type: String, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountApplied: { type: Boolean, required: true },
});

// Export the Order model or use the existing model if already defined
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
