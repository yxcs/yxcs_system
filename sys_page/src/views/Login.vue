<template>
  <div class="login__wrap">
    <div class="tabs">
      <el-form v-if="isLoginForm" label-position="right" label-width="0px" :model="loginForm">
        <el-form-item label="">
          <el-input size="small" v-model="loginForm.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input size="small" v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button style="width: 100%" size="small" type="primary" @click="submitLoginForm()">登录</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button style="width: 100%" size="small" type="text" @click="changeForm()">还没账号? 前往注册</el-button>
        </el-form-item>
      </el-form>
      <el-form v-else label-position="right" label-width="0px" :model="registerFrom">
        <el-form-item label="">
          <el-input size="small" v-model="registerFrom.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input size="small" v-model="registerFrom.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input size="small" v-model="registerFrom.rePassword" placeholder="确认密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button style="width: 100%" size="small" type="primary" @click="submitRegisterForm()">注册</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button style="width: 100%" size="small" type="text" @click="changeForm()">已有账号? 前往登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Input, Upload, Button } from 'element-ui'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      isLoginForm: true,
      loginForm: {
        userName: '',
        password: ''
      },
      registerFrom: {
        userName: '',
        password: '',
        rePassword: ''
      }
    }
  },
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-upload': Upload,
    'el-button': Button
  },
  mounted () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      this.$router.replace('/user')
    }
  },
  methods: {
    ...mapMutations('global', [
      'setUser'
    ]),
    changeForm () {
      this.isLoginForm = !this.isLoginForm
      this.loginForm = {
        userName: '',
        password: ''
      }
      this.registerFrom = {
        userName: '',
        password: '',
        rePassword: ''
      }
    },
    submitLoginForm () {
      const params = {
        username: this.loginForm.userName,
        password: this.loginForm.password
      }
      if (!params.username) {
        this.$message.warning('请输入用户名')
        return false
      }
      if (!params.password) {
        this.$message.warning('请输入密码')
        return false
      }
      this.$http.login.login(params).then(res => {
        if (res.status && res.data.data && res.data.data.id) {
          this.$message.success(res.data.message)
          localStorage.setItem('token', res.data.token)
          this.saveUserMsg(res.data.data.id)
        } else {
          this.$message.error('登录失败请重试')
        }
      })
    },
    submitRegisterForm () {
      const params = {
        username: this.registerFrom.userName,
        password: this.registerFrom.password
      }
      if (!params.username) {
        this.$message.warning('请输入用户名')
        return false
      } else if (params.username.length < 4) {
        this.$message.warning('用户名至少4个字符')
        return false
      }
      if (!params.password) {
        this.$message.warning('请输入密码')
        return false
      } else if (params.password.length < 4) {
        this.$message.warning('密码至少4个字符')
        return false
      }
      if (params.password !== this.registerFrom.rePassword) {
        this.$message.warning('两次输入的密码不一致')
        return false
      }
      this.$http.login.register(params).then(res => {
        if (res.status && res.data.data && res.data.data.id) {
          this.$message.success(res.data.message)
          this.changeForm()
        } else {
          this.$message.error('注册失败请重试')
        }
      })
    },
    saveUserMsg(id) {
      this.$http.login.getUserById({id}).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          const user = res.data.data
          localStorage.setItem('userId', user.id)
          this.setUser(user)
          this.$nextTick(() => {
            const path = this.$route.query.redirect ? this.$route.query.redirect : '/home'
            this.$router.replace(path)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .login__wrap {
    height: 100%;
  }
  .tabs {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 480px;
    margin-left: -200px;
    margin-top: -240px;
    padding: 0 50px;
  }
</style>
