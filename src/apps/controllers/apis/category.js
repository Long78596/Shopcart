const CategoryModel=require("../../models/category");
const slug=require('slug');
exports.index= async(req,res)=>{
    const category=await CategoryModel.find();
    res
    .status(200)
    .json({
        status:"success",
        data:{

            docs:category,
        },
    })

}
exports.show=async(req,res)=>{
     const {id}=req.params;
     const category=await CategoryModel.findById(id);
     res
     .status(200)
       .json({
        data:{
            status:"success",
            docs:category
        }
       });
    
}
exports.create=async (req,res)=>{
    const body=req.body;
    const category={
        title:body.title,
        slug:slug(body.title),
        description:body.description,
    }
    await  new CategoryModel(category).save();
    res
    .status(201)
    .json({
        status:"success",
        mesage:"create cateogry successfully",
    })
}
exports.delete=async(req,res)=>{
    const id=req.params.id;
    const category=await CategoryModel.deleteOne({_id:id});
    res
    .status(204)
    .json({
        status:"success",
        message:"delete category successfully",

    });
}