const User = require("../models/User");

const admin = async (req,res,next) => {
    const user = await User.findById(req.user.userId);
    if(!user || !user.isAdmin){
        return res.status(403).json({ message: "Access denied. Admins only."});
    }
    next();
};

module.exports = admin;