<template>
  <div class="text-editor" ref="editor"></div>
</template>

<script>
import E from 'wangeditor'
import { uploadImage } from '@/services/course'
export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      // 用于编辑数据是否加载
      isLoaded: false
    }
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor)
      // 创建前进行事件设置
      editor.config.onchange = value => {
        this.$emit('input', value)
      }
      // 配置自定义的图片上传功能
      editor.config.customUploadImg = async (resultFiles, insertImgfn) => {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadImage(fd)
        if (data.code === '000000') {
          // 通过insertImgfn 传回给编辑器
          insertImgfn(data.data.name)
        }
      }
      editor.txt.html(this.value)
      editor.create()
      this.editor = editor
    }
  },
  watch: {
    value () {
      if (this.isLoaded === false) {
        this.editor.txt.html(this.value)
        this.isLoaded = true
      }
    }
  }
}
</script>

<style>

</style>
