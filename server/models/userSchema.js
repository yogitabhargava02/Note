const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not a valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// Hash password
userSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(this.password, 12);
  
  next();
});

// Creating model
const userDb = mongoose.model("AuthUsers", userSchema);

module.exports = userDb;
