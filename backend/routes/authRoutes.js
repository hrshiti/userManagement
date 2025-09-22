const express = require("express")
const router = express.Router()

const { updateUser, deleteUser,register,login, registerdata, resetPassword, forgetPassword,getForgetPasswordRequests,getResetPasswordRequests } = require("../controllers/authController")
const { admin } = require("../middleware/authmiddleware")





router.post("/register",register)
router.get("/registerdata",registerdata)
router.post("/login",login)
router.put("/updateUser/:id", admin, updateUser);


router.delete("/deleteUser/:id",admin,  deleteUser);

router.post("/forget-password",forgetPassword)

router.post("/reset-password/:token",resetPassword)
router.get("/forget-password-requests", getForgetPasswordRequests);

// Get all reset password requests
router.get("/reset-password-requests", getResetPasswordRequests);








module.exports = router