const mongoose = require("mongoose");


//function  to connect mongo db  
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Mongo db connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
