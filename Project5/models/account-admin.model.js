const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    status: String
}, {
    timestamps: true
}
)

module.exports.AccountAdmin = mongoose.model('AccountAdmin', schema, "accounts-admin");


