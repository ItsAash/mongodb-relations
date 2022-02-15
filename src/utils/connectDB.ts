import { mongoose } from "@typegoose/typegoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(
      ` > Application successfully connected to ${conn.connection.name.italic} on ${conn.connection.host.italic} MongoDB`
        .underline.black.bgCyan
    );
  } catch (e) {
    console.error(e);
  }
};
