const express = require('express')
const router = express.Router()
const ownerCtrl = require('../controllers/ownerController')

router.get('/info', ownerCtrl.specificOwner)
router.put('/update', ownerCtrl.updateOwnerEmail)
router.delete('/clear', ownerCtrl.clear)
router.get('/all', ownerCtrl.allOwners)

module.exports = router