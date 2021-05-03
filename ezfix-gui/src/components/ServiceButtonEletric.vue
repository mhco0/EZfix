
<template>
  <div>
    <v-btn width="200px" height="200px" color="#2278B7" @click="callSearchPage">
      <v-icon size="180"> $houseCleanIcon </v-icon>
    </v-btn>
    <h6>Eletric Repair</h6>
  </div>
</template>


<style scoped>
.v-btn {
  border-radius: 30px;
  position: absolute;
  width: 274.5px;
  height: 289.5px;
  left: 843px;
  top: 1711px;
}
h6 {
  position: absolute;
  left: 888px;
  top: 1920px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #000000;
}
</style>

<script>
export default {
  methods: {
    callSearchPage() {
      this.$router.push({
        path: `/search/Eletric`,
      });
    },
  },
};
</script>

