<template>
  <div class="resourcelist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
        :inline="true"
        :model="form"
        ref="form"
        class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="资源名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder="资源路径" clearable></el-input>
          </el-form-item>
          <el-form-item prop="categoryId">
            <el-select v-model="form.categoryId" placeholder="资源分类" clearable>
              <el-option v-for="item in resourcecCategories" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="isLoading">
          <el-table-column
            type="index"
            label="编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="资源名称">
          </el-table-column>
          <el-table-column
            prop="url"
            label="资源路径">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <!-- 设置过滤器需要使用作用域插槽 -->
          <el-table-column
            label="添加时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createdTime | dateFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" @click="handleDelte(scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
            <el-form
            label-width="80px"
            :data="resourceData">
              <el-form-item
              label="资源名称">
              <el-input v-model="resourceData.name"></el-input>
              </el-form-item>
              <el-form-item
              label="资源路径">
              <el-input v-model="resourceData.url"></el-input>
              </el-form-item>
              <el-form-item
              label="资源分类">
              <el-select v-model="resourceData.categoryId" placeholder="资源分类" clearable>
                <el-option v-for="item in resourcecCategories" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item
              label="描述">
              <el-input
              type="textarea"
              v-model="resourceData.description"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="SubmitResource">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分页结构 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="form.size"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          :disabled="isLoading">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getResourcecPage, getResourcecCategories, getResourceByid, saveOrUpdate } from '@/services/resource'
export default {
  name: 'Resourcelist',
  created () {
    this.loadResouce()
    this.loadResouceCategories()
  },
  data () {
    return {
      form: {
        //  当前页号
        current: 1,
        // 每页显示的
        size: 10,
        // 资源名称
        name: '',
        // 资源路径
        url: '',
        // 资源分类
        categoryId: ''
      },
      tableData: [],
      totalCount: 0,
      resourcecCategories: [],
      // 用于保存加载
      isLoading: false,
      dialogVisible: false,
      // 编辑表单资源数据
      resourceData: {}
    }
  },
  methods: {
    onSubmit () {
      // 提交筛选功能
      this.form.current = 1
      this.loadResouce()
    },
    async loadResouce () {
      // 开始加载数据
      this.isLoading = true
      const { data } = await getResourcecPage(this.form)
      if (data.code === '000000') {
        this.tableData = data.data.records
        this.totalCount = data.data.total
        // 停止加载数据
        this.isLoading = false
      }
    },
    async handleEdit (Rowdata) {
      this.dialogVisible = true
      const { data } = await getResourceByid(Rowdata.id)
      if (data.code === '000000') {
        this.resourceData = data.data
      }
    },
    handleDelete (Rowdata) {
      console.log(Rowdata)
    },
    handleSizeChange (val) {
      this.form.size = val
      // 由于修改了每页的显示的条数，应当还原默认值为1
      this.form.current = 1
      this.loadResouce()
    },
    handleCurrentChange (val) {
      this.form.current = val
      this.loadResouce()
    },
    async loadResouceCategories () {
      const { data } = await getResourcecCategories()
      if (data.code === '000000') {
        this.resourcecCategories = data.data
      }
    },
    onReset () {
      this.$refs.form.resetFields()
    },
    async SubmitResource () {
      this.dialogVisible = true
      const { data } = await saveOrUpdate(this.resourceData)
      if (data.code === '000000') {
        this.$message.success('编辑成功!')
        this.loadResouce()
        this.dialogVisible = false
      }
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
