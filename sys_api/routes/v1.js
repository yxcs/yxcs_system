import Router from 'koa-router'

import LoginController from '../controller/login.controller'
import ArticleController from '../controller/article.controller'
import UserController from '../controller/user.controller'
import BookmarkController from '../controller/bookmark.controller'

const router = new Router();

router.prefix('/v1')

router.post('/login', LoginController.login)
router.post('/register', LoginController.register)
router.post('/getArticle', ArticleController.getArticleById)
router.post('/getArticles', ArticleController.getArticleList)
router.get('/user', UserController.getUserById)
router.post('/user', UserController.updateUser)
router.post('/getBookmarkList', BookmarkController.getBookList)

export default router