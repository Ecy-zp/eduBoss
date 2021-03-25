<template>
  <div class="app-header">
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">课程管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
    <!-- 右侧下拉菜单 -->
    <span class="el-dropdown-link">
        <!-- 用户头像 -->
        <el-avatar :size="30" :src= "userInfo.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' "></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="Logout">登出</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/user'
export default {
  name: 'AppHeader',
  created () {
    // 加载用户信息
    this.loadUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    // 退出
    Logout () {
      this.$confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1.清除store中的数据
        this.$store.commit('setUser', null)
        // 2.跳转登录页面
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-header {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .el-dropdown-link{
          display: flex;
          align-items: center;
      }
  }
</style>
