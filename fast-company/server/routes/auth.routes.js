const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const router = express.Router({mergaParams: true})
const { generateUserData } = require('../utils/helpers')
const tokenService = require('../services/token.service')
const { check, validationResult } = require('express-validator')
const Token = require('../models/Token')

router.post('/signUp', [
    check('email', 'Некорректноый email').isEmail(),
    check('password', 'Минимальная длина пароля 8 символов').isLength({min: 8}),
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                error: {
                    message: 'IVALID_DATA',
                    code: 400,
                    errors: errors.array()
                }
            })
        }

        const {email, password} = req.body
        const existingUser = await User.findOne({ email: email })
        if(existingUser) {
            return res.status(400).json({
                error: {
                    message: 'EMAIL_EXISTS',
                    code: 400
                }
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            ...generateUserData(),
            ...req.body,
            password: hashedPassword,
        })
        console.log(newUser)
        const tokens = tokenService.generate({ _id: newUser._id })
        await tokenService.save(newUser._id, tokens.refreshToken)
        res.status(201).send({
            ...tokens, userId: newUser._id
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
}])

router.post('/signInWithPassword', [
    check('email', 'Incorrect email').normalizeEmail().isEmail(),
    check('password', 'Password can not be empty').exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: 'IVALID_DATA',
                        code: 400,
                        errors: errors.array()
                    }
                })
            }

            const {email, password} = req.body

            const existingUser = await User.findOne({email: email})

            if(!existingUser) {
                return res.status(400).json({
                    error: {
                        message: 'EMAIL_NOT_FOUND',
                        code: 400
                    }
                })
            }
            
            const isValidPassword = await bcrypt.compare(password, existingUser.password)
            if(!isValidPassword) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_PASSWORD',
                        code: 400
                    }
                })
            }

            const tokens = tokenService.generate({ _id: existingUser._id })
            await tokenService.save(existingUser._id, tokens.refreshToken)

            res.status(200).send({...tokens, userId: existingUser._id})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
}])

router.post('/token', async (req, res) => {
    try {
        const {refresh_token: refreshToken} = req.body
        const data = tokenService.validateRefresh(refreshToken)
        const dbToken = await tokenService.findToken(refreshToken)
        if(!data || !dbToken || data._id !== dbToken?.user?.toString()) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        const tokens = await tokenService.generate({
            _id: data._id
        })
        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({...tokens, userId: data._id})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
})


module.exports = router
