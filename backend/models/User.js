const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // Fixed typo (require → required)
    },
    email: {
        type: String,
        required: true,
        unique: true,   // Ensures no duplicate emails
    },
    number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {    // Added missing field
        type: Boolean,
        default: false,
    },
    resetToken:{type:String},
    resetTokenExpiration:{type:Date},
});

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Generate Token Method
userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,  
        },
       'ritik111 ', 
        { expiresIn: "30d" }
    );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
