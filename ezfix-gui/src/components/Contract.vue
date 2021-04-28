<template>
  <v-container class="contract-border">
    <v-row>
      <v-col>
        <img :src="contract.avatar" :alt="contract.name" />
        <div>
          {{ contract.name }}
        </div>
      </v-col>
      <v-col>
        <div>Hired for: {{ contract.serviceCategory }}</div>
        <div v-if="contract.paymentOnline">Form of payment: Online</div>
        <div v-else>Form of payment: Personally</div>
        <div v-if="contract.paymentStatus">Payment Status: Paid</div>
        <div v-else>Payment Status: Pending</div>
      </v-col>
      <v-col>
        <div v-if="contract.paymentStatus">
          <v-btn rounded>Add a review</v-btn>
        </div>
        <div v-else>
          <div><v-btn rounded>See conversations</v-btn></div>
          <div><v-btn rounded>Pay now</v-btn></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Contract",
  props: {
    contract: Object,
  },
};
</script>

<style scoped>
.v-btn {
  background: #2178b7;
  color: black;
}

.contract-border {
  padding: 10px;
  margin-top: 1%;
  margin-bottom: 1%;
  outline-style: solid;
  outline-color: #2178b7;
  outline-width: 3px;
}

img {
  width: 25%;
  border-radius: 50%;
}
</style>