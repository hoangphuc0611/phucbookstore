const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const uuid = require("uuid")
const db = require("../lib/db.js");
const userMiddleWare = require("../middleware/users.js");
const { validateRegister } = require("../middleware/users.js");


//sign-up
router.post('/sign-up', validateRegister, (req, res, next) => {
    db.query(`Select * from Users`, (err, result) => {
        if (result.length) {
            return res.status(409).send({
                message: "This username is already in use!"
            })
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    throw err;
                    return res.status(500).send({
                        message: err
                    });
                }
                else {
                    db.query(`INSERT INTO Users (id, username, email, password, registered) 
                                Values ('${uuid.v4()}',${db.escape(
                        req.body.username
                    )},${db.escape(req.body.email)},'${hash}',now())`,
                        (err, result) => {
                            if (err) {
                                throw err;
                                return res.status(400).send({
                                    message: err,
                                })
                            }
                            else {
                                return res.status(201).send({
                                    message: "Registed!"
                                })
                            }
                        })
                }
            })
        }
    })
})
//login
router.post('/login', (req, res, next) => {
    db.query(`select * from Users where username = ${db.escape(req.body.username)}`,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                    message: err,
                })
            }
            if (!result.length) {
                return res.status(400).send({
                    message: 'Username or Password incorrect!'
                })
            }
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    if (bErr) {
                        throw bErr;
                        return res.status(400).send({
                            message: 'Username or Password incorrect!'
                        })
                    }
                    if (bResult) {
                        const token = jwt.sign({
                            username: result[0].username,
                            userId: result[0].id,
                        },
                            "SECRETKEY",
                            { expiresIn: "7d" }
                        );
                        db.query(`UPDATE Users set last_login = now() WHERE id = ${db.escape(result[0].id)}`);
                        return res.status(200).send({
                            message: 'Logged in!',
                            token,
                            user:result[0] 
                        });
                    }
                    return res.status(400).send({
                        message: 'Username or Password incorrect!'
                    })
                })

        })
})
//secret-router
router.post('/secret-router', (req, res, next) => {

})


module.exports = router;