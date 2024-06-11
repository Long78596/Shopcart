const mongoose=require("../../../common/database")();
const OrderModel=require("../../models/order");
const ProductModel=require("../../models/product")
const path=require("path");
const ejs=require("ejs")
const _ =require("lodash");
const transporter=require("../../../libs/mail")
exports.order= async(req,res)=>{
    const body=req.body;
    const totalPrice=body.items.reduce((total, item)=>total+item.price*item.qty,0);
     const idsPrd=body.items.map((item)=>item.prd_id);
     const products= await ProductModel.find({_id:{$in:idsPrd}});
   let items=[];
   for(let product of products){
    const cart =_.find(body.items, {prd_id:product._id.toString()});
    if(cart){
        cart.name=product.name;
        items.push(cart);
    }

   }
     const html =await ejs.renderFile(path.join(req.app.get("views"),"mail.ejs"), {
        fullname:body.fullname,
        phone:body.phone,
        address:body.address,
        totalPrice,
        items,
   });
    await transporter.sendMail({
        from: '"Shop cart API 👻" <longkolp16@gmail.com>', // sender address
        to: body.email, 
        subject: "Xác nhận đơn hàng từ Shop cart API ✔", // Subject line
        html, 
      });
    const order={
        fullname:body.fullname,
        email:body.email,
        phone:body.phone,
        address:body.address,
        totalPrice,
        items:body.items,
    }

    await OrderModel(order).save();
    res.status(201).json({
         status:"success",
         message: " Create order successfully",
    });
    

}
// nodemailer.createTransport({
//   host: process.env.MAIL_SERVER,
//   secure: false,
//   port: 587,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// }