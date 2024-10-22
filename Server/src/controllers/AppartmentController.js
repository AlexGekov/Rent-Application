const router = require("express").Router()
const AppManager = require("../managers/AppManager")

router.get("/catalog", async(req, res) => {
    try{
        let posts = await AppManager.GetAll()
        res.json(posts).end()
    }catch(err){
        res.status(404)
    }
})

module.exports = router