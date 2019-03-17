<template>
  <div>
    <!--内容-->
    <div class="cu-card case">
      <div class="cu-item shadow">
        <div class='padding-sm'>
          <div class='radius text-center shadow-blur bg-gradual-green'>
            <div class='padding text-white'>
              <div class='text-lg text-left'>
                <wxParse :content="content" />
              </div>
            </div>
          </div>
        </div>
        <div class="cu-list menu menu-avatar">
          <div class="cu-item">
            <!--用户信息-->
            <div class="cu-avatar round lg"
                 :style="{'background-image':'url(' + 'https://image.weilanwl.com/img/square-4.jpg' + ')'}"></div>
            <div class='content flex-sub'>
              <div class='text-grey'>{{nickName}}</div>
              <div class='text-gray text-sm flex justify-between'>
                {{createDate}}
              </div>
            </div>
            <!--点赞图标-->
            <div class="text-gray text-xxl flex-direction-row flex">
              <!--<div><span class='icon-appreciate lg text-gray margin-lr-xs'></span></div>-->
              <div>
                <button open-type="share" :data-id="id"><span class="icon-share lg text-gray margin-lr-xs"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--返回首页-->
    <div class="goHome" @click="goHome"><span class='icon-home xl text-gray'></span></div>
    <official-account></official-account>
  </div>
</template>

<script>
  import wxParse from "mpvue-wxparse";

  export default {
    data() {
      return {
        content: "",
        nickName: "不愿透漏姓名的段友",
        createDate: "2019-03-01",
        id: "",
      };
    },
    components: {
      wxParse
    },
    onShareAppMessage() {
      // wx.showLoading({
      //   title: "加载中"
      // });
      return {
        title: "每一个段子都值得被尊重",
        path: `/pages/detail/main?id=${this.id}`,
        imageUrl: "",
        success: function(res) {
          // 转发成功
          // wx.hideLoading()
          console.log("成功", res);
        },
        fail: function(res) {
          // 转发失败
          // wx.hideLoading()
          console.log("失败", res);
        }
      };
    },
    mounted() {
      this.id = this.$root.$mp.query.id;
      this.getArticleDetail(this.id);
    },
    methods: {
      getArticleDetail(id) {
        let self = this;
        wx.showLoading({
          title: "加载中"
        });
        self.$http.getRequest(`articles/${id}`).then((res) => {
          console.log("请求到的苏剧", res.data);
          this.content = res.data.content;
        }).catch((err) => {
          console.log(err);
          // wx.showToast({
          //   title: '加载失败,请重试',
          //   icon: 'error',
          // })
        }).finally(() => {
          wx.hideLoading();
        });
      },
      //  返回首页
      goHome() {
        wx.reLaunch({
          url: "/pages/index/main"
        });
      },
    }
  };
</script>

<style scoped>
  button::after {
    border: none;
  }

  button {
    background-color: #fff;
  }

  .goHome {
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
