<template>
  <div>
    <!--内容-->
    <div class="cu-card case">
      <div class="cu-item shadow">
        <div class='padding-sm'>
          <div class='radius text-center shadow-blur bg-red'>
            <div class='padding text-white'>
              <div class='text-df text-left'>
                {{item.content}}
              </div>
            </div>
          </div>
        </div>
        <div class="cu-list menu menu-avatar">
          <div class="cu-item">
            <!--用户信息-->
            <div class="cu-avatar round lg"
                 :style="{'background-image':'url(' + item.userInfo.avatarUrl + ')'}"></div>
            <div class='content flex-sub'>
              <div class='text-grey'>{{item.userInfo.userName}}</div>
              <div class='text-gray text-sm flex justify-between'>
                {{item.userInfo.createTime}}
              </div>
            </div>
            <!--点赞图标-->
            <div class="text-gray text-xxl flex-direction-row flex">
              <!--<div><span class='icon-appreciate lg text-gray margin-lr-xs'></span></div>-->
              <div>
                {{item.index}}
                <button open-type="share" :data-id="item.index"><span class="icon-share lg text-gray margin-lr-xs"></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            index: 1,
            cardBackGround: "bg-gradual-red",
            content: "那年楼主大概六七岁，有天傍晚爹妈出去干农活还没回家，我和姐姐闹着玩，打算装鬼吓唬她一下，楼主不知在哪里找了块儿花里胡哨的破床单，蒙在了头上，然后躲在了门后，不一会儿楼主听见了开门声，楼主激动的嗷一嗓子就跳了出去……只听一声惊呼：“卧槽尼玛！……”然后楼主就感觉头上剧痛，都被打蒙了。原来不是我姐，是我爹回来了……当时我爹吓了一跳，在搭上天黑不知道是啥东西，抡圆了胳膊就乎了过来，结果一巴掌乎在了我的头上，知道是我之后又是一顿暴揍……，楼主不知在哪里找了块儿花里胡哨的破床单，蒙在了头上，然后躲，楼主不知在哪里找了块儿花里胡哨的破床单，蒙在了头上，然后躲",
            userInfo: {
              avatarUrl: "https://image.weilanwl.com/img/square-4.jpg",
              userName: "猪皮蛋",
              createTime: "2019-03-01"
            }
          }],
        isShowLoadMore: false,
      };
    },
    onShareAppMessage(res) {
      console.log('分享的内容',res);
      if (res.from === "button") {
        // 来自页面内转发按钮
        console.log(res.target);
        return {
          title: "自定义转发标题",
          path: "/pages/logs/main?id=123"
        };
      }
      // return {
      //   title: "自定义转发标题",
      //   path: "/page/user?id=123"
      // };
    },
    mounted() {
      console.log("this.$root.$mp", this.$root.$mp.query.id);
      this.getArticleDetail(this.$root.$mp.query.id)
    },
    methods: {
      getArticleDetail(id) {
        let self = this;
        self.$http.getRequest(`articles/${id}`).then((res) => {
          console.log("请求到的苏剧", res.data);
        }).catch((err) => {
          console.log("请求到的苏剧", err);
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
  .toTop{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background:#fff;
    position:fixed;
    right:20px;
    bottom:40px;
    z-index:10;
    width: 33px;
    height: 33px;
    border-radius: 50%;
    border: 1px solid #B9B9B9;
  }
</style>
