import Router from 'koa-router'

import ArticleController from '../controller/article.controller'

const router = new Router();

router.prefix('/v1')

router.post('/getArticle', ArticleController.getArticleById)
router.post('/getArticles', ArticleController.getArticleList)

export default router