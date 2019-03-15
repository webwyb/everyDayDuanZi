<template>
  <div>
    <!--海报-->
    <img :src="shareImage" class="share-image" />
    <canvasdrawer :painting="painting" @getImage="eventGetImage" />
    <button @click="eventDraw">重新绘制</button>
    <button @click="eventSave">保存到相册</button>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        painting: {},
        shareImage: "",
        content: "",
        id: "",
        userAvatarUrl: "",
        userNickName: ""
      };
    },
    mounted() {
      this.id = this.$root.$mp.query.id;
      this.userNickName = this.$root.$mp.query.userNickName;
      this.userAvatarUrl = this.$root.$mp.query.userAvatarUrl;
      this.getArticleDetail(this.id);
    },
    methods: {
      getArticleDetail(id) {
        let self = this;
        wx.showLoading({
          title: "加载中"
        });
        self.$http.getRequest(`articles/${id}`).then((res) => {
          // this.content = res.data.content;
          self.eventDraw(res.data.content);
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          wx.hideLoading();
        });
      },
      eventDraw(content) {
        wx.showLoading({
          title: "图片生成中",
          mask: true
        });
        this.painting = {
          width: 375,
          height: 555,
          views: [
            {
              type: "image",
              url: "https://duanzi.fengtianhe.cn/assets/images/share.png", // 背景
              top: 0,
              left: 0,
              width: 375,
              height: 555
            },
            {
              type: "image",
              url: this.userAvatarUrl, //头像
              top: 27.5,
              left: 29,
              width: 55,
              height: 55
            },
            {
              type: "image",
              url: "https://duanzi.fengtianhe.cn/assets/images/tc1.png", //头像框
              top: 27.5,
              left: 29,
              width: 55,
              height: 55
            },
            {
              type: "text",
              content: `您的好友【${this.userNickName}】对你说:`,
              fontSize: 16,
              color: "#402D16",
              textAlign: "left",
              top: 33,
              left: 96,
              bolder: true
            },
            {
              type: "text",
              content: "我的快乐,只想与你分享",
              fontSize: 15,
              color: "#563D20",
              textAlign: "left",
              top: 59.5,
              left: 96
            },
            {
              type: "image",
              url: "https://duanzi.fengtianhe.cn/assets/images/tc2.png", // 商品图片
              top: 136,
              left: 42.5,
              width: 290,
              height: 186
            },
            {
              type: "text",
              content: content, // 段子的文本内容
              fontSize: 16,
              lineHeight: 21,
              color: "#383549",
              textAlign: "left",
              top: 336,
              left: 44,
              width: 287,
              MaxLineNumber: 3,
              breakWord: true,
              bolder: true
            },
            {
              type: "image",
              url: "https://duanzi.fengtianhe.cn/assets/images/miniprogram.jpg", //二维码
              top: 443,
              left: 85,
              width: 68,
              height: 68
            },
            // {
            //   type: "text",
            //   content: "正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人",
            //   fontSize: 16,
            //   lineHeight: 21,
            //   color: "#383549",
            //   textAlign: "left",
            //   top: 336,
            //   left: 44,
            //   width: 287,
            //   MaxLineNumber: 2,
            //   breakWord: true,
            //   bolder: true
            // },
            // {
            //   type: "text",
            //   content: "￥0.00",
            //   fontSize: 19,
            //   color: "#E62004",
            //   textAlign: "left",
            //   top: 387,
            //   left: 44.5,
            //   bolder: true
            // },
            // {
            //   type: "text",
            //   content: "原价:￥138.00",
            //   fontSize: 13,
            //   color: "#7E7E8B",
            //   textAlign: "left",
            //   top: 391,
            //   left: 110,
            //   textDecoration: "line-through"
            // },
            {
              type: "text",
              content: "长按识别图中二维码查看全部内容",
              fontSize: 14,
              color: "#383549",
              textAlign: "left",
              top: 460,
              left: 165.5,
              lineHeight: 20,
              MaxLineNumber: 2,
              breakWord: true,
              width: 125
            }
          ]
        };
      },
      eventGetImage(event) {
        console.log("绘制的文本信息", event);
        this.shareImage = event.target.tempFilePath;
        wx.hideLoading();
        // const { tempFilePath, errMsg } = event.target;
        // if (errMsg === "canvasdrawer:ok") {
        //   console.log("tempFilePath", tempFilePath);
        //   // this.setData({
        //   //   shareImage: tempFilePath
        //   // })
        // }
      },
      eventSave() {
        wx.saveImageToPhotosAlbum({
          filePath: this.shareImage,
          success(res) {
            wx.showToast({
              title: "保存图片成功",
              icon: "success",
              duration: 2000
            });
          }
        });
      }
    }
  };
</script>

<style scoped>
  .share-image {
    width: 600rpx;
    height: 888rpx;
    margin: 0 75rpx;
    border: 1px solid black;
  }

  button {
    margin-top: 20rpx;
  }
</style>
