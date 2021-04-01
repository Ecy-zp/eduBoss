<template>
  <div class="course-list">
      <el-card class="box-card">
        <!-- 上方查询表单 -->
        <div slot="header" class="clearfix">
            <el-form
            :model="searchForm"
            :inline="true"
            class="demo-form-inline">
              <!-- 课程名称 -->
              <el-form-item label="课程名称">
                <el-input v-model="searchForm.courseName" placeholder="课程名称" clearable></el-input>
              </el-form-item>
              <!-- 状态选择 -->
              <el-form-item label="状态">
                  <el-select v-model="searchForm.status" clearable>
                    <el-option label="全部" value=""></el-option>
                    <el-option value="1" label="上架"></el-option>
                    <el-option value="0" label="下架"></el-option>
                  </el-select>
              </el-form-item>
              <!-- 提交按钮 -->
              <el-form-item>
                <el-button type="primary" @click="Search" :loading="isLoading">查询</el-button>
              </el-form-item>
              <!-- 新建课程 -->
              <el-form-item style="margin-left:250px">
                  <el-button type="primary" icon="el-icon-plus" @click="$router.push({name:'course-create'})">新建课程</el-button>
              </el-form-item>
            </el-form>
        </div>
        <!-- 展示表格 -->
        <div class="text item">
            <el-table
            :data="courseForm"
            border
            style="width: 100%"
             v-loading="isLoading">
                <!-- ID -->
                <el-table-column
                prop="id"
                label="ID">
                </el-table-column>
                <!--  课程名称 -->
                <el-table-column
                prop="courseName"
                label="名称">
                </el-table-column>
                <!-- 价格 -->
                <el-table-column
                prop="price"
                label="价格">
                </el-table-column>
                <!-- 排序 -->
                <el-table-column
                prop="sortNum"
                label="排序">
                </el-table-column>
                <!-- 状态 -->
                <el-table-column
                label="状态">
                  <template slot-scope="scope">
                      <el-switch
                      v-model="scope.row.status"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      :active-value="1"
                      :inactive-value="0"
                      @change="statusChange(scope.row,false)">
                      </el-switch>
                  </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column
                label="操作"
                width="260"
                align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="statusChange(scope.row,true)">{{scope.row.status == '0'?"上架":"下架" }}</el-button>
                    <el-button size="mini" @click="$router.push({
                      name: 'course-section',
                      params: {
                        courseId: scope.row.id
                      }
                    })">内容管理</el-button>
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[100, 200, 400, 800]"
            :page-size="searchForm.size"
            :current-page.sync="searchForm.currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="searchForm.total">
          </el-pagination>
      </el-card>
  </div>
</template>

<script>
import { getQueryCourse, changeState } from '@/services/course'
export default {
  name: 'courseList',
  data () {
    return {
      // 查询绑定表单
      searchForm: {
        currentPage: 1,
        pageSize: 100,
        courseName: ''
      },
      //   课程存储数组
      courseForm: [],
      //  是否加载
      isLoading: false
    }
  },
  created () {
    this.loadCourse()
  },
  methods: {
    async loadCourse () {
      const { data } = await getQueryCourse(this.searchForm)
      if (data.code === '000000') {
        this.courseForm = data.data.records
        this.searchForm.currentPage = data.data.current
        this.searchForm.pageSize = data.data.size
        this.searchForm.total = data.data.total
      }
    },
    Search () {
      this.isLoading = true
      this.loadCourse()
      this.isLoading = false
    },
    async statusChange (Rowdata, isButton) {
      if (isButton) {
        if (Rowdata.status === 0) {
          Rowdata.status = 1
        } else {
          Rowdata.status = 0
        }
      }
      const { data } = await changeState({
        courseId: Rowdata.id,
        status: Rowdata.status
      })
      console.log()
      if (data.code === '000000') {
        if (!isButton) {
          this.$message.success(`${Rowdata.status === 1 ? '上架成功' : '下架成功'}`)
        } else {
          this.$message.success(`${Rowdata.status === 0 ? '下架成功' : '上架成功'}`)
        }
      }
    },
    handleEdit (Rowdata) {
      this.$router.push({
        name: 'course-edit',
        params: {
          courseId: Rowdata.id
        }
      })
    },
    async handleSizeChange (val) {
      this.searchForm.pageSize = val
      this.searchForm.currentPage = 1
      this.loadCourse()
    },
    async handleCurrentChange (val) {
      this.searchForm.currentPage = val
      this.loadCourse()
    }
  }
}
</script>

<style>

</style>
