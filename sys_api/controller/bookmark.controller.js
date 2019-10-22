import Book from '../dbs/bookmark/BookmarkSchema';

const icons = [
  '',
  'http://img.oyxco.com/avatar00b7efef2aa2d167f6350978c7e5706e.jpg',
  'http://img.oyxco.com/avatar0c711e2e20ebd69b9a593c5380fc03d5.jpg',
  'http://img.oyxco.com/avatar0cdfc97e3d06d460819113ccf20a8bb2.jpg',
  'http://img.oyxco.com/avatar0f363ee9c2e12bb8da666f711a8c4332.jpg',
  'http://img.oyxco.com/avatar1bb627a14904651f26b73a58a8df101f.jpg',
  'http://img.oyxco.com/avatar02b9c914d10d5178c0838edd10fca543.jpeg',
  'http://img.oyxco.com/avatar2a658b7335c48a73f12f437a4be5c90e.jpg',
  'http://img.oyxco.com/avatar2c52e322fe03ca529159c46570bd9405.jpg',
  'http://img.oyxco.com/avatar4c0d5244a397c8696012d54d367d308c.jpg',
  'http://img.oyxco.com/avatar4e5ac5dee31511d1c15392db5d9c0585.jpg',
  'http://img.oyxco.com/avatar5dca4e028a78acb9256c8150e0c908fe.jpg',
  'http://img.oyxco.com/avatar06b96e6f98593503ce965287c432df38.jpg',
  'http://img.oyxco.com/avatar6fb9804adf960a493810e3c1a91984df.jpg',
  'http://img.oyxco.com/avatar7a1e030453865e98c99a98a641a54270.jpeg',
  'http://img.oyxco.com/avatar8ebeae6a7d45054388b9ad6998759bdd.jpg',
  'http://img.oyxco.com/avatar25d2ecc2d5e09124e75a13207948b1d0.jpg',
  'http://img.oyxco.com/avatar29eff1a6fa603dbbb1bf90f3e6a54553.jpg',
  'http://img.oyxco.com/avatar46d05cdf5e9bf49f1db11c0097dc8994.jpg',
  'http://img.oyxco.com/avatar47a6141ed329306fbe930c104572a5ed.jpg',
  'http://img.oyxco.com/avatar47ba95238f0073c6558b4ea765c64eb4.jpg',
  'http://img.oyxco.com/avatar49ec714ff8e1861098da3a17057f2b74.jpg',
  'http://img.oyxco.com/avatar52b46dbc9cb48a10c7640070f12e2fbd.jpeg',
  'http://img.oyxco.com/avatar63a223455929e39158e12a637af814c7.jpg',
  'http://img.oyxco.com/avatar76dfeb1aa1a632825bc63982888e6567.jpg',
  'http://img.oyxco.com/avatar77cb7df55b404374f4d760a088e463e4.jpg',
  'http://img.oyxco.com/avatar78d4504b0ba339b886647c2c2872b0be.png',
  'http://img.oyxco.com/avatar79e68302049e3cf1243013bed6ab1141.jpg',
  'http://img.oyxco.com/avatar81cdf681df59e36887d2436c297c1645.jpeg',
  'http://img.oyxco.com/avatar82d8dfe8f411490f358c44a6cecf19a9.jpg',
  'http://img.oyxco.com/avatar84e6ad33f96cf7ada86326b5b446204f.jpg',
  'http://img.oyxco.com/avatar86e54996e7e28ace4ba8dcfda67902ba.jpg',
  'http://img.oyxco.com/avatar88c184e4b322f82904fed8b20de42dfa.jpg',
  'http://img.oyxco.com/avatar90a3af579661c47dbcfa50ac29f7c61c.jpg',
  'http://img.oyxco.com/avatar326c300b8505f6e06498e20c031990b8.jpg',
  'http://img.oyxco.com/avatar465e1eba8afe33c976a45b34dbfa201f.jpg',
  'http://img.oyxco.com/avatar529a691f33390e316159d8ea7bcf7a65.jpg',
  'http://img.oyxco.com/avatar577b975be3557559fe79520c7e78d397.jpg',
  'http://img.oyxco.com/avatar711fce12788355f94b6ec349490dc005.jpg',
  'http://img.oyxco.com/avatar812aeb3ba458a569a6ef13b48cd8a751.jpg',
  'http://img.oyxco.com/avatar958b7ea4dc7bec0a5f39c48e4e9c50ed.jpg',
  'http://img.oyxco.com/avatar5694bd6f01e7e93a7e01f258fa31c021.jpeg',
  'http://img.oyxco.com/avatar8302f4a742762e38b5853571e7a195f3.jpg',
  'http://img.oyxco.com/avatar020346c975a52127ec9e14c57b879da6.jpg',
  'http://img.oyxco.com/avatarb7cbe883dc8e4200ba4999b3313e64f9.jpg',
  'http://img.oyxco.com/avatarcac0e4c8c8e6027f69f1ac4b03d8baf5.jpg',
  'http://img.oyxco.com/avatard5388cad7c1f96b42c982809297a8770.jpg',
  'http://img.oyxco.com/avatarea3a820639ff050fe4417007d01e16c3.jpeg',
  'http://img.oyxco.com/avatarf1d5b460915ef05208c85fd310b0fa5f.jpg',
  'http://img.oyxco.com/avatar506465ca20a8c45d6eba4f7e00554581.jpg',
  'http://img.oyxco.com/avatarb49d6853192fe787def2c3622ae721fc.jpg',
  'http://img.oyxco.com/avatarcac71dc05d61f0eb76721b647151d72c.jpg',
  'http://img.oyxco.com/avatarda90b8aad5b9e4beb2d0a6229b43fa50.jpg',
  'http://img.oyxco.com/avatarea8668c4e6833b70e324dd251836fb64.jpg',
  'http://img.oyxco.com/avatarf6b478c55acd7e3f98fcb8c9c6d8c606.jpg',
  'http://img.oyxco.com/avatar718100c6b6b8251dafbc413f49b98be4.jpg',
  'http://img.oyxco.com/avatarb1429e20dd84b8847c669766b068e09e.jpg',
  'http://img.oyxco.com/avatarcae17dae5b66e3ba70ab0bda8bdc6a61.jpg',
  'http://img.oyxco.com/avatare8f6fa9a386de03c59d442a7c20e12ed.jpg',
  'http://img.oyxco.com/avatareb99d399c63aabec82acc213a911b828.jpg',
  'http://img.oyxco.com/avatarf32365cf6c7040cd3db185909a0d429a.jpg',
  'http://img.oyxco.com/avatar822893bbf353cfff783db7ad3da42a3c.jpg',
  'http://img.oyxco.com/avatara731fc7f17ba95fa075044582f48556d.jpg',
  'http://img.oyxco.com/avatarad2b977905fccd0716949143d913e0be.jpg',
  'http://img.oyxco.com/avatarba990f1f714bf03084727d54f73356b3.jpg',
  'http://img.oyxco.com/avatarc32cd814820e5606420a49ef97abc977.jpg',
  'http://img.oyxco.com/avatarc149c6c8dcfce2d0b2e8b58c14b5af5c.jpg',
  'http://img.oyxco.com/avatarcc7076266070ba241bf5ae2ad3e17f9b.jpeg',
  'http://img.oyxco.com/avatard0d5577b983420c4a1b7e05b3b45df7b.jpg',
  'http://img.oyxco.com/avatard68ce258d419d86572c8541e9e341f4a.jpg',
  'http://img.oyxco.com/avatare9f0148741cac35e1f135a0c446beac9.jpg',
  'http://img.oyxco.com/avatare3093e3c8cb6cc7165687218137c28b0.jpg',
  'http://img.oyxco.com/avatare7845bd8f8bedca3203825d47d7a94ca.jpg',
  'http://img.oyxco.com/avatared3d759195e4ebcc0c4e393ad4ca57a5.jpg',
  'http://img.oyxco.com/avatarede2c0f99cff22ca66c4b971f09f55a6.jpg',
  'http://img.oyxco.com/avatareec690b7a064227dc9da6f85f85b5ea9.jpg'
]
class BookController {

