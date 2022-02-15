const express = require('express')
const router = express.Router()
const formValidation = require('../middlewares/formValidation')
const authInterceptor = require('../middlewares/authInterceptor')

const usersCtrl = require('../controllers/users')

router.post('/signup', formValidation.validate('signup'), usersCtrl.signup)
router.post('/signin', formValidation.validate('signin'), usersCtrl.signin)
router.post('/profile', formValidation.validate('profile'), usersCtrl.profile)

module.exports = router