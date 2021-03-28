<template>
  <div class="create">
    <craeteOrUpdate :advert_Id="advertId"></craeteOrUpdate>
  </div>
</template>

<script>
import craeteOrUpdate from './components/CreateOrUpdate'
export default {
  name: 'edit',
  components: {
    craeteOrUpdate
  },
  props: {
    advertId: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style>

</style>
