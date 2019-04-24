import Router from 'koa-router'
import LoginController from '../controller/login.controller'
import UserController from '../controller/user.controller'
import MenuController from '../controller/menu.controller'
import ArticleController from '../controller/article.controller'

const router = new Router();

router.prefix('/api')

router.post('/login', LoginController.login)
router.post('/register', LoginController.register)
router.get('/getUser', UserController.getUsers)
router.get('/getMenu', MenuController.getMenuList)
router.post('/insertMenu', MenuController.insertMenu)
router.post('/updateMenu', MenuController.updateMenu)
router.post('/deleteMenu', MenuController.deleteMenu)

// blog
router.post('/insertArticle', ArticleController.insertArticle)
router.post('/updateArticle', ArticleController.updateArticle)
router.post('/deleteArticle', ArticleController.deleteArticle)
router.post('/getArticle', ArticleController.getArticleById)
router.post('/getArticles', ArticleController.getArticleList)

export default router