import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import configuration from "./configs/index.js"
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"
import ErrorHandlerMiddleware from "./middlewares/errorHandler.js"

// Cors policy configuration.
const corsOptions = {
  allowedHeaders: ["Authorization","Content-Type"],
  methods: ["GET", "POST", "UPDATE" ],
  origin: ["http://localhost:5173", configuration.CLIENT_APP],
}

//middlewares
const app = express()
app.use(express.json())
app.use(cors())
app.use("/user",userRoute);
app.use("/product",productRoute)

//Database and server connectivity
mongoose
  .connect(configuration.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    app.listen(configuration.port, () => {
      console.log(`Server is running on port ${configuration.port}`);
    });
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(ErrorHandlerMiddleware)
