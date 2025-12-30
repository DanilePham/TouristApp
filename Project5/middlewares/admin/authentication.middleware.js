const jwt = require('jsonwebtoken');
const AccountAdmin = require('../../models/account-admin.model').AccountAdmin;
const Role = require('../../models/roles.model').Role;

module.exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect(`/${pathAdmin}/account/login`);
        }
        const decoded = jwt.verify(token, "MUONBIETTHONGTINCONLAUNHACUNG");
        const { id, email } = decoded;

        const existingAccount = await AccountAdmin.findOne({
            _id: id,
            email: email,
            status: "active"
        });

        if (!existingAccount) {
            res.clearCookie('token');
            return res.redirect(`/${pathAdmin}/account/login`);
        }

        if (existingAccount.role) {
            const role = await Role.findOne({
                _id: existingAccount.role,
                deleted: false
            });
            if (role) {
                existingAccount.roleName = role.name;
            }
        }

        req.account = existingAccount;
        res.locals.account = existingAccount; // Make account info available in views

        next();

    } catch (err) {
        //console.error(err);
        res.clearCookie('token');
        return res.redirect(`/${pathAdmin}/account/login`);
    }
}