<template>
  <div class="alloc">
      <el-card>
        <el-tree
        ref="menu-tree"
        :data="menudata"
        :props="defaultProps"
        node-key="id"
        show-checkbox
        default-expand-all
        draggable
        :default-checked-keys="checked"></el-tree>
          <div style="text-align:center">
            <el-button @click="onSave" type="primary">保存</el-button>
            <el-button @click="onReset" type="danger">清空</el-button>
          </div>
        </el-card>
  </div>
</template>

<script>
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
export default {
  name: 'alloc',
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      menudata: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checked: []
    }
  },
  created () {
    this.loadMenu()
    this.loadRoleMenus()
  },
  methods: {
    async onSave () {
      this.$confirm('确认保存？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await allocateRoleMenus({
          roleId: this.roleId,
          menuIdList: this.$refs['menu-tree'].getCheckedKeys()
        })
        if (data.code === '000000') {
          this.$router.push({
            name: 'role'
          })
        }
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onReset () {
      this.$refs['menu-tree'].setCheckedKeys([])
    },
    async loadMenu () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menudata = data.data
      }
    },
    // 用于数据筛选的方法
    getCheckedKeys (menus) {
      // 辩能力数据，将所有存在子节点的node排除，对子节点列表进行筛选
      menus.forEach(menu => {
        if (!menu.selected) {
          return
        }
        // 检测是否存在子节点
        if (menu.subMenuList) {
          // 对子节点选中状态进行检测，结束
          return this.getCheckedKeys(menu.subMenuList)
        }
        // 说明为选中的叶子节点，存储ID
        this.checked = [...this.checked, menu.id]
      })
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        this.getCheckedKeys(data.data)
      }
    }
  }
}
</script>

<style>

</style>
