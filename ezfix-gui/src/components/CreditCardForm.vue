<template>
  <form @submit="onSubmit" class="card-form">
    <div class="form-control">
      <label>Card Number:</label>
      <input type="text" v-model="cardNumber" name="number" />
    </div>
    <div class="form-control">
      <label>Expiration Date:</label>
      <input type="text" v-model="expirationDate" name="expiration" />
    </div>
    <div class="form-control">
      <label>CVV:</label>
      <input type="text" v-model="cvv" name="cvv" />
    </div>
    <div class="form-control">
      <label>Cardholder Name:</label>
      <input type="text" v-model="cardHolder" name="cardholder" />
    </div>
    <div class="form-control form-control-check">
      <input type="checkbox" v-model="saveCard" name="save" />
      <label>save card</label>
      <v-btn type="submit" color="primary" tile>Confirm now</v-btn>
    </div>
  </form>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      cardHolder: "",
      saveCard: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.cardNumber) {
        alert("Please enter the card number");
        return;
      }

      if (!this.expirationDate) {
        alert("Please enter te expiration date");
        return;
      }

      if (!this.cvv) {
        alert("Please enter the cvv");
        return;
      }

      if (!this.cardHolder) {
        alert("Please enter the cardholder name");
        return;
      }

      const newCard = {
        cardNumber: this.cardNumber,
        expirationDate: this.expirationDate,
        cvv: this.cvv,
        cardHolder: this.cardHolder,
        saveCard: this.saveCard,
      };
      console.log("Save card:", this.saveCard);
      this.$emit("pay-with-card", newCard);
      this.cardNumber = "";
      this.expirationDate = "";
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