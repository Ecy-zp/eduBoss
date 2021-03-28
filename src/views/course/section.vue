<template>
  <div class="course-section">
      <el-card>
          <div slot="header" class="clearfix">
            <el-button
            type="text"
            icon="el-icon-back"
            @click="$router.push({name:'course'})">返回</el-button>
          </div>
          <div>
            <el-tree
            :data="sectionsData"
            :props="defaultProps"
            draggable
            :allow-drop="handleAllowDrop"
            :node-drop="handleNodeDrop"
            v-loading="isLoading">
                <div class="inner" slot-scope="{ node, data }">
                    <!-- 内容设置 -->
                    <span>{{ node.label }}</span>
                    <!-- 后续按钮结构 -->
                    <span v-if="data.sectionName" class="action">
                    <el-button size="small">编辑</el-button>
                    <el-button size="small">添加课时</el-button>
                    <el-button size="small">状态</el-button>
                    </span>
                    <span v-else class="action">
                    <el-button size="mini">编辑</el-button>
                    <el-button
                    size="mini"
                    @click="upload(data)">上传视频</el-button>
                    <el-button size="mini">状态</el-button>
                    </span>
                </div>
            </el-tree>
          </div>
      </el-card>
  </div>
</template>

<script>
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdate } from '@/services/course-section'
export default {
  name: 'courseSection',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
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
      isLoading: false
    }
  },
  created () {
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
    upload (data) {
      this.$router.push({
        name: 'course-video',
        params: {
          courseId: this.courseId,
          theme: data.theme
        }
      })
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
