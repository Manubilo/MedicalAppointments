import axios from "axios";
const url = "http://localhost:8080/api";
const headers = { Accept: "application/json" };

//state
export const state = () => ({
  patients: [],
});

//getters
export const getters = {
  getDoctors: (state) => state.doctors,
};

//actions
export const actions = {
  async getDoctors({ commit }) {
    const { data } = await this.$axios.get(url + "/doctors");
    console.log(data);
    commit("setDoctors", data);
  },
};

//mutations
export const mutations = {
  setPatients(state, doctors) {
    state.doctors = doctors;
  },
};
