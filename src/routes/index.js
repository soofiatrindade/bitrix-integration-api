import express from 'express'
import * as controllers from '../controllers/index.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'API de Integração com Bitrix!' })
})

router.get('/card/:id', controllers.getDealById)
router.get('/card/:id/export', controllers.exportDealFiles);
router.get('/set-user/:id/:hook', controllers.setUser)

export default router

