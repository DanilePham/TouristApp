const mongoose=require('mongoose');
const slug=require('mongoose-slug-updater');
mongoose.plugin(slug);


const schema=new mongoose.Schema({
    name:String,
    parent:String,
    avatar:String,
    status:String,
    position:Number,
    description:String,
    createdBy:String,
    updatedBy:String,
    slug:String,
    slug:{
        type:String, slug:"name", unique:true
    },
    deleted:{ type:Boolean, default:false },
    deletedBy:String,
    deletedAt:Date
},{
    timestamps:true
}
);

const CategoryModel=mongoose.model('Category',schema,"categories");

module.exports.CategoryModel=CategoryModel;