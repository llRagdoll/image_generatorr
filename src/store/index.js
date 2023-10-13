import { createStore } from 'vuex';

const store = createStore({
    state: {
        choice: null,
      },
      mutations: {
        setChoice(state, newChoice) {
          state.choice = newChoice;
        },
      },
      actions: {
        updateChoice({ commit }, newChoice) {
          commit('setChoice', newChoice);
        },
      },
      getters: {
        getChoice: state => state.choice,
      },
});

export default store;