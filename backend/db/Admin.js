const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("../models/User")

let schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  }
);

// Create the AdminAuth model
const AdminAuth = mongoose.model('Adminauth', schema);

const Request = async (req, res) => {
  const Admin = new AdminAuth(req.body);
  const admin = await Admin.save();
  res.json(admin);
}

module.exports = AdminAuth; // Export the model instead of mongoose.model("Adminauth", schema);
