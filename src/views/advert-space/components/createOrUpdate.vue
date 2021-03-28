<template>
  <div class="create-or-update-advertsapce">
    <el-card>
      <div class="clearfix" slot="header">
        <el-button
        type="text"
        icon="el-icon-back"
        @click="$router.push({
            name: 'advert-space'
        })">返回</el-button>
      </div>
      <el-form :model="adSpace_form" label-width="120px" ref="adSpace_form">
          <el-form-item label="广告位名称" prop="name">
            <el-input v-model="adSpace_form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
            @click="onSubmit">提交</el-button>
            <el-button v-if="id" @click="onReset">重置</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { saveOrUpdate } from '@/services/advert-space'
import { getSpaceById } from '@/services/advert'
export default {
  name: 'CreateOrUpdate',
  props: {
    id: {
      type: [Number, String]
    }
  },
  data () {
    return {
      adSpace_form: {}
    }
  },
  created () {
    if (this.id) {
      this.loadadSpace()
    }
  },
  methods: {
    async loadadSpace () {
      const { data } = await getSpaceById(this.id)
      if (data.success === true) {
        this.adSpace_form = data.content
      }
    },
    async onSubmit () {
      const { data } = await saveOrUpdate(this.adSpace_form)
      if (data.success === true) {
        this.$message.success('提交成功!>-<')
        this.$router.push({
          name: 'advert-space'
        })
      }
    },
    onReset () {
      this.$refs.adSpace_form.resetFields()
    }
  }
}
</script>

<style>

</style>
