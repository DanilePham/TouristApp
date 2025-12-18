const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String
}
);

module.exports.City = mongoose.model('City', schema, "cities");