<template>
  <div>
    <div class="contracts-title">Contracts board view:</div>
    <Contracts :contracts="contracts" />
  </div>
</template>

<script>
import Contracts from "../components/Contracts";
export default {
  name: "ContractsBoard",
  components: {
    Contracts,
  },
  data() {
    return {
      contracts: [],
    };
  },
  created() {
    this.contracts = [
      {
        id: 1,
        serviceCategory: "House Cleaning",
        paymentStatus: false,
        paymentOnline: false,
        name: "Flávio Cap",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        id: 2,
        serviceCategory: "House Cleaning",
        paymentStatus: true,
        paymentOnline: true,
        name: "Barnabé Cap",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      {
        id: 3,
        serviceCategory: "House Cleaning",
        paymentStatus: true,
        paymentOnline: true,
        name: "Joana Cap",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      },
    ];
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