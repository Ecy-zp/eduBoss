<template>
  <div class="create-update">
    <el-card>
        <div class="clearfix" slot="header">
            <el-button
            type="text"
            icon="el-icon-back"
            @click="$router.push({
                name: 'advert'
            })">返回</el-button>
        </div>
        <el-form
        label-width="80px"
        :model="advertInfo"
        ref="advertInfo"
        v-loading="isLoading">
            <!-- 广告名称 -->
            <el-form-item label="广告名称" prop="name">
              <el-input v-model="advertInfo.name"></el-input>
            </el-form-item>
            <!-- 广告位置 -->
            <el-form-item label="广告位置" prop="AdvertInfos">
                <el-select v-model="options" placeholder="请选择">
                    <el-option
                    v-for="item in AdvertInfos"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- 开始时间 -->
            <el-form-item label="开始时间" prop="startTime">
                <el-date-picker
                v-model="advertInfo.startTime"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <!-- 结束时间 -->
            <el-form-item label="结束时间" prop="endTime">
                <el-date-picker
                v-model="advertInfo.endTime"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <!-- 上线状态 -->
            <el-form-item label="上限/下线" prop="status">
                <el-radio v-model="advertInfo.status" :label="1">上线</el-radio>
                <el-radio v-model="advertInfo.status" :label="0">下线</el-radio>
            </el-form-item>
            <!-- 广告封面 -->
            <el-form-item label="广告封面">
                <AdvertImage
                v-model="advertInfo.img"
                :limit="3"></AdvertImage>
            </el-form-item>
            <!-- 广告链接 -->
            <el-form-item label="广告链接" prop="link">
                <el-input v-model="advertInfo.link"></el-input>
            </el-form-item>
            <!-- 广告备注 -->
            <el-form-item label="广告备注" prop="text">
                <el-input type="textarea" v-model="advertInfo.text"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button>提交</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import AdvertImage from './advertImageUp'
import { getAdById, getAllSpaces, getSpaceById } from '@/services/advert'
export default {
  name: 'craeteOrUpdate',
  data () {
    return {
      advertInfo: {},
      AdvertInfos: [],
      options: '',
      isLoading: false
    }
  },
  components: {
    AdvertImage
  },
  props: {
    advert_Id: {
      type: [String, Number]
    }
  },
  created () {
    this.loadAdvertSpace()
    if (this.advert_Id) {
      this.loadAdvert()
    }
  },
  methods: {
    async loadAdvert () {
      this.isLoading = true
      const { data } = await getAdById(this.advert_Id)
      if (data.success === true) {
        this.advertInfo = data.content
      }
      const { data: data2 } = await getSpaceById(this.advertInfo.spaceId)
      if (data2.success === true) {
        this.options = data2.content.id
        this.isLoading = false
      }
    },
    async loadAdvertSpace () {
      const { data } = await getAllSpaces()
      if (data.success === true) {
        this.AdvertInfos = data.content
      }
    },
    onReset () {
      this.$refs.advertInfo.resetFields()
    }
  }
}
</script>

<style>

</style>
