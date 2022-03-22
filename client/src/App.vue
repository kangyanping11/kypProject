<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/register">register</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
import jwt_decode from "jwt-decode";
// // 每次页面刷新，根组件App.vue都会被重新构建
export default {
  created() {
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken);
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
// beforeCreate(){console.log('APP beforeCreate')},
// created(){console.log('APP created')},
// beforeMount(){console.log('App beforeMount')},
// mounted(){console.log('APP mounted')},
// beforeDestroy(){console.log('APP beforeDestroy')},
// destroyed(){console.log('APP destroyed')},

}

</script>


<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
