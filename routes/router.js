const express= require('express')

const router=express.Router();

const Authcontroller=require('../controllers/auth.controller')
const protectedRoutes=require('../middleware/auth.middleware')




router.post('/register',     Authcontroller.register)

router.post('/login', Authcontroller.login)

router.get('/secure/', protectedRoutes,(req, res) => {
    return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});

router.get('/secure/datos',protectedRoutes, (req, res) => {
    const datos = [
     { id: 1, nombre: "Asfo" },
     { id: 2, nombre: "Denisse" },
     { id: 3, nombre: "Carlos" }
    ];
    
    res.json(datos);
   });

module.exports = router;