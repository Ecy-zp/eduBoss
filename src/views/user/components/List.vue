<template>
  <div class="user-list">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="formInline.phone"></el-input>
            </el-form-item>
            <el-form-item label="注册时间" prop="rangeDate">
                <el-date-picker
                v-model="formInline.rangeDate"
                type="daterange"
                placeholder="选择日期"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button type="primary" @click="onReset">重置</el-button>
            </el-form-item>
            </el-form>
        </div>
        <el-table
        :data="Userdata"
        style="width: 100%">
        <!-- 用户ID -->
        <el-table-column
            prop="id"
            label="用户ID"
            width="150px">
        </el-table-column>
        <!-- 头像 -->
        <el-table-column
            label="头像"
            width="50px">
            <template slot-scope="scope">
              <img
              :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"
              width="30px">
            </template>
        </el-table-column>
        <!-- 用户名 -->
        <el-table-column
            prop="name"
            label="用户名">
        </el-table-column>
        <!-- 手机号 -->
        <el-table-column
            prop="phone"
            label="手机号">
        </el-table-column>
        <!-- 注册时间 -->
        <el-table-column
            label="注册时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | dateFormat }}</span>
            </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-switch
              v-model="scope.row.isDel"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleSelectRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-card>
      <!-- 弹出框 -->
      <el-dialog title="分配角色" :visible.sync="dialogTableVisible">
        <!-- 下拉菜单 -->
          <el-select v-model="roleIdList" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        <!-- 按钮 -->
        <div style="margin-top:20px">
          <el-button type="primary" @click="handleAlloc">确认</el-button>
          <el-button type="primary" @click="dialogTableVisible=false">取消</el-button>
        </div>
      </el-dialog>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 40, 80]"
            :page-size="formInline.size"
            :current-page.sync="formInline.currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="formInline.total">
          </el-pagination>
  </div>
</template>

<script>
import { getUserPage } from '@/services/user'
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role'
export default {
  name: 'userList',
  data () {
    return {
      Userdata: [],
      // 查询框数据
      formInline: {
        currentPage: 1,
        pageSize: 10,
        phone: '',
        rangeDate: [],
        startCreateTime: '',
        endCreateTime: ''
      },
      //  用于控制分配角色对话框是否显示
      dialogTableVisible: false,
      // 分配角色框绑定数据
      options: [],
      // 分配角色中选取项
      roleIdList: [],
      // 当前用户ID
      currenRoleID: null
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    // 加载用户
    async loadUser () {
      const { rangeDate } = this.formInline
      if (rangeDate && rangeDate.length) {
        this.formInline.startCreateTime = rangeDate[0]
        this.formInline.endCreateTime = rangeDate[1]
      } else {
        this.formInline.startCreateTime = ''
        this.formInline.endCreateTime = ''
      }
      const { data } = await getUserPage(this.formInline)
      if (data.code === '000000') {
        this.Userdata = data.data.records
        this.formInline.currentPage = data.data.current
        this.formInline.pageSize = data.data.size
        this.formInline.total = data.data.total
      }
    },
    // 查询按钮
    onSearch () {
      this.loadUser()
    },
    // 分配角色
    async handleSelectRole (Rowdata) {
      this.dialogTableVisible = true
      this.currenRoleID = Rowdata.id
      // 请求所有角色列表数据
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.options = data.data
      }
      // 请求当前用户的已分配用户信息
      const { data: data2 } = await getUserRoles(this.currenRoleID)
      if (data2.code === '000000') {
        this.roleIdList = data2.data.map(item => item.id)
      }
    },
    // 确认分配
    async handleAlloc () {
      this.dialogTableVisible = false
      const { data } = await allocateUserRoles({
        userId: this.currenRoleID,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('分配成功')
      }
    },
    onReset () {
      this.formInline = {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        rangeDate: [],
        startCreateTime: '',
        endCreateTime: ''
      }
      this.loadUser()
    },
    async handleSizeChange (val) {
      this.formInline.pageSize = val
      this.formInline.currentPage = 1
      this.loadUser()
    },
    async handleCurrentChange (val) {
      this.formInline.currentPage = val
      this.loadUser()
    }
  },
  filters: {
    // 日期过滤器
    dateFormat (date) {
      date = new Date(date)
      return `
      ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
  }
}
</script>

<style>

</style>
