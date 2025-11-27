module.exports.listCategories = async (req, res) => {
    res.render('admin/page/category-list', { pagetitle: "Category List" })
}

module.exports.createCategory = async (req, res) => {
    res.render('admin/page/category-create', { pagetitle: "Create Category" })
}