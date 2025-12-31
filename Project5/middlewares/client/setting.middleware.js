const SettingWebsiteInfoService = require('../../models/setting-website-info.model.js');

module.exports.websiteInfo = async (req, res, next) => {
    const settingWebsiteInfo= await SettingWebsiteInfoService.findOne({});
    console.log("settingWebsiteInfo middleware:", settingWebsiteInfo);
    res.locals.settingWebsiteInfo = settingWebsiteInfo; 
    next();
}