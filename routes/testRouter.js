const express = require('express')

const router = express.Router()
router.post('/', (req, res, next) => {
    res.status(201).json({
        test: "req.body"
    })
})

module.exports = router
