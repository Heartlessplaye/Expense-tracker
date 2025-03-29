const { verify } = require('jsonwebtoken');
const User = require('../models/User')

exports.protect = async (req, res, next ) => { 
    let token = req.headers['authorization']?.split(" ")[1];  

    if(!token ) {
        return res.status(401).json({
            message : "Not Authorized, no token"
        })
    }
    try {
        const decoded =  verify(token, process.env.JWT_SECRET);
       
        req.user = await User.findById(decoded.id).select("-password"); 
        next();
    }
    catch (err ){
        res.status(401).json({message : "Not authorized, token failed", error : err.message});
    }


};

