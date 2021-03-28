<template>
  <div class="create-edit">
    <el-card>
      <div class="header">
        <el-steps :active="activeStep" simple style="margin-bottom:20px">
          <el-step
           v-for="(item,i) in steps"
           :key="item.id"
           :title="item.title"
           :icon="item.icon"
           @click.native="activeStep = i"></el-step>
        </el-steps>
      </div>
      <!-- 表单 -->
      <el-form label-position="right" label-width="80px" :model="CourseInfoData">
        <!-- 基本信息 -->
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
              <el-input
              v-model="CourseInfoData.courseName"
              maxlength="50"
              show-word-limit></el-input>
          </el-form-item>
          <!-- 简介 -->
          <el-form-item label="简介">
              <el-input
              v-model="CourseInfoData.brief"
              maxlength="100"
              show-word-limit></el-input>
          </el-form-item>
          <!-- 讲师姓名 -->
          <el-form-item label="讲师姓名">
              <el-input
              v-model="CourseInfoData.teacherDTO.teacherName"
              maxlength="50"
              show-word-limit></el-input>
          </el-form-item>
          <!-- 职位 -->
          <el-form-item label="职位">
            <el-input
            v-model="CourseInfoData.teacherDTO.position"
            maxlength="50"
              show-word-limit></el-input>
          </el-form-item>
          <!-- 讲师简介 -->
          <el-form-item label="讲师简介">
            <el-input
            v-model="CourseInfoData.teacherDTO.description"
            maxlength="100"
            show-word-limit></el-input>
          </el-form-item>
          <!-- 课程描述 -->
          <el-form-item label="课程概述">
            <el-input
            v-model="CourseInfoData.previewFirstField"
            maxlength="20"
            show-word-limit
            placeholder="概述1"
            style="width:49%;min-width:300px;margin-right:15px"></el-input>
            <el-input
            v-model="CourseInfoData.previewSecondField"
            maxlength="20"
            show-word-limit
            placeholder="概述2"
            style="width:49%;min-wdith:300px"></el-input>
          </el-form-item>
          <!-- 课程排序 -->
          <el-form-item label="课程排序">
            <el-input
            label="描述文字"
            v-model="CourseInfoData.sortNum"
            type="number">
              <template slot="append">数字控制排序，数字越大越靠后</template>
            </el-input>
          </el-form-item>
        </div>
        <!-- 课程封面 -->
        <div v-show="activeStep === 1">
          <!-- 课程封面 -->
          <el-form-item label="课程封面">
            <CourseImage
            v-model="CourseInfoData.courseListImg"
            :limit="3"></CourseImage>
          </el-form-item>
          <!-- 解锁封面 -->
          <el-form-item label="解锁封面">
            <CourseImage
            v-model="CourseInfoData.courseImgUrl"
            :limit="3"></CourseImage>
          </el-form-item>
        </div>
        <!-- 销售信息 -->
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input v-model="CourseInfoData.discounts" type="number">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="CourseInfoData.price" type="number">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="CourseInfoData.sales" type="number">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input
            v-model="CourseInfoData.discountsTag"
            maxlength="4"
            show-word-limit></el-input>
          </el-form-item>
        </div>
        <!-- 秒杀信息 -->
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀">
            <template>
              <el-switch
              v-model="CourseInfoData.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              :inactive-value="false">
              </el-switch>
            </template>
          </el-form-item>
          <template v-if="CourseInfoData.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="CourseInfoData.activityCourseDTO.beginTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="CourseInfoData.activityCourseDTO.endTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input v-model="CourseInfoData.activityCourseDTO.amount"
              type="number"
              :min="0">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="库存">
              <el-input v-model="CourseInfoData.activityCourseDTO.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <!-- 课程详情 -->
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <TextEditor v-model="CourseInfoData.courseDescriptionMarkDown"></TextEditor>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-switch
            v-model="CourseInfoData.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </div>
        <!-- 下一步按钮 -->
        <el-form-item>
          <el-button
          v-if="activeStep > 0"
          @click="activeStep--">上一步</el-button>
          <el-button
          v-if="activeStep !== steps.length -1"
          @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import CourseImage from './CourseImage'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
import TextEditor from '@/components/TextEditor'
export default {
  name: 'createOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: [String, Number]
  },
  components: {
    CourseImage,
    TextEditor
  },
  data () {
    return {
      // 添加或者更新的课程信息
      //  将数据中与ID相关的数据清除
      CourseInfoData: {
        courseName: '', // 课程名称
        brief: '',
        teacherDTO: { // 讲师信息
          teacherName: '', // 讲师姓名
          teacherHeadPicUrl: '',
          position: '', // 讲师职位
          description: '' // 讲师描述
        },
        courseDescriptionMarkDown: '<h3>默认值</h3>',
        price: 0, // 原价
        discounts: 0, // 售卖价格
        priceTag: '',
        discountsTag: '', // 活动标签
        isNew: true,
        isNewDes: '',
        // 课程图片
        courseListImg: '',
        // 解锁封面
        courseImgUrl: '',
        sortNum: 0, // 排序
        previewFirstField: '', // 课程描述1
        previewSecondField: '', // 课程描述2
        status: 0,
        sales: 0,
        activityCourse: false, // 是否活动状态
        activityCourseDTO: { // 活动信息
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      },
      activeStep: 0,
      steps: [
        { id: 1, title: '基本信息', icon: 'el-icon-edit' },
        { id: 2, title: '课程封面', icon: 'el-icon-upload' },
        { id: 3, title: '销售信息', icon: 'el-icon-picture' },
        { id: 4, title: '秒杀信息', icon: 'el-icon-edit' },
        { id: 5, title: '课程详情', icon: 'el-icon-edit' }
      ]
    }
  },
  created () {
    // 判断当前是否为编辑功能
    if (this.isEdit) {
      this.loadCourse()
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdateCourse(this.CourseInfoData)
      if (data.code === '000000') {
        this.$message.success(`${this.isEdit ? '编辑' : '添加'}课程成功！`)
        this.$router.push({
          name: 'course'
        })
      }
    },
    // 编辑功能，根据ID加载课程信息
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        // 判断当前课程是否为秒杀，如果为开启需要初始化
        if (!data.data.activityCourse) {
          data.data.activityCourseDTO = {
            beginTime: '',
            endTime: '',
            amount: 0,
            stock: 0
          }
        }
        this.CourseInfoData = data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-step{
  cursor: pointer;
}
</style>
