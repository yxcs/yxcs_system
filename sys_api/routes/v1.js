import Router from 'koa-router'

import LoginController from '../controller/login.controller'
import ArticleController from '../controller/article.controller'
import UserController from '../controller/user.controller'

const router = new Router();

router.prefix('/v1')

router.post('/login', LoginController.login)
router.post('/register', LoginController.register)
router.post('/getArticle', ArticleController.getArticleById)
router.post('/getArticles', ArticleController.getArticleList)
router.get('/user', UserController.getUserById)
router.post('/user', UserController.updateUser)

export default router