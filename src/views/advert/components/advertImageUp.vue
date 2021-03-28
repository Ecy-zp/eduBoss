<template>
  <div class="course-image">
    <el-progress
    v-if="isUpLoading"
    type="circle"
    :percentage="percentage"
    :width="170"
    :status="percentage === 100 ?'success':'warning'"></el-progress>
    <el-upload
        v-else
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="handleUpload">
        <img v-if="value" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { uploadImage } from '@/services/course'
export default {
  name: 'AdvertImage',
  props: {
    value: {
      type: String
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      isUpLoading: false,
      //  用于保存进度
      percentage: 0
    }
  },
  methods: {
    // 图片上传函数
    // - option为上传的相关信息
    async handleUpload (option) {
      this.isUpLoading = true
      const fd = new FormData()
      fd.append('file', option.file)
      //  发送上传请求
      const { data } = await uploadImage(fd, event => {
        this.percentage = Math.floor(event.loaded / event.total * 100)
      })
      if (data.code) {
        this.$emit('input', data.data.name)
        this.$message.success('上传成功，加载中...')
        this.isUpLoading = false
        // 上传成功后，设置进度为零
        this.percentage = 0
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < this.limit
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handelProgress (event, file) {
      console.log(event, file)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader  .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
