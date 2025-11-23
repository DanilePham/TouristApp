const { AccountAdmin } = require('../../models/account-admin.model');
const bcrypt=require("bcryptjs");
 
 module.exports.getAccountPage = (req, res) => {
  res.render('admin/page/login', { pagetitle: "Log in" })
}

 module.exports.registerAccountPage = (req, res) => {
  res.render('admin/page/register', { pagetitle: "Register" })
}


 module.exports.registerAccountPagePost = async (req, res) => {
  const existingAccount= await AccountAdmin.findOne({
    email: req.body.email
  });

  if(existingAccount){
    res.json({
      code:"Exist",
      message:"Email already registered"
    })
    return;
  }

  req.body.status = "active"; //initialize status field

  //Hash password before saving to database
  req.body.password= await bcrypt.hash(req.body.password,10);

  console.log(req.body);

  const newAccount = new AccountAdmin(req.body);
  await newAccount.save();

  res.json({
    code:"Success",
    message:"Register successfully"
  });
}


module.exports.registerAccountPageInitial = (req, res) => {
  res.render('admin/page/register-initial', { pagetitle: "Register Initial" })
}

module.exports.forgotPasswordPage = (req, res) => {
res.render('admin/page/forgot-password', { pagetitle: "Forgot Password" })
}

module.exports.forgotPasswordPage = (req, res) => {
res.render('admin/page/forgot-password', { pagetitle: "Forgot Password" })
}

module.exports.otpPasswordPage = (req, res) => {
res.render('admin/page/otp-password', { pagetitle: "OTP Password" })
}

module.exports.resetPasswordPage = (req, res) => {
res.render('admin/page/reset-password', { pagetitle: "Reset Password" })
}