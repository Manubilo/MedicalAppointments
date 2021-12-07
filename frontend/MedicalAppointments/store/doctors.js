import axios from "axios";
const url = "http://localhost:8080/api";
const headers = { Accept: "application/json" };

//state
export const state = () => ({
  doctors: [],
});

//getters
export const getters = {
  getDoctors: (state) => state.doctors,
};

//actions
export const actions = {
  async getDoctors({ commit }) {
    const { data } = await this.$axios.get(url + "/doctors");
    commit("setDoctors", data);
  },
  async addDoctor({ commit }, payload) {
    console.log("payload = ", payload);
    axios.post(url + "/doctors", payload).then((result) => {
      console.log(result);
    });
  },
};

//mutations
export const mutations = {
  setDoctors(state, doctors) {
    state.doctors = doctors;
  },
};
