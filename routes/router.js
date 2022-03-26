const express= require('express')

const router=express.Router();

const Authcontroller=require('../controllers/auth.controller')

router.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});


router.post('/register',     Authcontroller.register)

router.post('/login', Authcontroller.login)

router.get('/dashboard', (req, res) => {
    return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});


module.exports = router;