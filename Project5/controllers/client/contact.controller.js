const Contact = require('../../models/contacts.model.js');

module.exports.createPostEmail=async(req,res)=>{
    const {email} = req.body;

    const existEmail= await Contact.findOne({email:email});
    if(existEmail){
        res.json({code:"exist",message:"Email already exists"});
        return;
    }

    const newRecord=new Contact({
        email:email
    })
    await newRecord.save();

    res.json({code:"success",message:"Contact created successfully"});

}