const { buildCategoryTree } = require("../../helpers/category.helper")
const { CategoryModel } = require("../../models/categories.model")

module.exports.listCategories = async (req, res) => {
    res.render('admin/page/category-list', { pagetitle: "Category List" })
}

module.exports.createCategory = async (req, res) => {
    const categoryList = await CategoryModel.find({
        deleted:false
    })

    const categoryTree = buildCategoryTree(categoryList);

    res.render('admin/page/category-create', { pagetitle: "Create Category", categoryList: categoryTree})
}

module.exports.createPost = async (req, res) => {
    console.log("Received form data:", req.file);
    if (req.file) {
        req.body.avatar = req.file.path;
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

    console.log("New category created:", newCategory);

    res.json({
        code: "success",
        message: "Category created successfully"
    });
}