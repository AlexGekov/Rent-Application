const router = require("express").Router()

const userManager = require('../managers/UserManager')

router.post('/register', async (req, res) => {
    const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    const confpassword = req.body.confpassword

    try {
        const [user, authToken] = await userManager.register(userData, confpassword)
        res.cookie('authToken', authToken)
        res.cookie('userId', user._id)
        res.json({
            email: user.email,
            username: user.username,
            userId: user._id
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

router.post('/login', async (req, res) => {
    const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }
    try{
        const [user, token] = await userManager.login(userData)
        res.cookie('authToken', token)
        res.cookie('userId', user._id)
        res.json({
            email: user.email,
            username: user.username,
            userId: user._id,
        })

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

router.post('/logout', async (req, res)=> {
    res.clearCookie("userId")
    res.clearCookie("authTokem")
    res.end()
})

router.get("/apartments", async (req, res) => {
    let userId = req
    try{
        let apartments = await userManager.findApartments(userId)
        res.json(apartments)
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router