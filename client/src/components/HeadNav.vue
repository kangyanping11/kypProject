<template>
  <div class="head-nav">
    <!-- 我是头部导航组件 -->
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt="" />
        <span class="title">实习生管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <!-- <img :src="user.avater" class="avatar" alt="" /> -->
          <div class="welcome">
            <!-- <p class="name comename">欢迎</p> -->
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown  trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Info">个人信息</el-dropdown-item>
                <el-dropdown-item command="out">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: "headNav",
  //    components:{}
  data() {
    return {};
  },
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  methods:{
    handleCommand(command){
      // console.log(command)
      switch(command){
        case "Info" :this.showInfoList();
        break;
        case "out" : this.out();
        break;
      }
    },
    showInfoList(){
      console.log('进个人信息页面');
      this.$router.push('/infoshow')
    },
    out(){
      console.log('退出登录');
      // 清除token
      localStorage.removeItem('eleToken');
      // 清除vuex存储的登录信息
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login")
    }
  }
};
</script>
<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  color: #fff;
  background-color: #324057;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo-container .logo {
  vertical-align: middle;
  height: 60px;
  width: 60px;
  display: inline-block;
  margin-right: 5px;
}
.title {
  font-size: 22px;
  font-family: "Microsoft YaHei";
  vertical-align: middle;
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  min-width: 400px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 12px;
}

.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>