const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const brandRouter = require('./brandRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)

module.exports = router