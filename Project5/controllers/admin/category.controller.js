const { buildCategoryTree } = require("../../helpers/category.helper")
const { CategoryModel } = require("../../models/categories.model")
const { AccountAdmin } = require("../../models/account-admin.model")
const moment = require('moment');

module.exports.listCategories = async (req, res) => {
    const categoryLi = await CategoryModel.find({
        deleted: false
    }).sort({ position: "desc" })

    console.log("Category List:", categoryLi);
    for (const i of categoryLi) {
        if (i.createdBy) {
            const infoaccount = await AccountAdmin.findOne({ _id: i.createdBy });


            if (infoaccount) {
                i.createdByWho = infoaccount.fullname;
                i.createdAtFormat = moment(i.createdAt).format('HH:mm - DD/MM/YYYY');
            }
        }

        if (i.updatedBy) {
            const infoaccount = await AccountAdmin.findOne({ _id: i.updatedBy });
            if (infoaccount) {
                i.updatedByWho = infoaccount.fullname;
                i.updatedAtFormat = moment(i.updatedAt).format('HH:mm - DD/MM/YYYY');
            }
        }

    }

    res.render('admin/page/category-list', { pagetitle: "Category List", categoryLi })
}

module.exports.createCategory = async (req, res) => {
    const categoryList = await CategoryModel.find({
        deleted: false
    })

    const categoryTree = buildCategoryTree(categoryList);

    res.render('admin/page/category-create', { pagetitle: "Create Category", categoryList: categoryTree })
}

module.exports.createPost = async (req, res) => {
    console.log("Received form data:", req.file);
    if (req.file) {
        req.body.avatar = req.file.path;
    } else {
        req.body.avatar = "";
    }

    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const record = await CategoryModel.findOne().sort({ position: "desc" });
        req.body.position = record ? (record.position + 1) : 1;
    }

    req.body.createdBy = req.account.id;

    const newCategory = new CategoryModel(req.body);
    await newCategory.save();

    console.log("New category created:", newCategory);

    res.json({
        code: "success",
        message: "Category created successfully"
    });
}

module.exports.editCategory = async (req, res) => {

    try {
        const id = req.params.id;

        console.log("Editing category with ID:", id);
        const categoryDetail = await CategoryModel.findOne({
            _id: id,
            deleted: false
        });

        if (!categoryDetail) {
            res.redirect(`/${pathAdmin}/categories/list`);
            return;
        }

        const categoryList = await CategoryModel.find({
            deleted: false
        })

        const categoryTree = buildCategoryTree(categoryList);

        res.render('admin/page/category-edit', { pagetitle: "Edit Category", categoryList: categoryTree, categoryDetail: categoryDetail });
    } catch (error) {
        console.error("Error editing category:", error);
        res.redirect(`/${pathAdmin}/categories/list`);
    }
}

module.exports.editPostPatch = async (req, res) => {
    try {
        const id = req.params.id;

        const categoryDetail = await CategoryModel.findOne({
            _id: id,
            deleted: false
        });

        if (!categoryDetail) {
            res.json({
                code: "error",
                message: "Category not found"
            })
            return;
        }

        if (req.file) {
            req.body.avatar = req.file.path;
        } else {
            req.body.avatar = "";
        }

        if (req.body.position) {
            req.body.position = parseInt(req.body.position);
        } else {
            const record = await CategoryModel.findOne().sort({ position: "desc" });
            req.body.position = record ? (record.position + 1) : 1;
        }

        req.body.updatedBy = req.account.id;

        await CategoryModel.updateOne({
            _id: id,
            deleted: false
        }, req.body);

        res.json({
            code: "success",
            message: "Category updated successfully"
        });
    } catch (error) {
        res.json({
            code: "error",
            message: "An error occurred while updating the category"
        });
    }

}