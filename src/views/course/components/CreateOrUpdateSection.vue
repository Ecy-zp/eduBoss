<template>
  <div class="create-or-update-section">
    <el-form
    label-width="120px"
    :data="Lesson">
        <el-form-item label="课程名称">
        <el-input
        v-model="CourseName"
        disabled></el-input>
        </el-form-item>
        <el-form-item label="章节名称">
        <el-input
        v-model="Section.sectionName"
        disabled></el-input>
        </el-form-item>
        <el-form-item label="课时名称">
        <el-input
        v-model="Lesson.theme"></el-input>
        </el-form-item>
        <el-form-item label="时长">
        <el-input
        type="number"
        v-model="Lesson.duration">
            <template slot="append">分钟</template>
        </el-input>
        </el-form-item>
        <el-form-item label="是否开放试听">
        <el-switch
        v-model="Lesson.isFree"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :active-value="true"
        :inactive-value="false">
        </el-switch>
        </el-form-item>
        <el-form-item label="课时排序">
        <el-input
        type="number"
        v-model="Lesson.orderNum">
            <template slot="append">数字控制排序，数字越大越靠后</template>
        </el-input>
        </el-form-item>
        <el-form-item>
        <el-button @click="SubmitLesson">确认</el-button>
        <el-button @click="cansole">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { saveOrUpdate } from '@/services/course-section'
export default {
  name: 'CreateOrUpdateSection',
  props: {
    Lesson: {
      type: Object,
      required: true
    },
    Section: {
      type: Object
    },
    CourseName: {
      type: String
    }
  },
  methods: {
    async SubmitLesson () {
      const { data } = await saveOrUpdate(this.Lesson)
      if (data.code === '000000') {
        this.$message.success('保存成功')
        this.LessonVisible = false
        this.$emit('success', this.Lesson)
      }
    },
    cansole () {
      this.$emit('cansole')
    }
  }
}
</script>

<style>

</style>
