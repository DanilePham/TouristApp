const { CategoryModel } = require('../../models/categories.model.js');
const Tour = require('../../models/tour.model.js');
const moment = require('moment');
const { getCategorySubId } = require('../../helpers/category.helper.js');

module.exports.list = async (req, res) => {
    const slug = req.params.slug;
    console.log("12122121")
    console.log("Category Slug:", slug);
    // You can use the slug to fetch category-specific data if needed

    const categoryDetail = await CategoryModel.findOne(
        {
            slug: slug,
            deleted: false,
            status: "active"
        }
    )
    console.log("Category Detail:", categoryDetail);

    if (!categoryDetail) {
        res.redirect("/");
        return;
    }

    //List of tours
    const categorySubId = await getCategorySubId(categoryDetail._id);


    const tourList = await Tour.find({
        category: {
            $in: [
                categoryDetail._id,
                ...categorySubId
            ]
        },
        deleted: false,
        status: "active"
    })
        .sort({
            position: "desc"
        }).limit(24);

    for (const item of tourList) {
        if (item.departureDate) {
            item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
        }
    }
    //end list of tours

    console.log("Category Detail:", categoryDetail);

    console.log("Category Slug:", slug);


    res.render("client/pages/tour-list", {
        pageTitle: "Category Page",
        categoryDetail: categoryDetail,
        tourList: tourList

    })
}

// module.exports.list = async (req, res) => {
//     console.log("URL:", req.originalUrl);
//     console.log("params:", req.params);
//     console.log("query:", req.query);

//     const slug = req.params.slug || req.query.slug;
//     console.log("Slug lấy được:", slug);

//     const categoryDetail= await CategoryModel.findOne({
//         slug: slug,
//         deleted:false,
//         status:"active"
//     });

//     // if (!categoryDetail) {  
//     //     console.log("Không tìm thấy category với slug:", slug);
//     //     res.redirect("/");
//     //     return;
//     // }

//     res.render("client/pages/tour-list", { 
//         pageTitle: "Category Page",
//     });
// };
