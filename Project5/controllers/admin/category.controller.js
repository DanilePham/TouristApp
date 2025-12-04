const { CategoryModel } = require("../../models/categories.model")

module.exports.listCategories = async (req, res) => {
    res.render('admin/page/category-list', { pagetitle: "Category List" })
}

module.exports.createCategory = async (req, res) => {
    res.render('admin/page/category-create', { pagetitle: "Create Category" })
}

module.exports.createPost = async (req, res) => {
    if (req.file) {

    } else {
     req.body.avatar = "" ;
    }

    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }else{
        const record=await CategoryModel.findOne().sort({position:"desc"});
        req.body.position=record? (record.position +1) : 1;
    }

    req.body.createdBy=req.account.id;

    const newCategory = new CategoryModel(req.body);
    await newCategory.save();

    res.json({
        code: "success",
        message: "Category created successfully"
    });
}