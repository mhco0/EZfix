<template>
  <div class="home">
    <img src="../assets/electrician.png" alt="" />
    <MainHomeText />
    <GetStarted />
    <ServiceButtonHouse />
    <ServiceButtonEletric />
    <ServiceButtonPlumbing />
  </div>
</template>

<script>
// @ is an alias to /src
import MainHomeText from "@/components/MainHomeText.vue";
import GetStarted from "@/components/GetStarted.vue";
import ServiceButtonHouse from "@/components/ServiceButtonHouse.vue";
import ServiceButtonEletric from "@/components/ServiceButtonEletric.vue";
import ServiceButtonPlumbing from "@/components/ServiceButtonPlumbing.vue";
export default {
  name: "Home",
  components: {
    MainHomeText,
    GetStarted,
    ServiceButtonHouse,
    ServiceButtonEletric,
    ServiceButtonPlumbing,
  },
};
</script>

<style scoped>
img {
  position: absolute;
  width: 1280px;
  height: 851.33px;
  left: 624px;
  top: 331px;
  border-radius: 46px;
  opacity: 0.7;
}
</style>
