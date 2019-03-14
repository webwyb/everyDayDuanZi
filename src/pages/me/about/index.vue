<template>
  <div class='margin-xl bg-white padding-xl radius shadow-lg'>
    <div class='div-center margin-bottom div-lg  div-grey'>关于段子hand</div>
    <div class='div-content'>
      <div>Hi！各位用户~欢迎使用段子hand！</div>
      <div class='margin-top-sm'>
        作为程序员，没有个个人项目都不好意思说自己是混互联网圈的。所以我和另外一个逗比程序员共同创作了"段子hand"项目，希望我们在瞎搞的同时也能给你带来快乐
      </div>
      <div class='margin-top-sm'>我们对于这个项目还是付出了心血的，尽管目前他看起来还很差。</div>
      <div class='margin-top-sm'>
        对于这个项目，我们还有很多想法没有付诸实践，为了赶上这个315的日子。我们决定先发一版本，后期会持续迭代，希望大家时刻关注٩(๑❛ᴗ❛๑)۶
      </div>
      <div class='margin-top-sm'>更多功能敬请期待！</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
    },
    mounted() {
      console.log("上一个页面传来的数据", this.$root.$mp);
    }
  };
</script>

<style scoped>

</style>
