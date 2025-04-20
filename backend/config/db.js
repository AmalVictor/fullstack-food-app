import mongoose from "mongoose";

 export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://amalvictor:amalfitano@cluster0.uuk85.mongodb.net/food-del').then(()=>console.log("DB connected"));
}