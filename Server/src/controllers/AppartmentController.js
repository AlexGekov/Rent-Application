const router = require("express").Router()
const AppManager = require("../managers/AppManager")

router.post("/create", async(req, res) => {
    console.log("trying to create...")
    console.log(req.body)
    const appData = {
        name: req.name,
        location: req.location
    }

    try{
        
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