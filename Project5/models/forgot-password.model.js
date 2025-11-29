const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: String,
    otp:String,
    expireAt: {
        type: Date,
        expires: 300, // 5 minutes
    }
}, {
    timestamps: true
}
)

module.exports.ForgotPassword = mongoose.model('ForgotPassword', schema, "forgot-password");



