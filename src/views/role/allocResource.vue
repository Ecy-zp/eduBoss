<template>
  <div class="alloc-resource">
    <el-card>
      <div
      v-for="item in parentResource"
      :key="item.id"
      class="choose">
        <el-checkbox
        v-model="item.selected"
        @change="change(item.selected, item.roleIdList)">{{item.name}}</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedList" >
            <el-checkbox
            v-for="childItem in item.roleIdList"
            :key="childItem.id"
            v-model="childItem.selected"
            :label="childItem.id">{{childItem.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getResourcecCategories, getAll } from '@/services/resource'
// import { getUserPermissions } from '@/services/user'
export default {
  name: 'allocResource',
  data () {
    return {
      checkAll: false,
      checkedList: [],
      parentResource: [],
      childrenResource: []
    }
  },
  async created () {
    await this.loadAllpermession()
    await this.loadPermession()
  },
  methods: {
    async loadPermession () {
      const { data } = await getResourcecCategories()
      if (data.code === '000000') {
        this.parentResource = data.data
        this.parentResource.forEach(element => {
          element.roleIdList = []
          this.childrenResource.map(item => {
            if (item.categoryId === element.id) {
              element.roleIdList.push(item)
            }
          })
        })
      }
    },
    async loadAllpermession () {
      const { data } = await getAll()
      if (data.code === '000000') {
        this.childrenResource = data.data
      }
    },
    change (val, List) {
      if (val === true) {
        List.forEach(element => {
          if (!this.checkedList.includes(element.id)) {
            this.checkedList.push(element.id)
          }
        })
      } else {
        List.forEach(element => {
          if (this.checkedList.indexOf(element.id)) {
            this.checkedList = []
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.choose{
  height: 100px;
}
</style>
