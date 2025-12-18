const { CategoryModel } = require("../../models/categories.model")
const { AccountAdmin } = require("../../models/account-admin.model")
const { buildCategoryTree } = require('../../helpers/category.helper');
const { City } = require("../../models/cities.model");
const Tour = require("../../models/tour.model");
const moment = require('moment');
const slugify = require('slugify');


module.exports.listTours = async (req, res) => {
    const find = {
        deleted: false
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    if (req.query.createdBy) {
        find.createdBy = req.query.createdBy;
    }

    const createdAt = {};
    if (req.query.startDate) {
        createdAt.$gte = moment(req.query.startDate).toDate();
        find.createdAt = createdAt;
    }

    if (req.query.endDate) {
        createdAt.$lte = moment(req.query.endDate).endOf('day').toDate();
        find.createdAt = createdAt;
    }

    if (req.query.keyword) {
        let regex = req.query.keyword.trim();
        regex = regex.replace(/\s\s+/g, " ");
        regex = slugify(regex, { lower: true, strict: true });
        regex = new RegExp(regex, "i");
        find.slug = regex;
    }

    //Pagination
    const limitItem = 3;
    let page = 1;
    if (req.query.page) {
        page = parseInt(req.query.page);
    }
    const skip = (page - 1) * limitItem;

    const totalItem = await Tour.countDocuments(find);
    const totalPage = Math.ceil(totalItem / limitItem);
    const pagination = {
        totalPage: totalPage,
        totalItem: totalItem,
        skip: skip
    }
    //end pagination

    const tourList = await Tour.find(find).sort({ position: "desc" });

    for (const i of tourList) {
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

    const accountAdminList = await AccountAdmin.find({}).select("id fullname");

    res.render('admin/page/tour-list', { pagetitle: "Tour List", tourList: tourList, pagination: pagination, accountAdminList: accountAdminList });
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

    const find = {
        deleted: true
    };

    const tourList = await Tour.find(find).sort({ deletedAt: "desc" });

    for (const i of tourList) {
        if (i.createdBy) {
            const infoaccount = await AccountAdmin.findOne({ _id: i.createdBy });


            if (infoaccount) {
                i.createdByWho = infoaccount.fullname;
                i.createdAtFormat = moment(i.createdAt).format('HH:mm - DD/MM/YYYY');
            }
        }

        if (i.deletedBy) {
            const infoaccount = await AccountAdmin.findOne({ _id: i.deletedBy });
            if (infoaccount) {
                i.deletedByWho = infoaccount.fullname;
                i.deletedAtFormat = moment(i.deletedAt).format('HH:mm - DD/MM/YYYY');
            }
        }

    }

    res.render('admin/page/tour-trash', { pagetitle: "Trash Tours", tourList: tourList });
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

module.exports.changeMultiPatch = async (req, res) => {
    try {
        const { ids, action } = req.body;
        switch (action) {
            case 'active':
            case 'inactive':
                await Tour.updateMany(
                    {
                        _id: { $in: ids },
                        deleted: false
                    },
                    {
                        status: action,
                        updatedBy: req.account._id
                    }
                )
                res.json({
                    code: "success",
                    message: "Multi status change functionality is under development"
                });
                break;

            case 'delete':
                await Tour.updateMany(
                    {
                        _id: { $in: ids },
                        deleted: false
                    },
                    {
                        deleted: true,
                        deletedBy: req.account._id,
                        deletedAt: Date.now()
                    }
                )
                res.json({
                    code: "success",
                    message: "Multi delete functionality is under development"
                });
                break;

            default:
                res.json({
                    code: "error",
                    message: "Invalid action"
                });
                return;
        }
    } catch (err) {
        res.json({
            code: "error",
            message: "An error occurred while processing the request"
        });
    }

}

module.exports.editTour = async (req, res) => {

    try {
        const id = req.params.id;

        const tourDetail = await Tour.findOne({
            _id: id,
            deleted: false
        });

        if (!tourDetail) {
            res.redirect(`/${pathAdmin}/tours/list`);
            return;
        }

        const categoryList = await CategoryModel.find({
            deleted: false
        })

        const categoryTree = buildCategoryTree(categoryList);

        if (tourDetail.departureDate) {
            tourDetail.departureDateFormat = tourDetail.departureDate ? moment(tourDetail.departureDate).format('YYYY-MM-DD') : '';
        }

        const cityList = await City.find({}).sort({ name: "desc" });

        res.render('admin/page/tour-edit', { pagetitle: "Edit Tour", categoryList: categoryTree, tourDetail: tourDetail, cityList: cityList });
    } catch (error) {
        console.error("Error editing tour:", error);
        res.redirect(`/${pathAdmin}/tours/list`);
    }
}

module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;

        const tourDetail = await Tour.findOne({
            _id: id,
            deleted: false
        });

        if (!tourDetail) {
            res.json({
                code: "error",
                message: "Tour not found"
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
            const record = await Tour.findOne().sort({ position: "desc" });
            req.body.position = record ? (record.position + 1) : 1;
        }

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

        req.body.updatedBy = req.account.id;

        await Tour.updateOne({
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

module.exports.deletePostPatch = async (req, res) => {
    try {
        const id = req.params.id;
        const tourDetail = await Tour.findOne({
            _id: id,
            deleted: false
        });

        if (!tourDetail) {
            res.json({
                code: "error",
                message: "Tour not found"
            })
            return;
        }

        // req.body.updatedBy = req.account.id;

        await Tour.updateOne({
            _id: id,
            deleted: false
        }, {
            deleted: true,
            deletedBy: req.account._id,
            deletedAt: Date.now()
        });

        res.json({
            code: "success",
            message: "Tour deleted successfully"
        });



    } catch (error) {
        res.json({
            code: "error",
            message: "An error occurred while deleting the tour"
        });
    }
}


module.exports.undoPostPatch = async (req, res) => {
    try {
        const id = req.params.id;
        const tourDetail = await Tour.findOne({
            _id: id,
            deleted: true
        });

        if (!tourDetail) {
            res.json({
                code: "error",
                message: "Tour not found"
            })
            return;
        }

        // req.body.updatedBy = req.account.id;

        await Tour.updateOne({
            _id: id,
            deleted: true
        }, {
            deleted: false
        });

        res.json({
            code: "success",
            message: "Tour restored successfully"
        });



    } catch (error) {
        res.json({
            code: "error",
            message: "An error occurred while restoring the tour"
        });
    }
}

module.exports.destroyDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const tourDetail = await Tour.findOne({
            _id: id,
            deleted: true
        });

        if (!tourDetail) {
            res.json({
                code: "error",
                message: "Tour not found"
            })
            return;
        }

        // req.body.updatedBy = req.account.id;

        await Tour.deleteOne({
            _id: id,
            deleted: true
        },);

        res.json({
            code: "success",
            message: "Tour deleted successfully"
        });



    } catch (error) {
        res.json({
            code: "error",
            message: "An error occurred while deleting the tour"
        });
    }

}
