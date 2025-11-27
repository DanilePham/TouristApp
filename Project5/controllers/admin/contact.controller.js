module.exports.listContacts = async (req , res)=> {
    res.render('admin/page/contact-list', { pagetitle: "Contact List" })
}
