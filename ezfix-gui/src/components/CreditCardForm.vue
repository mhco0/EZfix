<template>
  <form @submit="onSubmit" class="card-form">
    <div class="form-control">
      <label>Cardholder Name:</label>
      <input
        id="input-card-name"
        type="text"
        v-model="cardHolder"
        name="cardholder"
      />
    </div>
    <div class="form-control">
      <label>Card Number:</label>
      <input
        id="input-card-number"
        type="text"
        v-model="cardNumber"
        name="number"
      />
    </div>
    <div class="form-control-expiration">
      <label>Expiration Date:</label>
      <span class="expiration">
        <input
          id="input-card-expiration-month"
          type="text"
          name="month"
          v-model="expirationM"
          placeholder="MM"
          maxlength="2"
          size="2"
        />
        /
        <input
          id="input-card-expiration-year"
          type="text"
          name="year"
          v-model="expirationY"
          placeholder="YYYY"
          maxlength="4"
          size="4"
        />
      </span>
      <div class="form-control-expiration">
        <label class="cvv">CVV:</label>
        <input
          id="input-card-cvv"
          class="expiration"
          type="text"
          v-model="cvv"
          name="cvv"
          maxlength="3"
          size="3"
        />
      </div>
    </div>

    <div class="form-control form-control-check">
      <input
        id="input-save-card"
        type="checkbox"
        v-model="saveCard"
        name="save"
      />
      <label>save card</label>
      <v-btn id="confirm-payment-now" type="submit" color="primary" tile
        >Confirm now</v-btn
      >
    </div>
  </form>
</template>

<script>
export default {
  name: "AddTask",
  props: {
    savedCards: Array,
  },
  data() {
    return {
      cardNumber: "",
      expirationM: "",
      expirationY: "",
      cvv: "",
      cardHolder: "",
      saveCard: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.cardHolder) {
        alert("Please enter the cardholder name");
        return;
      }

      if (!this.cardNumber) {
        alert("Please enter the card number");
        return;
      }

      if (!this.expirationM) {
        alert("Please enter te expiration date");
        return;
      }

      if (!this.expirationY) {
        alert("Please enter te expiration date");
        return;
      }

      if (!this.cvv) {
        alert("Please enter the cvv");
        return;
      }

      const newCard = {
        cardNumber: this.cardNumber,
        expirationM: Number(this.expirationM),
        expirationY: Number(this.expirationY),
        cvv: this.cvv,
        cardHolder: this.cardHolder,
        saveCard: this.saveCard,
      };
      this.$emit("pay-with-card", newCard);
      //Rafactor this code to a new method clearForm
      this.cardNumber = "";
      this.expirationM = "";
      this.expirationY = "";
      this.cvv = "";
      this.cardHolder = "";
      this.saveCard = false;
    },
  },
};
</script>

<style scoped>
.v-btn {
  color: white;
  background: #2178b7;
}
.card-form {
  padding-top: 20px;
  padding-left: 100px;
  padding-right: 100px;
  margin-left: 30px;
  margin-top: 30px;
  position: absolute;
  width: 600px;

  background: #fafafa;
  border-radius: 30px;
}
.form-control {
  margin: 20px 0;
  color: #000000;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 400px;
  height: 30px;
  font-size: 17px;
  padding-left: 7px;
  background: white;
  border: 1px solid #000000;
  box-sizing: border-box;
}

.expiration {
  margin-left: 10px;
}
.form-control-expiration {
  margin: 20px 0;
  color: #000000;
}

.form-control-expiration input {
  font-size: 17px;
  padding-left: 7px;
  background: white;
  border: 1px solid #000000;
  box-sizing: border-box;
}
.form-control-check {
  display: flex;
}
.form-control-check label {
  flex: 10;
  color: #000000;
}
.form-control-check input[type="checkbox"] {
  flex: 1;
  height: 0;
  width: 0;
  position: relative;
  cursor: pointer;
}

.form-control-check input[type="checkbox"]:before {
  flex: 1;
  height: 15px;
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  border: 1px solid #707070;
  border-radius: 3px;
  background-color: white;
}

.form-control-check input[type="checkbox"]:checked:after {
  content: "";
  width: 5px;
  height: 10px;
  border: solid #2178b7;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 6px;
}
</style>