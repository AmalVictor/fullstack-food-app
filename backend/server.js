import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodrouter from "./routes/foodroute.js"
import userrouter from "./routes/userroute.js"
import 'dotenv/config'
import cartrouter from "./routes/cartroute.js"
import orderrouter from "./routes/orderroute.js"

import path from 'path'
import { fileURLToPath } from "url";

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//app config
const app = express()
const port = process.env.PORT || 4000;




//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodrouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userrouter)
app.use("/api/cart",cartrouter)
app.use("/api/order",orderrouter)

if(process.env.NODE_ENV==="production") {
     app.use(express.static(path.join(__dirname, "../frontend/dist")));
    
    
     app.get("*", (req, res) => {
    
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    
    })
     }

app.get("/", (req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://amalvictor:amalfitano@cluster0.uuk85.mongodb.net/?