<template>
  <div>
    <div class="contracts-title">Contracts board view:</div>
    <Contracts :contracts="contracts" />
  </div>
</template>

<script>
import Contracts from "../components/Contracts";
import service_api from "../api/services";
export default {
  name: "ContractsBoard",
  components: {
    Contracts,
  },
  data() {
    return {
      contracts: [],
      client_id: 1,
    };
  },
  methods: {
    get_contracts_list: service_api.get_contracts_list,
  },
  mounted() {
    this.get_contracts_list(this.client_id).then((response) => {
      response.data.contracts.forEach((contract) => {
        this.contracts.unshift(contract);
      });
    });
  },
};
</script>

<style scoped>
.contracts-title {
  padding-top: 3%;
  padding-left: 3%;
  font-weight: 500;
  font-size: 40px;
}
</style>