import Router from 'koa-router'
import ToolController from '../controller/tool.controller'
import BookmarkController from '../controller/bookmark.controller'

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

// 书签
router.post('/insertBookmark', BookmarkController.insertBook)
router.post('/updateBookmark', BookmarkController.updateBook)
router.post('/deleteBookmark', BookmarkController.deleteBook)
router.post('/getBookmarkById', BookmarkController.getBookById)
router.post('/getBookmarkList', BookmarkController.getBookList)
// 获取google爬取到的书签列表
router.post('/saveGooglePluginBookmarks', BookmarkController.saveGooglePluginBookmarks)

export default router