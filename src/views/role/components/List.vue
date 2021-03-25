<template>
  <div class="role-list">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
              <el-form-item label="角色名称" prop="name">
                  <el-input v-model="formInline.name" placeholder="角色名称" clearable></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <el-button @click="handleAdd">添加角色</el-button>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="isLoading">
                <el-table-column
                prop="id"
                label="编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="description"
                label="描述">
                </el-table-column>
                <el-table-column
                label="创建时间">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdTime | dateFormat}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                label="操作"
                align="center"
                width="180">
                  <template slot-scope="scope">
                      <div>
                        <el-button
                        type="text"
                        @click="$router.push({
                          name: 'alloc',
                          params:{
                            roleId: scope.row.id
                          }
                        })">分配菜单</el-button>
                        <el-button type="text">分配资源</el-button>
                      </div>
                      <div>
                        <el-button
                          type="text"
                          @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button
                          type="text"
                          @click="handleDelete(scope.row)">删除</el-button>
                      </div>
                  </template>
                </el-table-column>
            </el-table>
          <el-dialog :title="is_Edit ? '编辑角色':'添加角色'" :visible.sync="dialogFormVisible">
          <create-or-update
          @success="handleSuccess"
          @cansole="handleCansole"
          :isEdit="is_Edit"
          :role_id="roleId"
          v-if="dialogFormVisible"
          ></create-or-update>
        </el-dialog>
      </el-card>
  </div>
</template>

<script>
import { getRoles, deleteRole } from '@/services/role'
import CreateOrUpdate from './CreateOrUpdate.vue'
export default {
  components: { CreateOrUpdate },
  name: 'roleList',
  created () {
    this.loadRoles()
  },
  data () {
    return {
      formInline: {
        current: 1,
        size: 50,
        name: ''
      },
      tableData: [],
      isLoading: false,
      dialogFormVisible: false,
      roleId: '',
      is_Edit: false
    }
  },
  methods: {
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRoles(this.formInline)
      if (data.code === '000000') {
        this.tableData = data.data.records
        this.isLoading = false
      }
    },
    async onSubmit () {
      this.isLoading = true
      const { data } = await getRoles(this.formInline)
      if (data.code === '000000') {
        this.tableData = data.data.records
        this.isLoading = false
      }
    },
    handleEdit (Rowdata) {
      this.dialogFormVisible = true
      this.roleId = Rowdata.id
      this.is_Edit = true
    },
    handleDelete (Rowdata) {
      this.$confirm('确认删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteRole(Rowdata.id)
        if (data.code === '000000') {
          this.loadRoles()
          this.$message.successs('删除成功')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSuccess () {
      this.dialogFormVisible = false
      //   刷新列表
      this.loadRoles()
    },
    handleCansole () {
      this.dialogFormVisible = false
    },
    handleAdd () {
      this.dialogFormVisible = true
      this.is_Edit = false
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
