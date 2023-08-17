const express = require("express");
var bcrypt = require('bcryptjs');
const Users = require("../connection/schema/user.schema");
const jwt = require("jsonwebtoken");
const authentication = express.Router();


authentication.post('/register', async (req,res)=>{

    const {email, first_name , last_name, password, confirm_password} = req.body;

    if(email && first_name && last_name && password && confirm_password ){

        if(password === confirm_password){

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password,salt)

            await Users.create({

                email : email , 
                first_name : first_name , 
                last_name : last_name,
                password : hash
                
            })

            res.status(200).send("user registered")

        }else{

            res.status(400).send("password not matched..")
        }

        

    }else{

        res.status(400).send("please provide all the required fields .")
    }

})

authentication.get("/login",async (req,res)=>{

    const { email , password } = req.body;

    if(email && password){

        const user = await Users.findOne(

            {
                email : email 
            }
        ) 

        if(user){

            const isMatched = bcrypt.compareSync(password , user.password);

            if(isMatched){

                const token = jwt.sign(

                    {
                        id : user._id , 
                        email  : user.email
                    },

                    process.env.JWT_SECRET_KEY,

                    {
                        expiresIn : '12h'
                    }
                )
                
                res.status(200).send(token);
    
            }else{

                res.status(400).send("Invalid Credentails")
    
            }

        }else{

            res.status(400).send("Invalid Credentails")
        }

       

    }else{

        res.status(400).json('please provide email and password to login');
    }
})

module.exports = authentication