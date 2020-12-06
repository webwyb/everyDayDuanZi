<template>
  <div>
    <div class='margin-xl bg-white padding-xl radius shadow-lg' v-for="(item,index) in selfBB" :key="index">
      <div class='div-center margin-bottom div-lg  div-grey'>关于段子hand ( {{item.version}} )</div>
      <div class='div-content'>
        <div>Hi！各位用户~欢迎使用段子hand！</div>
        <div class='margin-top-sm' v-for="(c,subIndex) in item.list" :key="subIndex">{{c}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        selfBB: [
          {
            version: "v3.0.0",
            list: [
              "2020年年尾, 重新复活小程序",
              "本次使用了云开发承载后端的服务，花了1小天完成了主要功能的重启",
              "之前的数据已经丢失，找时间重新录入。本次优化了一些滑动的体验，之前由于未做防抖，卡片滑动有抖动，导致体验不好。希望大家时刻关注٩(๑❛ᴗ❛๑)۶",
              "更多功能敬请期待！"
            ]
          },
          {
            version: "v2.0.0",
            list: [
              "继3.15发布了不温不火的'打假版'之后，我们又慢慢腾腾的在清明节前夕发布了'断魂版'。",
              "在该版本中我们在原有功能上做了优化。优化了毫无特色的列表浏览，提供了浸入式浏览体验。(左滑Like,右滑Hate)",
              "该版本我们实现了创作功能，段子手们是时候展示真正的技术了。于此同时，请原谅我们会将无意义、重复、低俗的段子做拒绝发布处理。希望大家时刻关注٩(๑❛ᴗ❛๑)۶",
              "更多功能敬请期待！"
            ]
          },
          {
            version: "v1.0.0",
            list: [
              "作为程序员，没有一个个人项目都不好意思说自己是混互联网圈的。所以两个逗比程序员共同创作了'段子hand'项目，希望我们在瞎搞的同时也能给你带来快乐。",
              "我们对于这个项目还是付出了心血的，尽管目前他看起来还很差。",
              "对于这个项目，我们还有很多想法没有付诸实践，为了赶上这个315的日子。我们决定先发一版本，后期会持续迭代，希望大家时刻关注٩(๑❛ᴗ❛๑)۶",
              "更多功能敬请期待！"
            ]
          }
        ]
      };
    },
  };
</script>

<style scoped>

</style>
