const { AccountAdmin } = require('../../models/account-admin.model');

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports.getAccountPage = (req, res) => {
  res.render('admin/page/login', { pagetitle: "Log in" })
}

module.exports.registerAccountPage = (req, res) => {
  res.render('admin/page/register', { pagetitle: "Register" })
}

module.exports.loginAccountPagePost = async (req, res) => {
  const { email, password } = req.body;
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
      expiresIn: '14d'
    }
  );

  //Save token to cookie
  res.cookie("token", token, {
    maxAge: 14 * 24 * 60 * 60 * 1000, //14 days
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