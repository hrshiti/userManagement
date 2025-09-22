
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register function
const register = async (req, res) => {
    try {
        const { username, email, number, password } = req.body;

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password before storing (Middleware already does this)
        const userCreated = await User.create({
            username,
            email,
            number,
            password, // No need to hash here, it's already hashed in the schema
        });

        res.status(201).json({
            msg: "User registered successfully",
            token: userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        // If successful, return token and user ID
        res.status(200).json({
            msg: "Login successful",
            token: userExist.generateToken(),
            userId: userExist._id.toString(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


//registration data get api
const registerdata = async(req,res)=>{
try {
    const response = await User.find()
    if(!response){
        res.status(404).json({msg:"data not found"})
        return
    }
    res.status(200).json({msg:response})
} catch (error) {
    console.log(`services : ${error}`)

}
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
const transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"hritik45raghuwanshi@gmail.com",
        pass:"qkea hvyy dmtr zxzp"
    }
})

const forgetPassword = async(req,res)=>{
    try {
        console.log("Received request body:", req.body); // ✅ Debug Step 1

        if (!req.body) {
            return res.status(400).json({ msg: "Request body is missing" }); // ✅ Debug Step 2
        }

        const { email } = req.body;

        const user = await User.findOne({email})
        if(!user){
          return  res.status(404).json({msg:"user not found"})
        }
        const resetToken = crypto.randomBytes(32).toString("hex")
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now()+ 3600000
        await user.save()

const resetLink =  `http://localhost:5173/reset/${resetToken}`;
await transporter.sendMail({
from:"kannuuu12345",
to: user.email,
subject:"password reset request",
html:`<p>You requested a password reset.</p>
                   <p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
}
)
res.status(200).json({ msg: "Reset link sent to your email" });
    } catch (error) {
        //res.status(404).json({msg:"user not found"})
        console.error(error);
    }
}


const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: "Invalid or expired token" });
        }

        // ✅ Hash new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // ✅ Update user with new password and remove resetToken fields
        await User.updateOne(
            { _id: user._id },
            {
                $set: { password: hashedPassword },
                $unset: { resetToken: "", resetTokenExpiration: "" } // ✅ Remove fields
            }
        );

        res.status(200).json({ msg: "Password reset successful" });
        console.log("Password reset successful for user:", user.email);
    } catch (error) {
        console.error("Error in resetPassword API:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const getForgetPasswordRequests = async (req, res) => {
    try {
        const users = await User.find({ resetToken: { $exists: true } });

        if (!users.length) {
            return res.status(404).json({ msg: "No forget password requests found" });
        }

        res.status(200).json({ msg: "Forget password requests fetched successfully", users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


const getResetPasswordRequests = async (req, res) => {
    try {
        const users = await User.find({
            resetToken: { $exists: true },
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!users.length) {
            return res.status(404).json({ msg: "No valid reset password requests found" });
        }

        res.status(200).json({ msg: "Reset password requests fetched successfully", users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

//user data


module.exports = { register, login,updateUser, deleteUser, registerdata,forgetPassword, resetPassword, getForgetPasswordRequests,getResetPasswordRequests};
