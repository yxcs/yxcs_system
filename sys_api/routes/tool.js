import Router from 'koa-router'
import ToolController from '../controller/tool.controller'

const router = new Router();

router.prefix('/tool')

// 项目
router.post('/insertPro', ToolController.insertPro)

// 流程
router.post('/insertFlow', ToolController.insertFlow)

export default router