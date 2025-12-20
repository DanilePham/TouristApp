const mongoose = require('mongoose');

const SettingWebsiteInfoSchema = new mongoose.Schema(
    {
        websiteName: String,
        phone: String,
        email: String,
        address: String,
        logo: String,
        favicon: String
    },
)

module.exports = mongoose.model('SettingWebsiteInfo', SettingWebsiteInfoSchema, "setting-website-info");