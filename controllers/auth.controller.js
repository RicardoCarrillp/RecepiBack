const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const connection = require('../database/db');

const { promisify } = require('util');

//metodo registration

exports.register = async (req, res) => {

    const user = {
        username: req.body.username,
        email: req.body.email,
        pass: req.body.pass
    }

    let passwordHash = await bcryptjs.hash(user.pass, 8);

    const userCreado = {
        username: req.body.username,
        email: req.body.email,

    }
    connection.query('INSERT INTO usuarios SET ?', { username: user.username, email: user.email, pass: passwordHash }, async (err, results) => {
        if (err) {
            res.send(err.sqlMessage);
        } else {
            res.send(userCreado)
        }
    })
}

//metodo login
exports.login = async (req, res) => {
    const user = {
        email: req.body.email,
        pass: req.body.pass
    }

    let passwordHash = await bcryptjs.hash(user.pass, 8);


    if (user.email && user.pass) {
        connection.query('SELECT * from usuarios WHERE email = ?', [user.email], async (err, results) => {
            if (results.length == 0 || !(await bcryptjs.compare(user.pass, results[0].pass))) {
                res.send("Email o contraseña incorrecta")
            } else {
                const id = results[0].id
                const username= results[0].username
                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION,
                })
                console.log(token);

                const cookieOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions)
                res.send({
                    jwt:token,
                    name:username,
                    logged:true
                })

            }
        })
    }
}

exports.isAuthenticated = async (req, res, next) => {
    if (req.cookieOptions.jwt) {
        try {
            const decodificado = await promisify(jwt.verify)(req.cookieOptions.jwt, process.env.JWT_SECRET)
            connection.query('SELECT * from usuarios WHERE id = ?', [decodificado.id], (err, results) => {
                if (!results) {
                    return next()
                }
                req.user=results[0]
                return next()
            })

        } catch (error) {
            console.log(error);
            return next();
        }

    }
    else{
        res.send({
            logged:false
        })
        next();
    }

}