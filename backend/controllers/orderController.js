import Order from "../models/orderSchema.js";
import Gig from "../models/gigSchema.js";
import createError from "../utils/createError.js";

export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    console.log("test gig", gig);
    const newOrder = new Order({
      gigId: gig._id,
      // img: gig.dp,
      category: gig.category,
      title: gig.shortTitle,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.userId,
      payment_intent: "temp_payment_intent",
    });
    await newOrder.save();
    res.status(200).send("Order created successfully!");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const query = {
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isComplete: true,
    };
    const orders = await Order.find(query);
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
