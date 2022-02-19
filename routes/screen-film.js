const express = require('express')
const router = express.Router()
const formValidation = require('../middlewares/validations/screen-film')
const authInterceptor = require('../middlewares/authInterceptor')

const screenFilmCtrl = require('../controllers/screen-film')

router.post('/create', authInterceptor, screenFilmCtrl.create)
router.get('/read', authInterceptor, screenFilmCtrl.read)
router.post('/details', authInterceptor, screenFilmCtrl.details)
router.post('/update', authInterceptor, screenFilmCtrl.update)
router.post('/delete', authInterceptor, screenFilmCtrl.delete)

module.exports = router