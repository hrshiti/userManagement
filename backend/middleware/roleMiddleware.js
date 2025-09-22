// middleware/roleMiddleware.js
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
     console.log("Role Middleware - User role:", req.user?.role);
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
      
    }
    next();
  };
};

module.exports = roleMiddleware;
