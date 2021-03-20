<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button  @click="$router.push({ name: 'menu-create'})">添加菜单</el-button>
      </div>
      <div class="text item">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="编号"
              width="100"
              type="index">
            </el-table-column>
            <el-table-column
              prop="name"
              label="菜单名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="level"
              label="菜单级数">
            </el-table-column>
            <el-table-column
              prop="icon"
              label="前端图标">
            </el-table-column>
            <el-table-column
              prop="orderNum"
              label="排序">
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getAllMenus, deleteMenu } from '@/services/menu'
export default {
  name: 'MenuIndex',
  created () {
    this.loadAllMenus()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    handleEdit (rowData) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: rowData.id
        }
      })
    },
    handleDelete (rowData) {
      // 删除的取人提示
      this.$confirm('确认删除, 是否继续?', '删除提示', {
        onfirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除请求
        const { data } = await deleteMenu(rowData.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadAllMenus()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取所有菜单信息
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.tableData = data.data
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.el-table .cell {
  text-align: center;
}
</style>
