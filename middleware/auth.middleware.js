
const express= require('express')
const jwt = require('jsonwebtoken');

const router=express.Router();


const protectedRoutes=router.use('/secure',function(req, res, next) {
    const token = req.headers['authorization']
    if (!token) {
      res.status(401).send({
        ok: false,
        message: 'Toket inválido'
      })
    }
  
    
  
     jwt.verify(token,process.env.JWT_SECRET, function(err, token) {
      if (err) {
        return res.status(401).send({
          ok: false,
          message: 'Toket inválido'
        });
      } else {
        req.token = token
        next();
      }
    }); 

 
    }
  ); 


  module.exports= protectedRoutes;