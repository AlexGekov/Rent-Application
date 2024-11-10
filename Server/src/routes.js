const router = require('express').Router()
const UserController = require('./controllers/UserController')
const ApartmentController = require('./controllers/ApartmentController')

router.use('/users', UserController)
router.use('/apartments', ApartmentController)

module.exports = router