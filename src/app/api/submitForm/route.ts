import mongoose from "mongoose";
import Order from "../../../models/Order"; // Make sure the import path is correct for your project structure

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();

    // Connect to the database if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(
        process.env.MONGODB_URI ||
          "mongodb+srv://admin:admin@ecommerce.rq8hick.mongodb.net/?retryWrites=true&w=majority&appName=orders"
      );
    }

    // Create a new order instance from the request body
    const order = new Order(body);
    // Save the order to the database
    await order.save();

    // Return a success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Order submitted successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error submitting order:", error);
    return new Response(JSON.stringify({ error: "Error submitting order" }), {
      status: 500,
    });
  }
}
