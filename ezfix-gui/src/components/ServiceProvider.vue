<template>
  <div class="column">
    <v-btn width="200px" height="300px" class="ma-2" outlined color="#2178B7">
      <img :src="avatarURL" class="dot" />
      <h3 id="category">{{ category }}</h3>
      <h3 id="provider">{{ name }}</h3>
      <h3 id="jobs">{{ jobs }} jobs</h3>
      <h3 id="rating">{{ evaluation }}/5</h3>
    </v-btn>
  </div>
</template>

<style scoped>
div {
  margin-left: 3vw;
  margin-right: 3vw;
}
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
#category {
  position: absolute;
  top: 75px;
  align-content: center;
  color: #000000;
}
.dot {
  position: absolute;
  height: 100px;
  width: 100px;
  top: -130px;
  border-radius: 50%;
}
</style>

<script>
export default {
  props: {
    name: String,
    jobs: Number,
    evaluation: Number,
    avatarURL: String,
    category: String,
  },
};
</script>