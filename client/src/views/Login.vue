<template>
  <div class="login">
    <!-- section -->
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">实习生管理系统</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        class="loginForm"
        ref="loginForm"
        label-width="80px"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="loginUser.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginUser.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="submit_btn"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>

        <div class="tiparea">
          <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  components: {},
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("success 登录!!");
          this.$axios.post("/api/users/login", this.loginUser).then((res) => {
            this.$message({
              message: "登录成功！",
              type: "success",
            });
            // console.log("登陆成功，拿到res,从res响应结果里面拿token",res)
            // es6 的解构赋值,因为res.data里面有token设个属性，使用直接
            const { token } = res.data;
            // console.log("从res里面拿token",token)
            // localStorage  sessionStorage
            localStorage.setItem("eleToken", token);
            // 解析token
            const decode = jwt_decode(token);
            // 把decode放入vuex里面
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode);
            // console.log("解析token后",decode)
            this.$router.push("/index");
          });
        } else {
          console.log("error 登录!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
  // beforeCreate(){console.log('login beforeCreate')},
  // created(){console.log('login created')},
  // beforeMount(){console.log('login beforeMount')},
  // mounted(){console.log('login mounted')},
  // beforeDestroy(){console.log('login beforeDestroy')},
  // destroyed(){console.log('login destroyed')},
};
</script>

<style scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(../assets/bg2.jpg);
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

/* .submit_btn {
  width: 100%;
} */
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
