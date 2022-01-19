import { createStore } from "vuex";

export default createStore({
  state: {
    isInvoiceModalOpen: false,
    isModalOpen: false,
  },
  mutations: {
    TOGGLE_INVOICE_MODAL(state) {
      state.isInvoiceModalOpen = !state.isInvoiceModalOpen;
    },
    TOGGLE_MODAL(state) {
      state.isModalOpen = !state.isModalOpen;
    },
  },
  actions: {},
  modules: {},
});
