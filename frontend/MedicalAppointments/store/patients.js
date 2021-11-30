import axios from "axios";
const url = "http://localhost:8080/api";
const headers = { Accept: "application/json" };

//state
export const state = () => ({
  patients: [],
});

//getters
export const getters = {
  getPatients: (state) => state.patients,
};

//actions
export const actions = {
  async getPatients({ commit }) {
    const { data } = await this.$axios.get(url + "/patients");
    console.log(data);
    commit("setPatients", data);
  },
};

//mutations
export const mutations = {
  setPatients(state, patients) {
    console.log(patients);
    state.patients = patients;
  },
};
