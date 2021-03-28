<template>
  <div class="course-video">
      <el-card>
          <div slot="header" class="clearfix">
            <el-form>
                <el-form-item label="课程">
                    <el-input :disabled="true" v-model="courseName"></el-input>
                </el-form-item>
                <el-form-item label="课时">
                    <el-input :disabled="true" v-model="theme"></el-input>
                </el-form-item>
            </el-form>
          </div>
          <el-form>
            <el-form-item label="视频上传">
                <input type="file" ref="video-file"/>
            </el-form-item>
            <el-form-item label="封面上传">
                <input type="file" ref="image-file"/>
            </el-form-item>
            <el-form-item>
                <el-button
                @click="handleUpload">开始上传</el-button>
                <el-button
                @click="$router.push({
                    name: 'course-section',
                    params: {
                    courseId
                    }
                })">返回</el-button>
            </el-form-item>
            <el-form-item>
                <p v-if="uploadPrecent !== 0">视频上传中:{{ uploadPrecent }}%</p>
                <p v-if="isUploadSuccess">视频转码中:{{ isTransCodeSuccess ? '完成' : '正在转码中'}}</p>
            </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
/* eslint-disable */ 
import { getCourseById } from '@/services/course'
import { aliyunImagUploadAddressAdnAuth, aliyunVideoUploadAddressAdnAuth, aliyunTransCode, aliyunTransCodePercent } from '@/services/aliyun-uploader'
export default {
  name: 'courseVideo',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    },
    theme: {
      type: String
    }
  },
  data () {
    return {
      imageURL: '',
      uploader: null,
      videoId: '',
      uploadPrecent: 0,
      //   上传完毕状态
      isUploadSuccess: false,
      //   转码状态
      isTransCodeSuccess: false,
      // 课程名称
      courseName: ''
    }
  },
  created () {
    this.loaadCourse()
    this.initUploader()
  },
  methods: {
    async loaadCourse () {
      const { data } = await getCourseById(this.courseId)
      if (data.code === '000000') {
        this.courseName = data.data.courseName
      }
    },
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod ({
        // 阿里账号ID，必须有值
        userId:"1618139964448548",
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region:"",
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async uploadInfo => {
          let uploadAddressAndAuth = null
          if (uploadInfo.isImage) {
            //   图片处理
            const { data } = await aliyunImagUploadAddressAdnAuth()
            if (data.code === '000000'){
              uploadAddressAndAuth = data.data
              this.imageURL = uploadAddressAndAuth.imageURL
            }
          } else {
            //   视频处理
            const { data } = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageURL: this.imageURL
            })
            if (data.code === '000000') {
              uploadAddressAndAuth = data.data
              this.videoId = data.data.videoId
            }
          }
          this.uploader.setUploadAuthAndAddress(
              uploadInfo,
              uploadAddressAndAuth.uploadAuth,
              uploadAddressAndAuth.uploadAddress,
              uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
            )
            // 上传进度开始执行
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
        },
        // 文件上传进度，单位：字节
        onUploadProgress:  (uploadInfo, totalSize, loadedPercent) => {
            if (!uploadInfo.isImage) {
              this.uploadPrecent = Math.floor(loadedPercent*100)
            }
        },
        // 上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo) {
        },
        // 全部文件上传结束
        onUploadEnd:async uploadInfo => {
          this.isTransCodeSuccess = true
          const { data } = await aliyunTransCode({
            lessonId: this.lessonId,
            coverImageUrl: this.imageURL,
            fileId: this.videoId,
            fileName: this.$refs['video-file'].files[0].name
          })
          if (data.code === '000000') {
            const timer=setInterval(async () => {
              const { data } = await aliyunTransCodePercent(this.lessonId)
              if (data.code === '000000') {
                if (data.data === 100) {
                  this.isTransCodeSuccess = true
                  this.$message.success('视频转码成功')
                  clearInterval(timer)
                }
              }
            },1000)
          }
        }
      })
    },
    handleUpload () {
        //  考虑到可能重复使用某个组件，需要覆盖
      this.uploadPrecent = 0
      this.isTransCodeSuccess = false
      this.isUploadSuccess = false
      const videoFile = this.$refs['video-file'].files[0]
      const imageFile = this.$refs['image-file'].files[0]
      // 将上传的文件添加到上传列表中
      const uploader = this.uploader
      uploader.addFile(imageFile)
      uploader.addFile(videoFile)
      uploader.startUpload()
    }
  }
}
</script>

<style>

</style>
