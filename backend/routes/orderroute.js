import express from "express"
import authmiddleware from "../middleware/auth.js"
import { placeorder, verifyorder, userOrders, listorders, updateStatus } from "../controllers/ordercontroller.js"

const orderrouter = express.Router();

orderrouter.post("/place",authmiddleware,placeorder);
orderrouter.post("/verify",verifyorder)
orderrouter.post("/userorders",authmiddleware,userOrders)
orderrouter.get("/list",listorders)
orderrouter.post("/status",updateStatus)


export default orderrouter;