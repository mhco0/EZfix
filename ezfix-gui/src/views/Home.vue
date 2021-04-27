<template>
  <div class="home">
    <EvaluationForm service_provider_name="Flávio" />
  </div>
</template>

<script>
import EvaluationForm from "./EvaluationForm";

export default {
  name: "Home",
  components: {
    EvaluationForm,
  },
};
</script>
