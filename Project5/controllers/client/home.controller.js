const { CategoryModel } = require('../../models/categories.model.js');
const Tour = require('../../models/tour.model.js');
const moment = require('moment');
const { getCategorySubId } = require('../../helpers/category.helper.js');


module.exports.getHomePage = async (req, res) => {
  //section 2
  const tourListSection2 = await Tour.find({
    deleted: false,
    status: "active",
  }).sort({
    position: "desc"
  }).limit(6);

  for (const item of tourListSection2) {
    if (item.departureDate) {
      item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
    }
  }
  
  console.log(tourListSection2);
  //end Section 2

  //section 4 
  const categoryIdSection4 = "69384209a8097e89a72df3d0";   


  const categorySubIdSection4 = await getCategorySubId(categoryIdSection4);

  console.log(categorySubIdSection4);

  const tourListSection4 = await Tour.find({
    category: {$in:[
      categoryIdSection4,
      ...categorySubIdSection4
    ]},
    deleted: false,
    status: "active"
  })
    .sort({
      position: "desc"
    }).limit(8);

  for (const item of tourListSection4) {
    if (item.departureDate) {
      item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
    }
  }
  //end section 4



  res.render('client/pages/home.pug', { pagetitle: "123", tourListSection2: tourListSection2, tourListSection4: tourListSection4 });
}