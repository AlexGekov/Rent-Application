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

router.get('/getUser', async (req, res) => {
    const userId = req.cookies?.userId
    try {
        const [user, authToken] = await userManager.findUser(userId)
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

module.exports = router