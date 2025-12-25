const SettingWebsiteInfo = require('../../models/setting-website-info.model');
const bcrypt = require('bcrypt');
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
    const accountAdminList = await AccountAdmin.find({ deleted: false }).sort({ createdAt: "desc" });

    for (const i of accountAdminList) {
        if (i.role) {
            const roleDetail = await Role.findOne({ _id: i.role, deleted: false });
            if (roleDetail) {
                i.roleName = roleDetail.name;
            }
        }
    }


    res.render('admin/page/setting-account-admin-list', { pagetitle: "Setting Admin List", accountAdminList: accountAdminList })
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
    const roleList = await Role.find({
        deleted: false
    });

    res.render('admin/page/setting-account-admin-create', { pagetitle: "Setting Admin Create", roleList: roleList })
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

module.exports.accountAdminListCreatePost = async (req, res) => {
    const existEmail = await AccountAdmin.findOne({
        email: req.body.email
    })

    if (existEmail) {
        res.json({
            code: "error",
            message: "Email already in use"
        });
        return;
    }

    if (req.file) {
        req.body.avatar = req.file.path;
    } else {
        req.body.avatar = "";
    }

    req.body.createdBy = req.account.id;
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newRecord = new AccountAdmin(req.body);
    await newRecord.save();

    res.json({
        code: "success",
        message: "Role created successfully"
    });
}

module.exports.accountAdminEdit = async (req, res) => {
    try {
        const id = req.params.id;

        const accountAdminDetail = await AccountAdmin.findOne({
            _id: id,
            deleted: false
        });

        if (!accountAdminDetail) {
            res.redirect(`/${pathAdmin}/account-admin/list`);
            return;
        }
        const roleList = await Role.find({ deleted: false });

        res.render('admin/page/setting-account-admin-edit', { pagetitle: "Setting Account Admin Edit", roleList: roleList, accountAdminDetail: accountAdminDetail });

    } catch (error) {
        console.error("Error editing account admin:", error);
        res.redirect(`/${pathAdmin}/account-admin/list`);
    }
}


module.exports.accountAdminEditPatch = async (req, res) => {
    try {
        const id = req.params.id;

        const accountAdminDetail = await AccountAdmin.findOne({
            _id: id,
            deleted: false
        });

        if (!accountAdminDetail) {
            res.json({
                code: "error",
                message: "Account admin not found"
            })
            return;
        }

        const existEmail = await AccountAdmin.findOne({
            _id: { $ne: id }, //not equal id 
            email: req.body.email
        })
        
        if (existEmail) {
            res.json({
                code: "error",
                message: "Email already in use"
            });
            return;
        }

        if (req.file) {
            req.body.avatar = req.file.path;
        } else {
            req.body.avatar = "";
        }

        req.body.updatedBy = req.account.id;

        await AccountAdmin.updateOne({
            _id: id,
            deleted: false
        }, req.body);

        res.json({
            code: "success",
            message: "Account admin updated successfully"
        });

    } catch (error) {
        res.json({
            code: "error",
            message: "An error occurred while updating the account admin"
        });
    }
}
