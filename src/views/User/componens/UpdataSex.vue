<template>
  <div>
    <van-picker
      ref="sex"
      title="标题"
      show-toolbar
      :default-index="$store.state.index"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { SexModifyAPI } from '@/api'
export default {
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    onCancel() {
      console.log(666)
      this.$emit('Open-Sex')
    },
    async onConfirm() {
      try {
        const { data } = await SexModifyAPI(
          this.$refs.sex.getIndexes().toString()
        )
        console.log(data)
        if (data.message === 'OK') {
          this.$toast.success('用户性别更新成功')

          this.$emit('Open-Sex', this.$refs.sex.getIndexes().toString())
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style></style>
