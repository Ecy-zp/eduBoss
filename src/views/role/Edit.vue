<template>
  <div class="edit">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>编辑角色</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({ name: 'role' })">返回</el-button>
        </div>
        <create-or-update :isEdit="true"></create-or-update>
      </el-card>
  </div>
</template>

<script>
import CreateOrUpdate from './components/CreateOrUpdate.vue'
export default {
  components: { CreateOrUpdate },
  name: 'edit'
}
</script>

<style>

</style>
