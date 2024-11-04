const router = require("express").Router()
const AppManager = require("../managers/AppManager")

router.post("/create", async(req, res) => {
    const cookies = req.headers.cookie
    const userId = req.body.userId
    const appData = {
        name: req.body.name,
        location: req.body.location,
        image: req.body.image,
        tenants: req.body.tenants,
        rent: req.body.rent,
        sign_date: req.body.sign_date
    }
    try{
        await AppManager.create(appData, userId)

    }catch(err){
        res.status(400)
    }
})

// router.get("/catalog", async(req, res) => {
//     try{
//         let posts = await AppManager.GetFromUser()
//         res.json(posts).end()
//     }catch(err){
//         res.status(404)
//     }
// })

module.exports = router