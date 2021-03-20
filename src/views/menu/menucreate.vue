<template>
  <div class="menu-create">
    <create-or-edit :isEdit="false"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './Component/CreateOrEdit'
export default {
  name: 'menu-crate',
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped>

</style>
