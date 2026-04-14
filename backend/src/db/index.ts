import mongoose from "mongoose";

export async function connectDB(uri: string) {
  const LOCAL_URL = "mongodb://localhost:27017/ticket-app";

  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
    mongoose
      .connect(LOCAL_URL)
      .then(() => {
        console.log("Database connected successfully to local MongoDB");
      })
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });
  }
}
