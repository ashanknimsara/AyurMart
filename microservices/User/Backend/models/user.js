//what type data user going to have 
//user databse--> save

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//user schema
const userSchema = mongoose.Schema(
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },

  //when was created in database feild &updated
  {
    timestamps: true,
  }
);

//encrypt the password 
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //more char secure max
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


//decrypt the password 
//compare the entered p/w and database p/w
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;