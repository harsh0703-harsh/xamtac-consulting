const jwt = require("jsonwebtoken");
const Users = require("../connection/schema/user.schema");


async function authenticate(req, res, next) {

    try {

        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Authorization token missing' });

        } else {

            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);

            const isUserValid = await Users.findOne({ email : decoded.email})

            if(isUserValid){

                req.user = decoded;

            }else{

                return res.status(400).send('User invalid ..')
            }
            
         
            next();

        }

    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = authenticate