const express= require('express')

const router=express.Router();

const Authcontroller=require('../controllers/auth.controller')
const protectedRoutes=require('../middleware/auth.middleware')




router.post('/register',     Authcontroller.register)

router.post('/login', Authcontroller.login)

router.get('/',(req, res) => {
    return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});

router.get('/secure/user', Authcontroller.isAuthenticated)

module.exports = router;