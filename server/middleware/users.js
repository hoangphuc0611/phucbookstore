const jwt = require("jsonwebtoken");

module.exports = {
    validateRegister: (req, res, next)=>{
        // username min length 3
        if (!req.body.username || req.body.username.length < 3){
            return res.status(400).send({
                message: "Please enter a username with min 3 character"
            })
        }
        // password min 6 chars
        if (!req.body.password || req.body.password < 6){
            return res.status(400).send({
                message: "Please enter a password with min 6 character"
            })
        }

        // password (repeat) must match 
        if (!req.body.password_repeat || req.body.password != req.body.password_repeat){
            return res.status(400).send({
                message: "Both password must match"
            })
        }
        next();

    },
    isLoggedIn: (req, res, next)=>{
        try{
            const authenHeader = req.headers.authorization
            const token = authenHeader.split(' ')[1]
            const decoded = jwt.verify(token,"SECRETKEY")
            req.userData = decoded
            next();
        }
        catch(err){
            throw err;
            return res.status(400).send({
                message: "your session is not valid"
            })
        }
        
    },
}