const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');

router.get('/',function(req,res){
    res.send("hello world") 
})

router.post('/signin' , function(req,res){
    const {email,password} = req.body;
    
    if(!email||!password){
        return res.status(422).json({error:"type all the fields"})
    } 

    if(email === "suvrajeet@gmail.com" && password === "password"){
        const token = jwt.sign({email:"suvrajeet@gmail.com"},JWT_SECRET)
        
        res.json({token:token,user:{email:"suvrajeet@gmail.com",name:"suvrajeet"}}); 
    }
    else{
        return res.status(422).json({error:"invalid email or password"})
    }
    

})


module.exports = router;