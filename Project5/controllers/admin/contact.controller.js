const ContactModel = require('../../models/contacts.model.js');
const moment = require('moment');

module.exports.listContacts = async (req , res)=> {
    const find ={
        deleted: false
    }
    const contactList = await ContactModel.find( find ).sort({ createdAt: "desc" });

    for (const i of contactList) {
        i.createdAtFormat = moment(i.createdAt).format('HH:mm - DD/MM/YYYY');
    }
    res.render('admin/page/contact-list', { pagetitle: "Contact List" , contactList: contactList })
}
