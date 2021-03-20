<template>
  <div class="menu-create-or-edit">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>{{ isEdit? '编辑菜单': '添加菜单'}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({name: 'menu'})">返回</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="80px" :rules=rules>
            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="菜单路径" prop="href">
                <el-input v-model="form.href"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单">
                <el-select v-model="form.parentId" placeholder="请选择上级菜单">
                <el-option label="无上级菜单" :value="-1"></el-option>
                <el-option v-for="item in parentMenuList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="前端图标" prop="icon">
                <el-input v-model="form.icon"></el-input>
            </el-form-item>
            <el-form-item label="是否显示">
                <el-radio-group v-model="form.shown">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="form.orderNum"  :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button native-type="reset" v-if="!isEdit">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { getEditMenuInfo, createOrUpdateMenu } from '@/services/menu'
export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.loadInfo()
  },
  data () {
    return {
      form: {
        name: '',
        href: '',
        parentId: 2,
        desscription: '',
        icon: '',
        shown: '',
        orderNum: 5
      },
      parentMenuList: [],
      rules: {
        name: [{
          required: true,
          message: '该内容不能为空',
          trigger: 'blur'
        }],
        href: [{
          required: true,
          message: '该内容不能为空',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '该内容不能为空',
          trigger: 'blur'
        }],
        icon: [{
          required: true,
          message: '该内容不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    async onSubmit () {
      // 1.表单校验
      // for (let index = 0; index < Object.keys(this.form).length; index++) {
      //   if (!this.form[index]) {
      //     return this.$message.warning('请将菜单填写完整')
      //   }
      // }
      // 2.发送请求
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'menu'
        })
      }
    },
    async loadInfo () {
      const id = this.$route.params.id || -1
      // 请求菜单数据
      const { data } = await getEditMenuInfo(id)
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
        if (data.data.menuInfo) {
          this.form = data.data.menuInfo
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
