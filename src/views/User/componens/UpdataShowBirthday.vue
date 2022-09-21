<template>
  <div>
    <van-datetime-picker
      ref="birthday"
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { BirthdayModifyAPI } from '@/api'
export default {
  data() {
    return {
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17)
    }
  },
  methods: {
    async confirm(value) {
      console.log(value)
      // console.log(this.$refs.birthday.value)
      const time = dayjs(this.$refs.birthday.value).format('YYYY-MM-DD')
      console.log(time)
      const { data } = await BirthdayModifyAPI(time)
      console.log(data)
      if (data.message === 'OK') {
        this.$toast.success('用户生日更新成功')

        this.$emit('Open-Birthday', time)
      }
    },
    cancel() {
      console.log(666)
      this.$emit('Open-Birthday')
    }
  }
}
</script>

<style></style>
