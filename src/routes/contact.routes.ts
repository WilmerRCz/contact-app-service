import Router from '@koa/router'
import taskController from '../controllers/contact.controllers'

const router = new Router()

router.get('/', taskController.getAllContacts)

router.get('/:id', taskController.getContact)

router.post('/', taskController.createContact)

router.put('/:id', taskController.updateContact)

router.delete('/:id', taskController.deleteContact)

export default router
