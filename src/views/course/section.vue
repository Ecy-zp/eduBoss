<template>
  <div class="course-section">
      <el-card>
          <div slot="header" class="clearfix">
            <el-button
            type="text"
            icon="el-icon-back"
            @click="$router.push({name:'course'})">返回</el-button>
            <span style="margin:0 10px">|</span>
            <span>{{CourseInfo.courseName}}</span>
            <el-button
            style="float:right"
            type="primary"
            icon="el-icon-plus"
            @click="SetionVisible = true">添加章节</el-button>
          </div>
          <div>
            <el-tree
            :data="sectionsData"
            :props="defaultProps"
            draggable
            :allow-drop="handleAllowDrop"
            :node-drop="handleNodeDrop"
            v-loading="isLoading"
            :expand-on-click-node="false">
                <div class="inner" slot-scope="{ node, data }">
                    <!-- 内容设置 -->
                    <span>{{ node.label }}</span>
                    <!-- 后续按钮结构 -->
                    <span v-if="data.sectionName" class="action">
                    <el-button
                    size="small"
                    @click="EditSection(data)">编辑</el-button>
                    <el-button
                    size="small"
                    @click="CreateLesson(data)">添加课时</el-button>
                    <el-button
                    size="mini"
                    @click="change(data)"
                    v-if="data.status === 0">已隐藏</el-button>
                    <el-button
                    size="mini"
                    @click="change(data)"
                    v-else>{{data.status === 1? '未更新': '已更新'}}</el-button>
                    </span>
                    <span v-else class="action">
                    <el-button
                    size="mini"
                    @click="EditLesson(data)">编辑</el-button>
                    <el-button
                    size="mini"
                    @click="upload(data)">上传视频</el-button>
                    <el-button
                    size="mini"
                    @click="change(data)"
                    v-if="data.status === 0">已隐藏</el-button>
                    <el-button
                    size="mini"
                    @click="change(data)"
                    v-else>{{data.status === 1? '未更新': '已更新'}}</el-button>
                    </span>
                </div>
            </el-tree>
          </div>
          <!-- 编辑章节弹出框 -->
          <el-dialog
            title="章节基本信息"
            :visible.sync="SetionVisible"
            width="50%">
            <el-form
            label-width="80px"
            :data="currentSection">
              <el-form-item label="课程名称">
                <el-input
                v-model="CourseInfo.courseName"
                disabled></el-input>
              </el-form-item>
              <el-form-item label="章节名称">
                <el-input
                v-model="currentSection.sectionName"
                ></el-input>
              </el-form-item>
              <el-form-item label="章节描述">
                <el-input
                type="textarea"
                v-model="currentSection.description"></el-input>
              </el-form-item>
              <el-form-item label="章节排序">
                <el-input
                type="number"
                v-model="currentSection.orderNum">
                  <template slot="append">数字控制排序，数字越大越靠后</template>
                </el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="SetionVisible = false">取 消</el-button>
              <el-button type="primary" @click="SubmitSection">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 编辑或创建课时弹出框 -->
          <el-dialog
            title="课时基本信息"
            :visible.sync="LessonVisible"
            width="50%">
            <create-or-update-section
            :Lesson="currentLesson"
            :Section="currentSection"
            :CourseName="CourseInfo.courseName"
            @success="UpdateData($event)"
            @cansole="LessonVisible = false"></create-or-update-section>
          </el-dialog>
          <!-- 更改状态弹出框 -->
          <el-dialog
            title="提示信息"
            :visible.sync="StatusVisible"
            width="50%">
            <status-change :StatusData="currentData"
            @statu_success="StatusUpdate"
            @cansole_status="StatusVisible = false"></status-change>
          </el-dialog>
      </el-card>
  </div>
</template>

<script>
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdate } from '@/services/course-section'
import { getCourseById } from '@/services/course'
import CreateOrUpdateSection from './components/CreateOrUpdateSection'
import StatusChange from './components/statuschange'
export default {
  name: 'courseSection',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    CreateOrUpdateSection,
    StatusChange
  },
  data () {
    return {
      sectionsData: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data) {
          // data 是章节的时候label会不同
          return data.sectionName || data.theme
        }
      },
      // 是否加载
      isLoading: false,
      // 课程基本信息
      CourseInfo: {},
      // 当前章节
      currentSection: {},
      // 当前课时
      currentLesson: {},
      // 章节隐藏状态
      SetionVisible: false,
      // 课时隐藏状态
      LessonVisible: false,
      // 状态更改状态
      StatusVisible: false,
      // 当前更改状态数据
      currentData: {},
      value: ''
    }
  },
  created () {
    this.loadCourse()
    this.loadSection()
  },
  methods: {
    async loadSection () {
      const { data } = await getSectionAndLesson(this.courseId)
      if (data.code === '000000') {
        this.sectionsData = data.data
      }
    },
    // 节点拖拽处理
    handleAllowDrop (draggingNode, drowNode, type) {
    // 规则1：只能同级移动
    // 规则2：课时不能移动到其他章节
      return type !== 'inner' && draggingNode.data.sectionId === drowNode.data.sectionId
    },
    // 节点拖拽后
    async handleNodeDrop (draggingNode, drowNode, type, event) {
      this.isLoading = true
      // 由于有多个章节和课时，需要给每个进行发送请求
      try {
        await Promise.all(drowNode.parent.childNodes.map((item, index) => {
        //   判断当前是章节还是课时
          if (draggingNode.data.sectionId) {
          // 课时接口处理
            return saveOrUpdate({
              id: item.data.id,
              orderNum: index
            })
          } else {
            // 章节接口处理
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index
            })
          }
        }))
        this.$message.success('数据更新成功')
      } catch (err) {
        this.$message.error('数据更新失败')
      }
      this.isLoading = false
    },
    // 上传
    upload (data) {
      this.$router.push({
        name: 'course-video',
        params: {
          courseId: this.courseId,
          theme: data.theme
        }
      })
    },
    // 获取课程信息
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        this.CourseInfo = data.data
      }
    },
    // 编辑章节
    EditSection (data) {
      this.currentSection = data
      this.SetionVisible = true
    },
    // 更新章节
    async SubmitSection () {
      if (!this.currentSection.courseId) {
        this.currentSection.courseId = this.CourseInfo.id
      }
      const { data } = await saveOrUpdateSection(this.currentSection)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.loadSection()
        this.SetionVisible = false
      } else {
        this.$message.error(data.msg)
      }
    },
    // 添加课时
    CreateLesson (data) {
      this.currentSection = data
      this.currentLesson = {}
      this.currentLesson.courseId = data.courseId
      this.currentLesson.sectionId = data.id
      this.LessonVisible = true
    },
    // 编辑课时
    EditLesson (data) {
      this.LessonVisible = true
      this.sectionsData.forEach(element => {
        if (element.id === data.sectionId) {
          this.currentSection = element
        }
      })
      this.currentLesson = data
    },
    change (data) {
      this.StatusVisible = true
      this.currentData = data
      this.value = data.status
    },
    // 变更状态
    UpdateData (data) {
      this.currentLesson = data
      this.LessonVisible = false
      this.loadSection()
    },
    StatusUpdate () {
      this.loadSection()
      this.StatusVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.inner{
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}
::v-deep .el-tree-node__content{
    height: auto;
}
</style>
