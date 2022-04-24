const express = require('express')
const Profession = require('../models/Profession')
const router = express.Router({mergaParams: true})

router.get('/', async (req, res) => {
    try {
        const professions = await Profession.find()
        res.status(200).json({ list: professions})
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произощла ошибка. Поробуйте позже.'
        })
    }
})

module.exports = router
