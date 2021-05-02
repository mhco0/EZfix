<template>
  <div class="column">
    <v-btn width="200px" height="300px" class="ma-2" outlined color="#2178B7">
      <span class="dot"></span>
      <h3 id="provider">Provider Name</h3>
      <h3 id="jobs">N jobs</h3>
      <h3 id="rating">nota/5</h3>
    </v-btn>
  </div>
</template>

<style scoped>
.v-btn {
  position: relative;
}
#provider {
  position: absolute;
  top: 0px;
  align-content: center;
  color: #000000;
}
#jobs {
  position: absolute;
  top: 25px;
  align-content: center;
  color: #000000;
}
#rating {
  position: absolute;
  top: 50px;
  align-content: center;
  color: #000000;
}
.dot {
  position: absolute;
  height: 100px;
  width: 100px;
  top: -130px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}
</style>