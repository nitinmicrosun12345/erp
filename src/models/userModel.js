const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let answer = new Schema(
  { 

    name: {
        type: String,
        default: "",
    },

    email: {
        type: String,
        default: "",
    },

    password: {
        type: String,
        default: null,
    },

    mobile: {
        type: Number,
        default: null,
    },

    auth_key: {
        type: String,
        default: null,
    },

    status: {
        type: String,
        default: "Active",
    },

    current_status: {
      type: String,
      default: "Clocked_Out",
    }

  },
  {
    timestamps: true,
    versionKey: "",
  }
);
module.exports = mongoose.model("user", answer);