const mongoose=require("../../common/database")();
const commentSchema = mongoose.Schema({
    
    prd_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
        
            },
            
            full_name:{
                        type:String,
                        required:true,
                
                    },
                    email:{
                        type:String,
                        required:true,
                
                    },
                    body:{
                        type:String,
                        required:true,
                
                    },
},
{
    timestamps: true,
});

const CommentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports = CommentModel ;

