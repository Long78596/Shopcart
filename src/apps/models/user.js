const mongoose=require('../../common/database')();
const UserSchma=new mongoose.Schema({
   fullname:{
    type:String,
    required:true,
   },
   password:{
    type:String,
    required:true,
   },
   email:{
    type:String,
    required:true,
   },
   role:{
    type:String,
    required:true,
   }
},{
    timestamps:true,
});
const UserModel=mongoose.model("Users",UserSchma,"users");
module.exports = UserModel;
