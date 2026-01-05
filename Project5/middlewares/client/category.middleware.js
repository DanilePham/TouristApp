const { buildCategoryTree } = require('../../helpers/category.helper.js');
const { CategoryModel } = require('../../models/categories.model.js');

module.exports.list=async(req,res,next)=>{
    const categories=await CategoryModel.find({
        deleted:false,
        status:'active',
    })

    const categoryTree= buildCategoryTree(categories);
    res.locals.categories=categoryTree;
    next();
}