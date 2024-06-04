const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const data = req.body;
  const newUser = new User(data);
  console.log(User);
  try {
    // Email Exists
    const emailExists = await User.findOne({  
      email: req.body.email,
    });
    if (emailExists) {
      return res.status(400).json({
        message: "Email already Exists",
      });
    }
    const hashedpassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashedpassword;
    // Number Exists
    const numberExists = await User.findOne({
      number: req.body.number,
    });

    if (numberExists) {
      return res.status(400).json({
        message: "Number  already Exists",
      });
    }
    await newUser.save();
    return res.status(201).json({
      message: "User created Successfully",
      result: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const getallusers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      message: "Data Fetched Successfully",
      result: users,
      count: users.length,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const updateUser = async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;

  try {
    const emailExists = await User.findOne({
      email: req.body.email,
    });
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else if (emailExists) {
      return res.status(400).json({
        message: "Email already Exists in the Database",
      });
    }
    await User.findByIdAndUpdate(id, updatedUser);
    return res.status(200).json({
      message: "User Updated Successfully",
      result: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const result = await bcrypt.compareSync(password, user.password);
    if (!result) {
      return res.status(400).json({
        message: "Invalid Password!",
      });
    }
    const payload = { user };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return res.status(200).json({
      message: "User Logged In Successfully",
      token: token,
      result: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
  getallusers,
  updateUser,
  deleteUser,
  loginUser,
};
