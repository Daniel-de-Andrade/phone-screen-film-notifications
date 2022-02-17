const express = require('express')
const router = express.Router()
const formValidation = require('../middlewares/formValidation')
const authInterceptor = require('../middlewares/authInterceptor')

const contactsCtrl = require('../controllers/contacts')

router.post('/create', authInterceptor, contactsCtrl.create)
router.get('/read', authInterceptor, contactsCtrl.read)
router.post('/details', authInterceptor, contactsCtrl.details)
router.post('/update', authInterceptor, contactsCtrl.update)
router.post('/delete', authInterceptor, contactsCtrl.delete)

module.exports = router