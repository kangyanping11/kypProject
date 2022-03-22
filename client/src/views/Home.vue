<template>
  <div class="home">
    <div class="container">
      <span class="title"> 实习生在线管理系统欢迎您 </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
};
</script>

<style scoped>
.home {
  /* border: 1px solid blue; */
  width: 100%;
  height: 100%;
  background: url(../assets/showcase.png) no-repeat;
  background-size: 100% 100%;
  /* position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/showcase.png) no-repeat;
  background-size: 100% 100%; */
 
}
/* 生成固定定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 */
/* position: fixed;
    width: 100%;
    height: 100%;
    background-image: url('../assets/showcase.png'); 
    background-size: cover; */

.container {
   width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
  /* box-sizing: border-box;
  height: 100%;
  padding-top: 200px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white; */
}
.title {
  color: #fff;
  font-size: 30px;
}
</style>