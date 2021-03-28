<template>
  <div class="edit-course">
    <createOrEdit
    isEdit
    :course-id="courseId"></createOrEdit>
  </div>
</template>

<script>
import createOrEdit from './components/CreateOrEdit'
export default {
  name: 'course-edit',
  components: {
    createOrEdit
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style>

</style>
