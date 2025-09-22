import User from '../models/User.js';
import bcrypt from 'bcryptjs';


// @desc Get user profile
export const getUserProfile = async (req, res) => {
res.json(req.user);
};


// @desc Update user profile
export const updateUserProfile = async (req, res) => {
const user = await User.findById(req.user._id);


if (user) {
user.name = req.body.name || user.name;
user.email = req.body.email || user.email;
if (req.body.password) {
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(req.body.password, salt);
}


const updatedUser = await user.save();
res.json(updatedUser);
} else {
res.status(404).json({ message: 'User not found' });
}
};


// @desc Get all users (Admin only)
export const getUsers = async (req, res) => {
const users = await User.find().select('-password');
res.json(users);
};


// @desc Delete user (Admin only)
export const deleteUser = async (req, res) => {
const user = await User.findById(req.params.id);
if (user) {
await user.deleteOne();
res.json({ message: 'User removed' });
} else {
res.status(404).json({ message: 'User not found' });
}
};