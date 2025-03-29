const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    fullName: {
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
    profileImageUrl: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// encrypt password before saving
// not use arrow function in which this refers to something else 
schema.pre("save", async function(next)  {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//compare passwords 
schema.methods.comparePassword = async function (candidatePassword){
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", schema);
