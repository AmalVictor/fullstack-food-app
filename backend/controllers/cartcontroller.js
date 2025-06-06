import usermodel from "../models/usermodel.js"

//add to cart
const addtocart = async (req,res) => {
        try {
            let userdata = await usermodel.findById(req.body.userId);
            let cartdata = await userdata.cartdata;
            if (!cartdata[req.body.itemId]) {
                cartdata[req.body.itemId] = 1;
            }
            else{
                cartdata[req.body.itemId] += 1;
            }
            await usermodel.findByIdAndUpdate(req.body.userId,{cartdata});
            res.json({success:true,message:"Added To Cart"});
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"});
        }
}


//remove items from usercart
const removefromcart = async(req,res) => {
        try {
            let userdata = await usermodel.findById(req.body.userId);
            let cartdata = await userdata.cartdata;
            if (cartdata[req.body.itemId]>0) {
                cartdata[req.body.itemId] -= 1;
            }
            await usermodel.findByIdAndUpdate(req.body.userId,{cartdata});
            res.json({success:true,message:"Removed From Cart"})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
            
        }
}

//fetchuser cart data
const getcart = async(req,res) => {
        try {
            let userdata = await usermodel.findById(req.body.userId);
            let cartdata = await userdata.cartdata;
            res.json({success:true,cartdata})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
            
        }
}

export {addtocart,removefromcart,getcart}