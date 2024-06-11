const mongoose=require("../../common/database")();

const productSchema=new mongoose.Schema({
             thumbnail:{
                type:String,
                default:null,
             },
               description:{
                type:String,
                default:null,
             },
             price:{
                type:Number,
                default:0,
             },
             cate_id: {
               type: mongoose.Types.ObjectId,
               ref: "Category",
               default: null,
           },
           
             status:{
                type:Boolean,
                default:false,
             },
             featured:{
                type:String,
                default:false,
             },
             promotion:{
                type:String,
                default:null,
             },
             warranty:{
                type:String,
                default:null,
             },
             accessories:{
                type:String,
                default:null,
             },
             is_stock:{
                type:Boolean,
                default:true,
             },
             name:{
                type:String,
                text:true,
                required:true,
             },
             slug:{
                type:String,
                required:true,
             },


},{
    timetamps:true,
});
const ProductModel=mongoose.model("Product",productSchema,"products");
module.exports = ProductModel;

