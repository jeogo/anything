import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(
    process.env.MONGODB_URI ||
      ("mongodb+srv://admin:admin@ecommerce.rq8hick.mongodb.net/?retryWrites=true&w=majority&appName=orders" as string)
  );

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
