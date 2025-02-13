const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

let schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    file_path: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  },
  { collation: { locale: "en" } }

);

module.exports = mongoose.model("Image", schema);

