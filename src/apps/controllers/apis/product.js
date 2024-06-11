const ProductModel = require("../../models/product");
const pagination = require("../../../libs/pagination");
const CommentModel=require("../../models/comment")
const CategoryModel=require("../../models/category");

exports.index = async (req, res) => {
    const query = {};
    // console.log( await ProductModel.find());
     query.is_stock = req.query.is_stock || true;
     query.featured = req.query.featured || true;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = page * limit - limit;
    const products = await ProductModel.find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit);
    res
        .status(200)
        .json({
            status: "success",
            filters: {
                is_stock:query.is_stock,
                featured:query.featured,
                page,
                limit,
            },
            data: {
                docs: products,
            },
            pages: await pagination(ProductModel,query, limit, page),
        })

}
exports.show=async (req,res)=>{
    const {id}=req.params;
    const products = await ProductModel.findById(id);
    res
    .status(200)
    .json({
       status:"success",
       data:products,
    });


}

exports.comments=async (req,res)=>{
    const query={};

    query.prd_id=req.params.id;
    const page=parseInt(req.query.page) ||1;
    const limit =parseInt(req.query.limit) || 2;
    const skip=page*limit-limit;
    const comments =await CommentModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort({_id:-1});
    res
    .status(200)
    .json({
        status :"Success",
        filter:{
           page,
           limit
        },
        data:{
            docs:comments,
        },
        pages:await pagination(CommentModel,query,limit,page),
    })
    
}

exports.storeComments=async (req,res)=>{
    const {id}=req.params;
    const body=req.body;
    const comments={
        full_name:body.name,
        email:body.email,
        body:body.body,
        prd_id:id,


    }
    await  new CommentModel(comments).save();
    res
    .status(201)
    .json({
        status:"success",
        message:"create comment sucessfully",

    });
    
}
exports.CategoryProducts= async(req,res)=>{
    const { id } = req.params;
        const products = await ProductModel.find({ cate_id: id }).populate('cate_id');
        res.status(200).json({
            status: 'success',
            data: {
                docs:products
            }
        });

}