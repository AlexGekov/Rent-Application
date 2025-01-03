const router = require("express").Router()
const ApManager = require("../managers/ApManager")

router.post("/create", async (req, res) => {
    const userId = req.cookies.userId
    const apData = {
        name: req.body.name,
        location: req.body.location,
        image: req.body.image,
        tenants: req.body.tenants,
        rent: req.body.rent,
        sign_date: req.body.sign_date
    }
    try {
        await ApManager.create(apData, userId)
        res.end()
    } catch (err) {
        res.status(400)
    }
})

router.get("/owned", async (req, res) => {
    let userId = req.cookies.userId
    try {
        let apartments = await ApManager.FindApartments(userId)
        res.json(apartments)
    } catch (err) {
        res.status(400)
    }
})

router.get("/search/:search", async (req, res) => {
    let search = req.params.search
    try {
        let properties = await ApManager.search(search)
        res.json(properties).end()
    } catch (err) {
        res.status(404)
    }
})

router.get("/:id", async (req, res) => {
    let apId = req.params.id
    console.log("getting info")
    try {
        let apartment = await ApManager.Find(apId)
        console.log(apartment)
        res.json(apartment)
    } catch (err) {
        res.status(400).json(err.message)
    }
})

router.delete("/:id", async (req, res) => {
    console.log("Deleting...")
    let userId = req.cookies.userId
    let apId = req.params.id
    await ApManager.Delete(userId, apId)
    res.end()
})

router.put("/:id", async (req, res) => {
    let apId = req.body.apId
    const apData = {
        name: req.body.name,
        location: req.body.location,
        image: req.body.image,
        tenants: req.body.tenants,
        rent: req.body.rent,
        sign_date: req.body.sign_date
    }
    try{
        await ApManager.Edit(apId, apData)
        res.end()
    } catch (err) {
        res.status(400)
    }
})

module.exports = router