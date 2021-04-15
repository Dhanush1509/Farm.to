import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_CONNECT=async()=>{
  
     try {
       await mongoose.connect(process.env.DB_SECRET, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
       });
       console.log("Database connected!!!");
     } catch (err) {
       console.error(err.message);
       process.exit(1);
     }
   };
 

export default DB_CONNECT;