<template>
  <div>
    <div :key="contract.id" v-for="contract in contracts">
      <Contract :contract="contract" />
    </div>
  </div>
</template>

<script>
import Contract from "../components/Contract";
export default {
  name: "Contracts",
  props: {
    contracts: Array,
  },
  components: {
    Contract,
  },
};
</script>