import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import configuration from "./configs/index.js"
import userRoute from "./routes/userRoute.js"


//middlewares
const app = express()
app.use(express.json())
app.use(cors())
app.use(userRoute);

//Database and server connectivity
mongoose
  .connect(configuration.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(configuration.port, () => {
  console.log(`Server is running on port ${configuration.port}`);
});
