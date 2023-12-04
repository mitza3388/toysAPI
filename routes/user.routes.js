const express = require("express");
const Joi = require("joi");
const { register, login } = require("../controllers/user.controller");

const router = express.Router();
const userJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')),
    }),
    register: Joi.object().keys({
        password: Joi.string().max(20).required(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')).required(),
        name: Joi.string().required(),
    })
};

router.post("/register", (req, res, next) => {
    try {
        const validate = userJoiSchema.register.validate(req.body);
        if (validate.error) {
            throw Error(validate.error);
        }
        next();
    } catch (error) {
        next(error)
    }
}, register);

router.post("/login", login);


module.exports = router;