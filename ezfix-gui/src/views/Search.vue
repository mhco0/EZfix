<template>
  <div>
    <h1>
      We think your house is your safe place, your fun place and your sanctuary.
      <span>Find people who can help you keep it clean</span>
    </h1>
    <ServiceProvider id="provider0" />
  </div>
</template>

<script>
// @ is an alias to /src
import ServiceProvider from "@/components/ServiceProvider.vue";
export default {
  name: "Search",
  components: {
    ServiceProvider,
  },
};
</script>

<style scoped>
#provider0 {
  position: absolute;
  left: 180px;
  top: 1067px;
}
span {
  color: #2178b7;
}
h1 {
  position: absolute;
  width: 1478px;
  height: 459px;
  left: 161px;
  top: 317px;
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: normal;
  font-size: 96px;
  line-height: 112px;
}
</style>
