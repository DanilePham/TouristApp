module.exports.listSettings = async (req , res) => {
    res.render('admin/page/setting-list', { pagetitle: "Setting List" })
}

module.exports.websiteInfo = async (req , res) => {
    res.render('admin/page/setting-website-info', { pagetitle: "Website Information" })
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