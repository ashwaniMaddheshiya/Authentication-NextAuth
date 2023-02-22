import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    /*
            readyState:- 
                0 => disconnected
                1 => connected
                2 => connecting
                3 => disconnecting
        */
    if (connection.readyState === 1) {
      console.log("Connected to DataBase");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
