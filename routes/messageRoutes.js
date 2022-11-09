const express = require('express')
const router = express.Router()

const messageCtrl = require('../controllers/messageController')

router.post('/newmessage', messageCtrl.createNewMessage)
router.delete('/clear', messageCtrl.clearMessages)
router.get('/index', messageCtrl.allMessages)


module.exports = router