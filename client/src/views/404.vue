<template>
    <div class="nofind">
        <img src="../assets/404.gif" alt="">
    </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default{
//    name:'404'
//    components:{}
}
</script>
<style scoped>
/* fixed absolute是需要写明宽高的*/
.nofind {
    position: fixed;
    width: 100%;
    height: 100%;
  
}
.nofind img {
    position:absolute;
    width: 100%;
    height: 100%;
}
</style>
