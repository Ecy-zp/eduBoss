<template>
  <div class="menu-edit">
    <!--  -->
    <create-or-edit :isEdit="true"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './Component/CreateOrEdit'
export default {
  name: 'menu-edit',
  components: {
    CreateOrEdit
  }
}
</script>

<style>

</style>
