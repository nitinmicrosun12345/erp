let userModel = require("./../models/userModel");
//let user1Model =require("./../model/login");
let auth_key=require("./../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let mongoose = require("mongoose");

exports.register_data_save = async (req) => {
  try {
    // Check if email or mobile already exists
    const existingUser = await userModel.findOne({
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
      
    });

    if (existingUser) {
      return {
        message: "Email or mobile number already exists. Registration failed.",
        data: [],
        success: false,
        
      };
    }

    // Hash the password
    let salt = bcrypt.genSaltSync(10);
    req.body.pass = bcrypt.hashSync(req.body.pass, salt);

    // Save the new user
    let savedata = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.pass,
      mobile: req.body.mobile,
    });
 
    let saved_data = await savedata.save();

    if (saved_data) {
      return {
        message: "Data saved",
        data: saved_data,
        success: true,
      };
    } else {
      return {
        message: "Data not saved",
        data: [],
        success: false,
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      message: "Internal server error",
      data: [],
      success: false,
    };
  }
};

exports.login_data_validation = async (req, res) => {
  try {
    let email = req.body.email;

    // Check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        message: "Invalid email format",
        success: false,
        status: 400, 
      };
    }

    let data = await userModel.findOne({ email: email });

    if (!data) {
      return {
        message: "Wrong email or password",
        success: false,
        status: 401, 
      };
    }

    let matchpass = bcrypt.compareSync(req.body.pass, data.password);

    if (!matchpass) {
      return {
        message: "Wrong email or password",
        success: false,
        status: 401, 
      };
    }

    const token = jwt.sign({ _id: data._id.toString() }, process.env.SECRET_KEY);
    console.log("Token:",token);

    await userModel.findByIdAndUpdate({ _id: data._id }, { auth_key: token });

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 10000 * 60 * 60),
      httpOnly: true,
      overwrite: true,
    });

    return {
      message: "User is logged in",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      message: "Internal server error",
      success: false,
      status: 500, 
    };
  }
};

