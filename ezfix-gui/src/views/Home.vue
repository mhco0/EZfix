<template>
  <div class="home">
    <EvaluationForm service_provider_name="Flávio" service_id="1" />
  </div>
</template>

<script>
import EvaluationForm from "../components/EvaluationForm";

export default {
  name: "Home",
  components: {
    EvaluationForm,
  },
};
</script>