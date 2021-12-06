<template>
  <div class="max-w-7xl mx-auto">
    <Header />
    <div class="m-4">
      <p class="text-3xl text-indigo-700">Doctors</p>
    </div>
    <div class="m-4" v-if="areDoctors">
      <ul v-for="doctor in doctors" :key="doctor.email">
        <li>{{ doctor.firstName + " " + doctor.lastName }}</li>
      </ul>
    </div>
    <div v-if="!areDoctors">
      <p>There are no doctors :(</p>
    </div>
    <div class="m-4">
      <p class="text-3xl text-indigo-700">Add Doctors</p>
    </div>
    <div class="m-4">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-gray-700"
                    >First name</label
                  >
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    v-model="firstName"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <p>El mensaje es: {{ firstName }}</p>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="lastName"
                    class="block text-sm font-medium text-gray-700"
                    >Last name</label
                  >
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                    >Email address</label
                  >
                  <input
                    type="text"
                    name="email"
                    id="email"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Password</label
                  >
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Doctor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default Vue.extend({
  data: {
    areDoctors: false,
  },
  created() {
    this.$store.dispatch("doctors/getDoctors");
  },
  computed: {
    doctors() {
      return this.$store.getters["doctors/getDoctors"];
    },
  },
});
</script>

<style scoped></style>
