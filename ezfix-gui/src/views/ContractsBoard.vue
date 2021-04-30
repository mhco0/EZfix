<template>
  <div>
    <div id="contracts-board-title" class="contracts-title">
      Contracts board view:
    </div>
    <Contracts :contracts="contracts" @update-contracts="update_contracts" />
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
    update_contracts() {
      this.get_contracts_list(this.client_id).then((response) => {
        this.contracts = [];
        response.data.forEach((contract) => {
          this.contracts.unshift(contract);
        });
      });
    },
  },
  mounted() {
    this.update_contracts();
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