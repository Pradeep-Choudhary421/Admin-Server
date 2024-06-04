const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
require('dotenv').config();

const authenticate=(req,res,next)=>{
     const usertoken = req.headers.authorization;
     if(!usertoken){
        return res.status(401).json({
            mesage:'Unauthorized' 
        })
     }
     try {
    const token = usertoken.split(" ");
    const JWT_TOKEN= token[1];
    const data =jwt.verify(JWT_TOKEN,process.env.SECRET_KEY);
    req.user = data.user;
    next();
     } catch (err) {
     return res.status(500).json({
        message: err.message
     })   
     }
}
// const Admincheck = async(req, res, next) => {  

//     try {
//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token)
//         const key =jwt.verify(token,process.env.SECRET_KEY);
//         let user =await User.findOne({ 
//             email: key.user.email,
//          });
//         if (user.is_Admin === true){
//           next();
//         }else{
//             return res.status(403).json({
//                 message:"You are not authorized to access"
//              });

//             }
//     } catch (err) {
//         return res.status(401).json({
//              message:"You are not an Admin" 
//             });
//     }
// };   

const checkAdmin = async (req, res,next) => {
    try{
        console.log("req.headers.authorization", req.headers.authorization)
        const token = req.headers.authorization.split(" ")[1];
        const key= jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findOne({
            email: key.user.email
        });
        if(user.is_Admin === true){
        next();
    }else{
        return res.status(403).json({
            message:"You are not authorized to access"
        });
    }
}
catch (err){
    return res.status(403).json({
        message: err.message
    })
}
}
module.exports = {
    authenticate,
    checkAdmin,
}