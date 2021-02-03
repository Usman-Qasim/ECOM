import path from "path";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/connDB.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routers/productRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import orderRoutes from "./routers/orderRoutes.js";
import uploadRoutes from "./routers/uploadRoutes.js";

const app = express();
dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
connectDB();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/upload", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
