import Router from '@koa/router'
import login from '../controllers/auth/login'
import register from '../controllers/auth/register'

const router = new Router()

router.post('/login', login)

router.post('/:id', register)

export default router
