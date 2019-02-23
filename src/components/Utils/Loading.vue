<template>
  <div>
    <span v-if="show === 'msg'">{{msg}}</span>
    <div class="text-xs-center" v-if="show === 'loading'">
      <v-progress-circular
        slot="progress"
        :size="50"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    show:{
      type: String,
      default:'loading',
      required: true
    },
    msg: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
