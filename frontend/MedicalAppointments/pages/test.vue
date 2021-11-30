<template>
  <div>Name: {{ fullName }} Message : {{ message }}</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      message: "Hello World",
      firstName: "Manuel",
      lastName: "Delgado",
    };
  },
  computed: {
    fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    },
  },
});
</script>

<style scoped></style>
