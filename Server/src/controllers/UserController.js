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
        const [user, authToken] = await userManager.register(userData, confpassword)
        console.log('minahme')
        res.cookie('authToken', authToken)
        res.cookie('userId', user._id)
        res.json({
            email: user.email,
            username: user.username,
            userId: user._id
        })
    }catch(err){
        // res.status(400).json({
        //     message: err.message
        // })
    }
})

module.exports = router