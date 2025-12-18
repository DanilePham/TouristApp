const { CategoryModel } = require("../../models/categories.model")
const { AccountAdmin } = require("../../models/account-admin.model")
const { buildCategoryTree } = require('../../helpers/category.helper');
const { City } = require("../../models/cities.model");
const Tour = require("../../models/tour.model");

module.exports.listTours = async (req, res) => {
    res.render('admin/page/tour-list', { pagetitle: "Tour List" })
}

module.exports.createTour = async (req, res) => {
    const categoryList = await CategoryModel.find({
        deleted: false
    })

    const categoryTree = buildCategoryTree(categoryList);

    const cityList = await City.find({}).sort({ name: "asc" });



    res.render('admin/page/tour-create', { pagetitle: "Create Tour", categoryList: categoryTree, cityList: cityList })
}

module.exports.trashTours = async (req, res) => {
    res.render('admin/page/tour-trash', { pagetitle: "Trash Tours" })
}

module.exports.createTourss = async (req, res) => {
    if (req.file) {
        req.body.avatar = req.file.path;
    } else {
        req.body.avatar = "";
    }

    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    } else {
        const record = await Tour.findOne().sort({ position: "desc" });
        req.body.position = record ? (record.position + 1) : 1;
    }

    req.body.createdBy = req.account.id;

    req.body.priceAdult = req.body.priceAdult ? parseInt(req.body.priceAdult) : 0;
    req.body.priceChildren = req.body.priceChildren ? parseInt(req.body.priceChildren) : 0;
    req.body.priceBaby = req.body.priceBaby ? parseInt(req.body.priceBaby) : 0;
    req.body.priceNewAdult = req.body.priceNewAdult ? parseInt(req.body.priceNewAdult) : req.body.priceAdult;
    req.body.priceNewChildren = req.body.priceNewChildren ? parseInt(req.body.priceNewChildren) : req.body.priceChildren;
    req.body.priceNewBaby = req.body.priceNewBaby ? parseInt(req.body.priceNewBaby) : req.body.priceBaby;

    req.body.stockAdult = req.body.stockAdult ? parseInt(req.body.stockAdult) : 0;
    req.body.stockChildren = req.body.stockChildren ? parseInt(req.body.stockChildren) : 0;
    req.body.stockBaby = req.body.stockBaby ? parseInt(req.body.stockBaby) : 0;
    req.body.locations = req.body.locations ? JSON.parse(req.body.locations) : [];
    req.body.departureDate = req.body.departureDate ? new Date(req.body.departureDate) : null;
    req.body.schedules = req.body.schedules ? JSON.parse(req.body.schedules) : [];
    req.body.createdBy = req.account.id;

    const newTour = new Tour(req.body);
    await newTour.save();

    res.json({
        code: "success",
        message: "Tour created successfully"
    });
}
