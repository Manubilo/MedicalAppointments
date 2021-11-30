<template>
  <div>
    <ul v-for="patient in patients" :key="patient.email">
      <li>{{ patient.firstName }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default Vue.extend({
  created() {
    this.$store.dispatch("patients/getPatients");
  },
  computed: {
    patients() {
      return this.$store.getters["patients/getPatients"];
    },
  },
});
</script>

<style scoped></style>
