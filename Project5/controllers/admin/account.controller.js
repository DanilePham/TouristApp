const { AccountAdmin } = require('../../models/account-admin.model');

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {generateSlug} = require('../../helpers/generate.helper');
const { ForgotPassword } = require('../../models/forgot-password.model');

module.exports.getAccountPage = (req, res) => {
  res.render('admin/page/login', { pagetitle: "Log in" })
}

module.exports.registerAccountPage = (req, res) => {
  res.render('admin/page/register', { pagetitle: "Register" })
}

module.exports.loginAccountPagePost = async (req, res) => {
  const { email, password, rememberPass } = req.body;
  const existingAccount = await AccountAdmin.findOne({ email: email });

  if (!existingAccount) {
    res.json({
      code: "error",
      message: "Email not registered"
    });
    return;
  }


  const isPasswordValid = await bcrypt.compare(password, existingAccount.password);

  if (!isPasswordValid) {
    res.json({
      code: "error",
      message: "Invalid password"
    });
    return;
  }

  if (existingAccount.status != "active") {
    res.json({
      code: "error",
      message: "Account is not active"
    });
    return;
  }

  //Create JWT
  const token = jwt.sign(
    {
      id: existingAccount.id,
      email: existingAccount.email
    },
    "MUONBIETTHONGTINCONLAUNHACUNG",
    {
      expiresIn: rememberPass ? '14d' : '1d'
    }
  );

  //Save token to cookie
  res.cookie("token", token, {
    maxAge: rememberPass ? 14 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, //14 days or 1 day
    httpOnly: true, // Just only allow cookie access by server
    sameSite: "strict", // Not allow cross-site cookie
  });

  console.log(token);

  res.json({
    code: "Success",
    message: "Login successfully"
  });
}


module.exports.registerAccountPagePost = async (req, res) => {
  const existingAccount = await AccountAdmin.findOne({
    email: req.body.email
  });

  if (existingAccount) {
    res.json({
      code: "Exist",
      message: "Email already registered"
    })
    return;
  }


  // req.body.status = "active"; //initialize status field
  req.body.status = "pending"; //initialize status field
  //Hash password before saving to database
  req.body.password = await bcrypt.hash(req.body.password, 10);

  console.log(req.body);

  const newAccount = new AccountAdmin(req.body);
  await newAccount.save();

  res.json({
    code: "Success",
    message: "Register successfully"
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

module.exports.logoutAccountPage = (req, res) => {
  res.clearCookie("token");
  res.redirect(`/${pathAdmin}/account/login`);
}

module.exports.forgotPasswordPagePost = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  //Check if email exists
  const existingAccount = await AccountAdmin.findOne({ email: email , status: "active"});
  
  if (!existingAccount) {
    res.json({
      code: "error",
      message: "Email not registered"
    });
    return;
  }

  //Check if there is an OTP record that is not expired yet
  const existingOtp = await ForgotPassword.findOne({ email: email });
  if (existingOtp) {
    res.json({
      code: "error",
      message: "An OTP has already been sent to your email. Please check your email."
    });
    return;
  }

  //send OTP code to customer email  const otp =generateSlug(4);
  const otp =generateSlug(4);
  console.log(otp);


  // Save into CSDL after 5 minutes expire
  const recordOtp = new ForgotPassword({
    email: email,
    otp: otp,
    expireAt: Date.now() + 5 * 60 * 1000 // 5 minutes from now
  });
  await recordOtp.save();

  //send OTP for customer email
  


  res.json({
    code: "error",
    message: "OTP has been sent to your email"
  });
}