  async insertBook(ctx) {
    const { body } = ctx.request
    const order = await Book.find({}).limit(1).sort({createAt: 'asc'}).exec()
    body.order = order && order.length ? order[0].order + 1 : 1
    body.coverImg = icons[Math.ceil(Math.random()*75)] || ''
    const book = new Book(body);
    const res = await book.save();
    if (res._id) {
      ctx.body = {
        status: 200,
        data: 1,
        message: '添加成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        errorCode: 4002,
        message: '添加出错'
      }
    }
  }

  async updateBook(ctx) {
    const { body } = ctx.request;
    body.params.updateAt = Date.now()
    const book = await Book.findByIdAndUpdate(body.id, body.params)
    ctx.status = 200;
    ctx.body = {
      message: '更新成功',
      data: 1,
      status: 200
    }
  }

  async deleteBook(ctx) {
    const { body } = ctx.request;
    const book = await Book.findByIdAndRemove(body.id, {})
    ctx.status = 200;
    ctx.body = {
      message: '删除成功',
      data: 1,
      status: 200
    }
  }

  // 查找
  async getBookById(ctx) {
    const { body } = ctx.request;
    let { id, showOpts = {}, options = {} } = body;
    if (typeof showOpts === 'string') {
      showOpts = JSON.parse(showOpts);
    }
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    const data = await Book.findById(id, showOpts, options);
    if (data && data.id) {
      ctx.body = {
        status: 200,
        data: data,
        message: '查找成功'
      }
    } else {
      ctx.body = {
        status: 200,
        data: 0,
        message: '查找失败'
      }
    }
  }

  async getBookList(ctx) {
    const { body } = ctx.request;
    let { where = {}, limit = 10, current = 1, sort = {'updateAt': -1} } = body;
    if (typeof where === 'string') {
      where = JSON.parse(where);
    }
    if (typeof sort === 'string') {
      sort = JSON.parse(sort);
    }
    const skipnum = (current - 1) * limit;
    const data = await Book.find(where).skip(skipnum).limit(limit).sort(sort).exec();
    const count = await Book.count(where);
    ctx.body = {
      status: 200,
      data: data,
      total: count || 0,
      message: '查找成功'
    }
  }

}

export default new BookController()