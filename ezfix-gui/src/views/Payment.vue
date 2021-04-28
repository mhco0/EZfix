<template>
  <div>
    <div class="payment-title">Payment:</div>
    <CreditCardForm />
    <div class="or-text">or</div>
    <div class="pay-in-person">
      <p>
        You can <span>also pay later in person</span> and ask the the hired
        person to confirm the payment in the plataform
      </p>
      <center>
        <v-btn type="submit" color="primary" tile>Pay in person</v-btn>
      </center>
    </div>
  </div>
</template>

<script>
import CreditCardForm from "../components/CreditCardForm";
export default {
  name: "Payment",
  components: {
    CreditCardForm,
  },
};
</script>

<style scoped>
.v-btn {
  color: white;
  background: #2178b7;
}

.payment-title {
  padding-top: 65px;
  padding-left: 30px;
  font-weight: 400;
  font-size: 30px;
}

.pay-in-person {
  padding: 20px;
  align-content: center;
  margin-left: 790px;
  margin-top: -100px;
  position: absolute;
  width: 280px;

  background: #fafafa;
  border-radius: 30px;
}

.or-text {
  margin-left: 700px;
  margin-top: 200px;
  font-size: 23px;
}

span {
  color: #2178b7;
}
</style>