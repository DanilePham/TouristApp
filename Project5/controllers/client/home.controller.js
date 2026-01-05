const Tour = require('../../models/tour.model.js');
const moment = require('moment');


module.exports.getHomePage = async (req, res) => {
  //section 2
  const tourListSection2 = await Tour.find({
    deleted: false,
    status: "active",
  }).sort({
    position: "desc"
  }).limit(6);

  for (const item of tourListSection2) {
    if(item.departureDate){
      item.departureDateFormat = moment(item.departureDate).format("DD/MM/YYYY");
    }
  }

  console.log(tourListSection2);
  //end Section2 



  res.render('client/pages/home.pug', { pagetitle: "123", tourListSection2: tourListSection2 });
}