<template>
  <div class="edit-advertspace">
    <CreateOrUpdate :id="id"></CreateOrUpdate>
  </div>
</template>

<script>
import CreateOrUpdate from './components/createOrUpdate'
export default {
  name: 'editAdvertSpace',
  components: {
    CreateOrUpdate
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style>

</style>
