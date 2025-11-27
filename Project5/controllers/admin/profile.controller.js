module.exports.editProfile = async (req , res)=> {
    res.render('admin/page/profile-edit', { pagetitle: "Profile Edit" })
}

module.exports.changePassword = async (req,res) => {
    res.render('admin/page/profile-change-password',{pagetitle: "Change Password"})
}