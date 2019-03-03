<template>
  <div>
  </div>
</template>
<script>
  import ColorList from "../../static/variable";

  export default {
    data() {
      return {
        cardBackGround: "bg-red",
        isActive: true
      };
    },
    props: {
      infoArr: {
        type: Array,
        required: true
      },
      randomNum: {
        type: String,
        required: true
      }
    },
    mounted(){
      wx.showShareMenu()
    },
    computed: {
      getCardBackGroundColor(index) {
        console.log(index);
        return this.isActive ? 'bg-gradual-red' : ''
        // const colorList = ["red", "orange", "yellow", "olive"];
        // console.log(`bg-${colorList[index - 1]}`);
        // return `bg-gradual-${colorList[index]}`;
      }
    },
    methods: {
      test() {
        console.log("ColorList", ColorList);
      },
      shareToWeChat(item) {
        console.log("aaaa", item);
      },
      getCardBackGroundColor(index) {
        console.log(index);
        const colorList = ["red", "orange", "yellow", "olive"];
        console.log(`bg-${colorList[index - 1]}`);
        return `bg-${colorList[index]}`;
      },
      // getArrRandomNum(arr) {
      //   return arr[Math.floor(Math.random() * arr.length + 1) - 1];
      // },
      // randomCardBackGround() {
      //   let colorArr = [];
      //   ColorList.map((item) => {
      //     colorArr.push(item.name);
      //   });
      //   let color = this.getArrRandomNum(colorArr);
      //   console.log("ColorList", this.getArrRandomNum(colorArr));
      //   return this.cardBackGround = `bg-${color}`;
      // }
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
</style>
