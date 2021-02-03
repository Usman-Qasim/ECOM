import express from "express";
import {
  addOrderItems,
  getMyorders,
  getOrderById,
  getorders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/myorders").get(protect, getMyorders);
router.route("/").post(protect, addOrderItems).get(protect, admin, getorders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
export default router;
