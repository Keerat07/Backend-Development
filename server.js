import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js"
dotenv.config();

// console.log(process.env.MONGO_URI);

const app=express();

app.put("/products/:id",async (req,res) =>{
    const {id}=req.params;

    const product=req.body;

    try {
        const updateProduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updateProduct});
    } catch (error) {
        res.status(400).json({success:false,message:"Server Error"});  
    }
});

app.get("/products",async (req,res) =>{
    try {
        const products =await Product.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        res.status(400).json({success:false,message:"Server Error"});  
    }
});

app.use(express.json());

app.post('/products',async (req,res)=>{
    const product=req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:true,message:"Please provide all information"});  
    }
    const newProduct=new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success:true,data: newProduct});
    } catch (error) {
        console.error("Error in create product: ",error.message);
        res.status(201).json({success:false,message:"Server error"});
    }
})

app.delete("/products/:id",async (req,res) =>{
    const {id}=req.params;
    console.log("id: ",id);
    // res.status(201).json({success:false});  
    try {
        await Product.findByIdAndDelete(id);
        res.status(201).json({success:true,message:"product deleted"});
    } catch (error) {
        res.status(200).json({success:false,message:"product not found"});
    }
});

app.listen(5000,() =>{
    connectDB();
    console.log("Server started");
});

// teMDgq1sVnzaYBUJ