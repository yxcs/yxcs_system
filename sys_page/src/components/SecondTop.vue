<template>
  <div class="article__top">
    <div class="article__top--abstract">
      <div class="article__top--title">{{title}}</div>
      <div class="article__top--line"></div>
      <div class="article__top--desc">
        <div class="avatar"><router-link :to="`/user/${authorId}`"><img :src="avatar" /></router-link></div>
        <div><router-link :to="`/user/${authorId}`">{{authorName}}</router-link><span>·</span>{{createAt}}<span>·</span>{{readCount}} 次阅读</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondTop',
  props: {
    title: String,
    avatar: String,
    authorName: String,
    authorId: String,
    createAt: String,
    readCount: Number
  }
}
</script> 
<style lang="scss" scoped>
@keyframes lineWidth {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
.article__top {
  height: 300px;
  background-image: url('http://img.oyxco.com/bg_img.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  .article__top--abstract {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    width: 800px;
    margin: 0 auto;
    .article__top--title {
      font-size: 32px;
      margin: 0;
      color: #FFFFFF;
      font-weight: 500;
      width: 80%;
      padding: 0;
      border: 0;
    }
    .article__top--line {
      width: 100%;
      height: 1px;
      overflow: hidden;
      font-size: 0;
      background: #fff;
      margin: 10px 0;
      animation: lineWidth 2.5s;
      animation-fill-mode: forwards;
    }
    .article__top--desc {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #fff;
      font-size: 13px;
      padding-bottom: 20px;
      a {
        color: #fff;
      }
      a:hover {
        text-decoration: underline;
      }
      span {
        padding: 0 10px;
      }
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
