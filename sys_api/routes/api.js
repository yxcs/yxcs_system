import Router from 'koa-router'
import LoginController from '../controller/login.controller'
import UserController from '../controller/user.controller'
import MenuController from '../controller/menu.controller'

const router = new Router();

router.prefix('/api')

router.post('/login', LoginController.login)
router.post('/register', LoginController.register)
router.get('/getUser', UserController.getUsers)
router.get('/getMenu', MenuController.getMenuList)
router.post('/insertMenu', MenuController.insertMenu)
router.post('/updateMenu', MenuController.updateMenu)

export default router