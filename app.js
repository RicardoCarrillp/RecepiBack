
const express = require('express');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs')
const session = require('express-session');
const cors = require('cors')

const app = express();
dotenv.config({ path: './env/.env' });

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true

}))
 
const connection = require('./database/db')

// app.get('/', (req, res) => {
//     return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
// });


// app.post('/register', async (req, res) => {
//     const user = {
//         username: req.body.username,
//         email: req.body.email,
//         pass: req.body.pass
//     }

//     let passwordHash = await bcryptjs.hash(user.pass, 8);

//     const userCreado = {
//         username: req.body.username,
//         email: req.body.email,

//     }
//     connection.query('INSERT INTO usuarios SET ?', { username: user.username, email: user.email, pass: passwordHash }, async (err, results) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(userCreado)
//         }
//     })


// })


// app.post('/login', async (req, res) => {
//     const user = {
//         email: req.body.email,
//         pass: req.body.pass
//     }

//     let passwordHash = await bcryptjs.hash(user.pass, 8);


//     if (user.email && user.pass) {
//         connection.query('SELECT * from usuarios WHERE email = ?', [user.email], async (err, results) => {
//             if (results.length == 0 || !(await bcryptjs.compare(user.pass, results[0].pass))) {
//                 res.send("Email o contraseña incorrecta")
//             } else {
//                 res.send("Login correto")
//             }
//         })
//     }
// })


app.use('/',require('./routes/router'))

app.listen(process.env.PORT)
console.log('app running on port ',process.env.PORT ); 