import Router from 'koa-router'
import ToolController from '../controller/tool.controller'

const router = new Router();

router.prefix('/tool')

// 项目
router.post('/insertPro', ToolController.insertPro)
router.post('/updatePro', ToolController.updatePro)
router.post('/deletePro', ToolController.deletePro)
router.post('/getProById', ToolController.getProById)
router.post('/getProList', ToolController.getProList)

// 流程
router.post('/insertFlow', ToolController.insertFlow)
router.post('/updateFlow', ToolController.updateFlow)
router.post('/dealFlow', ToolController.dealFlow)
router.post('/deleteFlow', ToolController.deleteFlow)
router.post('/getFlowById', ToolController.getFlowById)
router.post('/getFlowList', ToolController.getFlowList)
router.post('/getFlowByProId', ToolController.getFlowByProId)
router.post('/finishFlow', ToolController.finishFlow)
router.post('/cancelPro', ToolController.cancelPro)
router.post('/delayPro', ToolController.delayPro)

export default router