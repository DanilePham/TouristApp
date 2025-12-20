const SettingWebsiteInfo = require('../../models/setting-website-info.model');
const { AccountAdmin } = require("../../models/account-admin.model")
const { permissions } = require('../../config/variable.config');
const Role = require('../../models/roles.model');
const moment = require('moment');


module.exports.listSettings = async (req, res) => {
    res.render('admin/page/setting-list', { pagetitle: "Setting List" })
}

module.exports.websiteInfo = async (req, res) => {
    const websiteInfo = await SettingWebsiteInfo.findOne({});
    res.render('admin/page/setting-website-info', { pagetitle: "Website Information", websiteInfo: websiteInfo })
}

module.exports.accountAdminList = async (req, res) => {
    res.render('admin/page/setting-account-admin-list', { pagetitle: "Setting Admin List" })
}

module.exports.roleList = async (req, res) => {
    const find = {
        deleted: false
    };

    const roleList = await Role.find(find).sort({ createdAt: "desc" });

    for (const i of roleList) {
        if (i.createdBy) {
            const infoaccount = await AccountAdmin.findOne({ _id: i.createdBy });


            if (infoaccount) {
                i.createdByWho = infoaccount.fullname;
                i.createdAtFormat = moment(i.createdAt).format('HH:mm - DD/MM/YYYY');
            }
        }

        if (i.updatedBy) {
            const infoaccount = await AccountAdmin.findOne({ _id: i.updatedBy });
            if (infoaccount) {
                i.updatedByWho = infoaccount.fullname;
                i.updatedAtFormat = moment(i.updatedAt).format('HH:mm - DD/MM/YYYY');
            }
        }

    }


    res.render('admin/page/setting-role-list', { pagetitle: "Setting Role List", roleList: roleList })
}

module.exports.accountAdminListCreate = async (req, res) => {
    res.render('admin/page/setting-account-admin-create', { pagetitle: "Setting Admin Create" })
}

module.exports.roleCreate = async (req, res) => {
    res.render('admin/page/setting-role-create', { pagetitle: "Setting Role Create", permissions: permissions })
}


module.exports.updateWebsiteInfo = async (req, res) => {
    req.body.logo = req.files && req.files.logo ? req.files.logo[0].path : "";
    req.body.favicon = req.files && req.files.favicon ? req.files.favicon[0].path : "";

    const existingRecord = await SettingWebsiteInfo.findOne({});

    if (!existingRecord) {
        const newRecord = new SettingWebsiteInfo(req.body);
        await newRecord.save();
    } else {
        await SettingWebsiteInfo.updateOne({}, req.body);
    }


    res.json({
        code: "success",
        message: "Website information updated successfully"
    });
}

module.exports.roleCreatePost = async (req, res) => {
    req.body.createdBy = req.account.id;
    console.log('Received role create data:', req.body);

    const newRecord = new Role(req.body);
    await newRecord.save();


    res.json({
        code: "success",
        message: "Role created successfully"
    });
}

module.exports.roleEdit = async (req, res) => {
    try {
        const id = req.params.id;

        const roleDetail = await Role.findOne({
            _id: id,
            deleted: false
        });

        if (!roleDetail) {
            res.redirect(`/${pathAdmin}/role/list`);
            return;
        } 
        res.render('admin/page/setting-role-edit', { pagetitle: "Setting Role Edit", permissions: permissions, roleDetail: roleDetail });
    } catch (error) {
        console.error("Error editing tour:", error);
        res.redirect(`/${pathAdmin}/role/list`);
    }
}

module.exports.roleEditPost = async (req, res) => {
     try {
        const id = req.params.id;

        const roleDetail = await Role.findOne({
            _id: id,
            deleted: false
        });

        if (!roleDetail) {
            res.json({
                code: "error",
                message: "Role not found"
            })
            return;
        } 
        await Role.updateOne({
            _id: id,
            deleted: false
        }, req.body);

        res.json({
            code: "success",
            message: "Role updated successfully"
        });
    } catch (error) {
        res.json({
            code: "error",
            message: "An error occurred while updating the role"
        });
    }
}