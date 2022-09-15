<template>
  <div class="update-avatar">
    <!-- 动态绑定父组件传过来的图片 -->
    <img :src="photo" alt="" ref="image" />
    <div class="toolbar">
      <span>取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
// 下载 cropperjs-- yarn add cropperjs
// 更新用户的头像 给服务器传图片服务器回返回一个图片的地址
// 要的表单
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadPhotoAPI } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      require: true
    },
    avator: {
      type: String,
      require: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    confirm() {
      this.myCropper.getCroppedCanvas().toBlob(
        async (blob) => {
          const { data } = await uploadPhotoAPI(blob)
          this.$emit('update:avator', data.data.photo)
          // 关闭弹层
          this.$parent.$parent.isShowPhoto = false
        } /*, 'image/png' */
      )
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 65%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 9999;
  }
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
