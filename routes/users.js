const express = require('express')
const router = express.Router()
const formValidation = require('../middlewares/validations/users')
const authInterceptor = require('../middlewares/authInterceptor')

const usersCtrl = require('../controllers/users')

router.post('/signup', formValidation('signup'), usersCtrl.signup)
router.post('/signin', formValidation('signin'), usersCtrl.signin)
router.post('/profile', authInterceptor, formValidation('profile'), usersCtrl.profile)


module.exports = router