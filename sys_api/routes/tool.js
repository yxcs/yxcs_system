import Router from 'koa-router'
import ToolController from '../controller/tool.controller'

const router = new Router();

router.prefix('/tool')

// 项目
router.post('/insertPro', ToolController.insertPro)
router.post('/updatePro', ToolController.updatePro)
router.post('/deletePro', ToolController.deletePro)
router.get('/getProById', ToolController.getProById)
router.get('/getProList', ToolController.getProList)

// 流程
router.post('/insertFlow', ToolController.insertFlow)
router.post('/updateFlow', ToolController.updateFlow)
router.post('/deleteFlow', ToolController.deleteFlow)
router.get('/getFlowById', ToolController.getFlowById)
router.get('/getFlowList', ToolController.getFlowList)

export default router