const jwt = require('jsonwebtoken');
const JWT_KEY ="this is secrete";

module.exports = (req,res,next)=>{
    try {
        const decode = jwt.verify(req.body.token, JWT_KEY);
        req.userData = decode;
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed'
        })
    }
    next();
};