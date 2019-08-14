<template>
  <div class="layout__wrap">
    <router-view/>
    <Bottom />
  </div>
</template>

<script>
const Bottom = () => import('@/components/Bottom')
import { mapMutations } from 'vuex'
export default {
  name: 'MainLayout',
  components: {
    Bottom
  },
  mounted () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token && userId) {
      this.getUser(userId)
    }
  },
  methods: {
    ...mapMutations('global', [
      'setUser'
    ]),
    getUser (id) {
      this.$http.login.getUserById({id}).then(res => {
        if (res.status === 200 && res.data.status === 200) {
          const user = res.data.data
          localStorage.setItem('userId', user.id)
          this.setUser(user)
        }
      })
    }
  }
}
</script>
<style scoped>
  .layout__wrap {
    min-height: 100%;
  }
</style>
