const SettingWebsiteInfo = require('../../models/setting-website-info.model');
const bcrypt = require('bcrypt');
const { AccountAdmin } = require("../../models/account-admin.model")
const { permissions } = require('../../config/variable.config');
const Role = require('../../models/roles.model');
const moment = require('moment');
const jwt = require('jsonwebtoken');



module.exports.editProfile = async (req, res) => {
    res.render('admin/page/profile-edit', { pagetitle: "Profile Edit" })
}

module.exports.changePassword = async (req, res) => {
    res.render('admin/page/profile-change-password', { pagetitle: "Change Password" })
}

module.exports.updateProfile = async (req, res) => {
    try {
        const id = req.account.id;

        const existEmail = await AccountAdmin.findOne({
            _id: { $ne: id }, //not equal id 
            email: req.body.email
        });

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

        const result = await AccountAdmin.updateOne({
            _id: id,
            deleted: false
        }, req.body);

        //Create JWT
        const token = jwt.sign(
            {
                id: id,
                email: req.body.email
            },
            "MUONBIETTHONGTINCONLAUNHACUNG",
            { 
                expiresIn: '1d'
            }
        );

        //Save token to cookie
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, //1 day
            httpOnly: true, // Just only allow cookie access by server
            sameSite: "strict", // Not allow cross-site cookie
        });

        res.json({
            code: "success",
            message: "Account admin updated successfully"
        });

        console.log("update result:", result); // matchedCount, modifiedCount

    } catch (error) {
        res.json({
            code: "error",
            message: "An error occurred while updating the account admin"
        });
    }
}

// Change password
module.exports.updateChangePassword = async (req, res) => {
    const id = req.account.id;

    // bycrypt password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    req.body.updatedBy = req.account.id;    
    const result = await AccountAdmin.updateOne({
        _id: id,
        deleted: false
    }, req.body);

    res.json({
        code: "success",
        message: "Password changed successfully"
    });
}