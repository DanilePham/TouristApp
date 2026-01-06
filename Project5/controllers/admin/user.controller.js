module.exports.listUsers = async (req , res)=> {
    
    res.render('admin/page/user-list', { pagetitle: "User List" })
}