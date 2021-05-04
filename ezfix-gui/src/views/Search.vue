<template>
  <div>
    <h1>
      We think your house is your safe place, your fun place and your sanctuary.
      <span>Find people who can help you keep it clean</span>
    </h1>
    <v-row id="rowID" justify="center">
      <ServiceProvider
        id="ServiceProviderCard07"
        :category="provider.category"
        :name="provider.first_name + ' ' + provider.last_name"
        :key="provider.id"
        :jobs="provider.jobs_number"
        :evaluation="provider.evaluations_average"
        :avatarURL="provider.avatar_url"
        v-for="provider in providersArr"
      />
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ServiceProvider from "@/components/ServiceProvider.vue";
import searchAPI from "../api/search";
export default {
  name: "Search",
  components: {
    ServiceProvider,
  },
  data() {
    return {
      providersArr: [],
    };
  },
  methods: {
    getProviders: searchAPI.getProviders,
  },
  mounted() {
    this.getProviders(this.$route.params.category).then((res) => {
      console.log(res.data);
      res.data.forEach((element) => {
        this.providersArr.push(element);
      });
    });
  },
};
</script>

<style scoped>
#rowID {
  position: absolute;
  top: 1067px;
  width: 100vw;
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
