<template>
  <div class="channel-edit">
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 我的频道 -->
    <div class="my-pannel">
      <van-grid clickable gutter="10px" :border="false">
        <van-grid-item
          :class="{ octicons: item.name === '推荐' }"
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name != '推荐' ? 'cross' : ''"
          @click="handeMyChannels(item, index)"
        />
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <!-- 频道 -->
    <div class="recommend-pannel">
      <van-grid clickable gutter="10px" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api'
export default {
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  props: {
    myChannels: Array
  },
  created() {
    this.getAllChannes()
  },
  computed: {
    recommendChannels() {
      // 所有的 allChannels每一项
      return this.allChannels.filter((allChanneItem) => {
        return !this.myChannels.find(
          (myChanneItem) => myChanneItem.id === allChanneItem.id
        )
      })
    }
  },
  methods: {
    async getAllChannes() {
      const { data } = await getAllChannelAPI()
      // console.log(data.data.channels)
      this.allChannels = data.data.channels
    },
    handeMyChannels({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log('删除', name)
      } else {
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.octicons) {
  .van-grid-item__text {
    color: red;
  }
}
// postcss插件不能把行内样式变成rem
.channel-edit {
  padding-top: 92px;
}
.btn {
  font-size: 25px;
  width: 100px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
