<template>
  <div class="status-change">
    <el-select v-model="value" placeholder="请选择">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select><br/>
    <el-button
    @click="changeStatus"
    type="primary"
    style="margin-top:50px">确认</el-button>
    <el-button @click="canleStatuss" type="primary">取消</el-button>
  </div>
</template>

<script>
import { saveOrUpdateSection, saveOrUpdate } from '@/services/course-section'
export default {
  name: 'StatusChange',
  data () {
    return {
      options: [
        {
          value: 0,
          label: '已隐藏'
        },
        {
          value: 1,
          label: '未更新'
        },
        {
          value: 2,
          label: '已更新'
        }
      ],
      value: this.StatusData.status
    }
  },
  props: {
    StatusData: {
      type: Object,
      required: true
    }
  },
  methods: {
    async changeStatus () {
      if (this.StatusData.sectionId) {
        const { data } = await saveOrUpdate({
          id: this.StatusData.id,
          status: this.value,
          data: this.StatusData
        })
        if (data.code === '000000') {
          this.StatusVisible = false
          this.$message.success('状态更改成功')
          this.$emit('statu_success')
        }
      } else {
        const { data } = await saveOrUpdateSection({
          id: this.StatusData.id,
          status: this.value,
          data: this.StatusData
        })
        if (data.code === '000000') {
          this.StatusVisible = false
          this.$message.success('状态更改成功')
          this.$emit('statu_success')
        }
      }
    },
    canleStatuss () {
      this.$emit('cansole_status')
    }
  }
}
</script>

<style>

</style>
