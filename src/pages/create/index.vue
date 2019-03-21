<template>
  <div>
    <div class="cu-form-group">
      <textarea placeholder="多行文本输入框"
                maxlength="200"
                show-confirm-bar="true"
                adjust-position="true"
                placeholder-class='placeholder'
      ></textarea>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
    },
    mounted() {
      // console.log("上一个页面传来的数据", this.$root.$mp);
    }
  };
</script>

<style scoped>

</style>
