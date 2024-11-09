const router = require("express").Router()
const AppManager = require("../managers/AppManager")

router.post("/create", async(req, res) => {
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

router.get("/:id", async (req, res) => {
    let userId = req.cookies.userId
    let apId = req.params.id
    try{
        let apartment = await AppManager.Find(userId, apId)
        res.json(apartment)
    }catch(err){
        res.status(400)
    }
})

module.exports = router