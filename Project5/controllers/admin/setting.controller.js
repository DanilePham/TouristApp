const SettingWebsiteInfo = require('../../models/setting-website-info.model');

module.exports.listSettings = async (req , res) => {
    res.render('admin/page/setting-list', { pagetitle: "Setting List" })
}

module.exports.websiteInfo = async (req , res) => {
    const websiteInfo = await SettingWebsiteInfo.findOne({});
    res.render('admin/page/setting-website-info', { pagetitle: "Website Information", websiteInfo: websiteInfo })
}

module.exports.accountAdminList = async (req , res) => {
    res.render('admin/page/setting-account-admin-list',{pagetitle:"Setting Admin List"})
}

module.exports.roleList=async(req,res)=> {
    res.render('admin/page/setting-role-list',{pagetitle:"Setting Role List"})
}

module.exports.accountAdminListCreate=async(req,res) => {
    res.render('admin/page/setting-account-admin-create' , {pagetitle:"Setting Admin Create"})
}

module.exports.roleCreate= async(req,res) => {
    res.render('admin/page/setting-role-create', {pagetitle:"Setting Role Create"})
}

module.exports.updateWebsiteInfo = async (req, res) => {
    req.body.logo=req.files && req.files.logo ? req.files.logo[0].path : "";
    req.body.favicon=req.files && req.files.favicon ? req.files.favicon[0].path : "";

    const existingRecord = await SettingWebsiteInfo.findOne({});

    if (!existingRecord) {
        const newRecord = new SettingWebsiteInfo(req.body);
        await newRecord.save();
    }else{
        await SettingWebsiteInfo.updateOne({}, req.body);
    }


    res.json({
        code: "success",
        message: "Website information updated successfully"
    });
}