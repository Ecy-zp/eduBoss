<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px" label-position="top" :rules=rules>
      <!-- 手机输入框 -->
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 密码输入框 -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading='isLoading'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import request from '@/utils/request'
// import qs from 'qs'
// 引入
import { login } from '@/services/user'
export default {
  data () {
    return {
      // 存储表单对象
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入您的电话号码', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, mix: 18, message: '密码长度为 6 到 18 位', trigger: 'blur' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit () {
      // await this.$refs.form.validate()
      // 设置校验成功后的功能（发送请求）
      try {
        // 1.设置校验
        await this.$refs.form.validate()
        this.isLoading = true
        // console.log('通过校验')
        // 2.发送请求
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login',
        //   data: qs.stringify(this.form)
        // })
        const { data } = await login(this.form)
        this.isLoading = true
        // 响应处理
        if (data.state === 1) {
          this.$router.push({ name: 'home' })
          this.$message.success('登录成功')
          // 将用户信息存储到Vuex中
          this.$store.commit('setUser', data.content)
        } else {
          this.$message.success('登录失败')
        }
      } catch (err) {
        // 请求发送
        console.log('没有通过校验')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .login{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-form{
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
    }
    .el-button{
      width: 100%;
    }
  }
</style>
