import Router from 'koa-router'
import LoginController from '../controller/login.controller'
import UserController from '../controller/user.controller'

const router = new Router();

router.prefix('/api')

router.post('/login', LoginController.login)
router.post('/register', LoginController.register)
router.get('/getUser', UserController.getUsers)

export default router