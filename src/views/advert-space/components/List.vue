<template>
  <div class="advertSpace-list">
      <el-card>
          <div class="clearfix" slot="header">
            <el-button
            @click="$router.push({
              name: 'advert-space-create'
            })">添加广告位</el-button>
          </div>
          <el-table
            :data="advertSpaceInfo"
            style="width: 100%"
            border
            v-loading="isLoading">
            <el-table-column
            label="spaceKey"
            prop="spaceKey"
            align="center">
            </el-table-column>
            <el-table-column
            label="广告位置"
            prop="name"
            align="center">
            </el-table-column>
            <el-table-column
            label="创建时间"
            align="center">
              <template slot-scope="scope">
                <span>{{scope.row.createTime | dateFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column
            label="更新时间"
            align="center">
              <template slot-scope="scope">
                <span>{{scope.row.updateTime | dateFormat}}</span>
              </template>
            </el-table-column>
            <el-table-column
            label="操作"
            align="center">
              <template slot-scope="scope">
                <el-button
                type="text"
                @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-card>
  </div>
</template>

<script>
import { getAllSpaces } from '@/services/advert'
export default {
  name: 'advertspacelist',
  data () {
    return {
      advertSpaceInfo: [],
      isLoading: false
    }
  },
  created () {
    this.loadAdvertSpace()
  },
  methods: {
    async loadAdvertSpace () {
      this.isLoading = true
      const { data } = await getAllSpaces()
      if (data.success === true) {
        this.advertSpaceInfo = data.content
        this.isLoading = false
      }
    },
    handleEdit (Rowdata) {
      this.$router.push({
        name: 'advert-space-edit',
        params: {
          id: Rowdata.id
        }
      })
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
