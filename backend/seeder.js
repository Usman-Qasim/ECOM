import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/connDB.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clearing the database
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(sampleProducts);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error(`Error : ${error}`);
    process.exit(1);
  }
};

const destoryData = async () => {
  try {
    // Clearing the database
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log("Data Destoryed successfully");
    process.exit();
  } catch (error) {
    console.error(`Error : ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destoryData();
} else {
  importData();
}
