<template>
  <div class="user__wrap">
    <Top />
    <div class="user__update">
      <el-form v-if="isUpdate" label-position="right" label-width="80px" :model="updateForm">
        <el-form-item label="名称">
          <el-input size="small" v-model="updateForm.username"></el-input>
        </el-form-item>
        <el-form-item size="small" label="座右铭">
          <el-input size="small" v-model="updateForm.slogan"></el-input>
        </el-form-item>
        <el-form-item label="我的通知">
          <el-input type="textarea" :rows="3" size="small" v-model="updateForm.notice"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="updateForm.avatar" :src="updateForm.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="updateUser(false)">提交</el-button>
          <el-button size="small" @click="resetPassword()">重设密码</el-button>
        </el-form-item>
      </el-form>
      <el-form v-else label-position="right" label-width="80px" :model="resetPwd">
        <el-form-item label="密码">
          <el-input size="small" v-model="resetPwd.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item size="small" label="确认密码">
          <el-input size="small" v-model="resetPwd.resPwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="updateUser(true)">重置</el-button>
          <el-button size="small" @click="resetPassword()">更新信息</el-button>
        </el-form-item>
      </el-form>
      <el-form label-width="80px">
        <el-form-item>
          <el-button class="logout" size="small" type="default" @click="gotoWorks()">我的作品集</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="logout" size="small" type="danger" @click="logout()">退出</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const Top = () => import('@/components/Top')
import { mapMutations } from 'vuex'
import { static_url } from '../config'
export default {
  name: 'CurrentUser',
  data () {
    return {
      isUpdate: true,
      updateForm: {
        id: '',
        username: '',
        slogan: '',
        notice: '',
        avatar: ''
      },
      resetPwd: {
        pwd: '',
        resPwd: ''
      },
      uploadUrl: ''
    }
  },
  components: {
    Top
  },
  mounted () {
    this.uploadUrl = `${static_url}/uploadfile`
    this.setNavType('user')
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      this.getUserMsg(userId)
    } else {
      this.$router.push(`/login?redirect=${this.$route.path}`)
    }
  },
  methods: {
    ...mapMutations('global', [
      'setNavType',
      'setUser'
    ]),
    getUserMsg (id) {
      this.$http.login.getUserById({id}).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          const user = res.data.data
          this.updateForm = {
            id: user.id,
            username: user.username,
            slogan: user.slogan,
            notice: user.notice,
            avatar: user.avatar
          }
          this.setUser(user)
        }
      })
    },
    updateUser(pwd = false) {
      const updateForm = this.updateForm
      const resetPwd = this.resetPwd
      let params = {}
      if (!pwd) {
        params = {
          username: updateForm.username,
          avatar: updateForm.avatar,
          notice: updateForm.notice,
          slogan: updateForm.slogan,
        }
        if (!params.username) {
          this.$message.warning('请输入用户名')
          return false
        }
      } else {
        params = {
          password: resetPwd.pwd
        }
        if (!resetPwd.pwd) {
          this.$message.warning('请输入密码')
          return false
        }
        if (resetPwd.pwd !== resetPwd.resPwd) {
          this.$message.warning('输入的密码不一致')
          return false
        }
      }
      this.$http.login.updateUserById(updateForm.id, params).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          const user = res.data.data
          this.isUpdate = true
          this.resetPwd = {
            pwd: '',
            resPwd: ''
          }
          this.updateForm = {
            id: user.id,
            username: user.username,
            slogan: user.slogan,
            notice: user.notice,
            avatar: user.avatar
          }
          this.setUser(user)
          this.$message.success(res.data.message)
        }
      })
    },
    resetPassword () {
      this.isUpdate = !this.isUpdate
    },
    handleAvatarSuccess (e) {
      this.updateForm.avatar = e.url
    },
    beforeAvatarUpload (e) {
      const type = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      const size = 2
      if (type.indexOf(e.type) === -1) {
        this.$message.warning('图片格式只能是jpeg、jpg、png、gif')
        return false
      }
      if (e.size > size * 1024 * 1024) {
        this.$message.warning('图片超过2M')
        return false
      }
      return true
    },
    gotoWorks () {
      this.$router.push(`/user/${this.updateForm.id}`)
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$router.push(`/login?redirect=${this.$route.path}`)
    }
  }
}
</script>
<style lang="scss" scoped>
  .user__update {
    width: 360px;
    min-height: 500px;
    margin: 0 auto;
    padding: 60px 40px;
  }

  .avatar-uploader {
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .logout {
    width: 100%;
  }
</style>
