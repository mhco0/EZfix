<template>
  <v-container class="contract-border" id="contract-border">
    <Evaluation
      v-if="showEvaluation"
      :service_id="contract.id"
      :service_provider_name="contract.provider_name"
      :avatar_url="contract.provider_avatar_url"
      @close_EvaluationForm="toggleEvaluation"
    />
    <v-row align="end">
      <v-col cols="3" class="column1">
        <img
          :src="contract.provider_avatar_url"
          :alt="contract.provider_name"
        />
        <div id="provider-name">
          {{ contract.provider_name }}
        </div>
      </v-col>
      <v-col cols="4" class="column2">
        <div>Hired for: {{ contract.provider_category }}</div>
        <div v-if="contract.paymentOnline">Form of payment: Online</div>
        <div v-else>Form of payment: Personally</div>
        <div id="payment-status-paid" v-if="contract.paymentStatus">
          Payment Status: Paid
        </div>
        <div id="payment-status-pending" v-else>Payment Status: Pending</div>
      </v-col>
      <v-col cols="2" class="column3">
        <v-icon color="#2178b7" size="70" v-if="contract.paymentStatus"
          >fas fa-check</v-icon
        >
      </v-col>
      <v-col cols="3" class="column4">
        <v-row justify="end" class="ma-0">
          <div v-if="contract.paymentStatus">
            <v-btn
              color="primary black--text"
              rounded
              small
              @click="toggleEvaluation"
              v-if="!contract.has_evaluation"
              id="addreview-button"
              >Add a review</v-btn
            >
          </div>
          <div v-else>
            <div>
              <v-btn color="primary black--text" rounded small>See chat</v-btn>
            </div>
            <div style="margin-top: 10px">
              <v-btn
                id="pay-service-now"
                color="primary black--text"
                rounded
                small
                @click="call_payment_page"
                >Pay now</v-btn
              >
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Evaluation from "../components/EvaluationForm";
export default {
  name: "Contract",
  props: {
    contract: Object,
  },
  components: {
    Evaluation,
  },
  data() {
    return {
      showEvaluation: false,
    };
  },
  methods: {
    toggleEvaluation() {
      this.showEvaluation = !this.showEvaluation;

      if (!this.showEvaluation) {
        this.$emit("update-contracts");
      }
    },
    call_payment_page() {
      this.$router.push({
        path: `/payment/${this.contract.provider_id}/${this.contract.id}`,
      });
    },
  },
};
</script>

<style scoped>
.contract-border {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  outline-style: solid;
  outline-color: #2178b7;
  outline-width: 3px;
  text-align: center;
  font-weight: 600;
  min-width: 50vw;
  max-width: max-content;
}

img {
  width: 70px;
  border-radius: 50%;
}

.column1 {
  text-align: center;
}
.column2 {
  text-align: start;
}
.column3 {
  text-align: center;
  align-self: center;
}
.column4 {
  text-align: end;
}
</style>