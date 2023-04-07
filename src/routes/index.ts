import Router from '@koa/router'
import contactRoutes from './contact.routes'
import authRoutes from './auth.routes'
import authHandler from '../middleware/authHandler'

const router = new Router()

router.get('/ping', async ctx => {
  ctx.body = 'pong'
})

router.use('/v1/contacts', authHandler, contactRoutes.routes())
router.use('/v1/auth', authRoutes.routes())

export default router
