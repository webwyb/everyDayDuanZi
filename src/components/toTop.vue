<template>
  <div class="toTop" @click="toTop"><span class='icon-top xl text-gray'></span></div>
</template>

<script>
  export default {
    name: "toTop",
    data() {
      return {};
    },
    methods: {
      // 返回顶部
      toTop() {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
      }
    }
  };
</script>

<style scoped>
  .toTop {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #fff;
    position: fixed;
    right: 20px;
    bottom: 40px;
    z-index: 10;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #B9B9B9;
  }
</style>
