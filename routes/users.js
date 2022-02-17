const express = require('express')
const router = express.Router()
const formValidation = require('../middlewares/formValidation')
const authInterceptor = require('../middlewares/authInterceptor')

const usersCtrl = require('../controllers/users')

router.post('/signup', formValidation.users('signup'), usersCtrl.signup)
router.post('/signin', formValidation.users('signin'), usersCtrl.signin)
router.post('/profile', authInterceptor, formValidation.users('profile'), usersCtrl.profile)

const contactsCtrl = require('../controllers/contacts')

router.post('/contacts', authInterceptor, usersCtrl.signup)


module.exports = router