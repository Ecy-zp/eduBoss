<template>
  <div class="create-or-update">
    <el-form  ref="roleform" :model="roleform" label-width="80px">
        <el-form-item label="角色名称">
            <el-input v-model="roleform.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码">
            <el-input v-model="roleform.code"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
            <el-input type="textarea"
            v-model="roleform.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ !isEdit?"立即创建":"提交"}}</el-button>
            <el-button @click="Cansole">取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { createOrUpdate, getrole } from '@/services/role'
export default {
  name: 'createOrUpdate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    role_id: {
      type: [Number, String]
    }
  },
  created () {
    if (this.isEdit) {
      this.loadrole()
    }
  },
  data () {
    return {
      roleform: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await createOrUpdate(this.roleform)
      if (data.code === '000000') {
        this.$emit('success')
        this.$message.success('添加成功')
        // 清空表单内容
        this.roleform = {}
      }
    },
    async loadrole () {
      const id = this.role_id
      const { data } = await getrole(id)
      if (data.code === '000000') {
        this.roleform = data.data
      }
    },
    Cansole () {
      this.$emit('cansole')
      this.$message.info('取消添加')
    }
  }
}
</script>

<style>

</style>
