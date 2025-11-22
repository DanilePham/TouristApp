const { Tour } = require('../../models/tour.model');


module.exports.getTourList = async (req, res) => {
  const tourList = await Tour.find({});

  console.log(tourList);
  res.render('client/pages/tour-list.pug', {
    pagetitle: "Tour List",
    tourList: tourList
  })
}


module.exports.getTourDetails = async (req, res) => {
  res.render('client/pages/tour-details.pug', {
    pagetitle: "Tour Details"
  })
}
