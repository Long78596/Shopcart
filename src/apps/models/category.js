const mongoose=require("../../common/database")();
const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    slug:{
        type:String,
        require:true,
    },

},{
    timestamps:true,
});
const CategoryModel=mongoose.model("Category",categorySchema, "categories");
module.exports = CategoryModel;
