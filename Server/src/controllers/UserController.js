const router = require("express").Router()

const userManager = require('../managers/UserManager')

router.post('/register', async(req, res) => {
    const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    const confpassword = req.body.confpassword

    try{
        console.log('trying')
        const [user, authToken] = await userManager.register(userData, confpassword)
        res.cookie('authToken', authToken)
        res.cookie('userId', user._id)
        res.cookie('username', user.username)
        res.json({
            email: user.email,
            username: user.username,
            userId: user._id
        })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/getUser', async (req, res) => {
    const userId = req.cookies?.userId
    try{
        const [user, authToken] = await userManager.findUser(userId)
        res.cookie('authToken', authToken)
        res.cookie('userId', user._id)
        res.cookie('username', user.username)
        res.json({
            email: user.email,
            username: user.username,
            userId: user._id
        })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})

module.exports = router