const {City}= require('../../models/cities.model.js');
module.exports.list = async (req, res, next) => {
    const cityList= await City.find({});
    res.locals.cityList = cityList;
    next();
}