// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
console.error(err.stack);


// Handle duplicate key error (e.g. unique email)
if (err.code === 11000) {
const field = Object.keys(err.keyValue)[0];
return res.status(400).json({ message: `${field} already exists` });
}


res.status(err.statusCode || 500).json({ message: err.message || 'Server Error' });
};