<template>
  <div class="advert-list">
      <el-card>
          <div slot="header" class="clearfix">
              <el-button @click="$router.push({
                name: 'advert-create'
              })">添加广告</el-button>
          </div>
          <el-table
          :data="advertForm"
          border
          width="100%"
          v-loading="isLoading">
            <!-- ID -->
            <el-table-column
              prop="id"
              label="ID">
            </el-table-column>
            <!-- 广告名称 -->
            <el-table-column
              prop="name"
              label="广告名称">
            </el-table-column>
            <!-- 广告位置 -->
            <el-table-column
              prop="spaceName"
              label="广告位置">
              <template slot-scope="scope">
                <span>{{AdSpaceName(advertSpace,"id",scope.row.spaceId,"name")}}</span>
              </template>
            </el-table-column>
            <!-- 广告图片 -->
            <el-table-column
              label="广告图片">
              <template
              slot-scope="scope">
                <img :src="scope.row.img || ''" alt="我裂开了" width="80px" height="80px">
              </template>
            </el-table-column>
            <!-- 时间 -->
            <el-table-column
              label="时间"
              width="260px"
              align="center">
              <template slot-scope="scope">
                <div>开始时间:{{scope.row.createTime | dateFormat}}</div>
                <div>结束时间:{{scope.row.endTime | dateFormat}}</div>
              </template>
            </el-table-column>
            <!-- 上下线 -->
            <el-table-column
              label="上、下线"
              align="center">
              <template slot-scope="scope">
                <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value='1'
                :inactive-value='0'
                @change="statuChange(scope.row)">
               </el-switch>
              </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
        </el-table>
      </el-card>
  </div>
</template>

<script>
import { getAdList, getAllSpaces, updateStatus } from '@/services/advert'
export default {
  name: 'advertList',
  data () {
    return {
      advertForm: [],
      advertSpace: [],
      isLoading: false
    }
  },
  created () {
    this.loadAdspace()
    this.loadAdList()
  },
  methods: {
    async loadAdList () {
      this.isLoading = true
      const { data } = await getAdList()
      if (data.success === true) {
        this.advertForm = data.content
        this.isLoading = false
      }
    },
    async loadAdspace () {
      const { data } = await getAllSpaces()
      if (data.success === true) {
        this.advertSpace = data.content
      }
    },
    AdSpaceName (space, value, spaceId, name) {
      for (let index = 0; index < space.length; index++) {
        if (space[index][value] === spaceId) {
          return space[index][name]
        }
      }
    },
    handleEdit (Rowdata) {
      this.$router.push({
        name: 'advert-edit',
        params: {
          advertId: Rowdata.id
        }
      })
    },
    async statuChange (Rowdata) {
      const { data } = await updateStatus({
        id: Rowdata.id,
        status: Rowdata.status
      })
      if (data.success === true) {
        if (Rowdata.status === 1) {
          this.$message.success('上架成功')
        } else {
          this.$message.success('下架成功')
        }
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
