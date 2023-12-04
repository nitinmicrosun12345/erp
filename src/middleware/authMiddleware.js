const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const SECRET_KEY = process.env.SECRET_KEY; // Fetching the secret key from the environment

        console.log(SECRET_KEY); // Log the secret key to ensure it's fetched correctly

        const decoded = jwt.verify(token, SECRET_KEY); // Using the correct variable for the secret key

        let data = await userModel.findOne(decoded);
        console.log('Decoded user ID:', decoded._id);
               


        if (data && data.status === "blocked") {
            return res.status(401).json({
                success: false,
                status: false,
                msg: 'User is blocked'
            });
        }

        if (!decoded) {
            throw new Error();
        }

        req.user = decoded;
        
        console.log(decoded);
        next();
    } catch (e) {
        const errorResponse = {
            status: false,
            msg: 'Invalid Token'
        };
        return res.status(401).json(Object.assign({ success: false }, errorResponse));
    }
};

module.exports = auth;
