import { createStore } from "vuex";

export default createStore({
  state: {
    isInvoiceModalOpen: false,
  },
  mutations: {
    TOGGLE_INVOICE_MODAL(state) {
      state.isInvoiceModalOpen = !state.isInvoiceModalOpen;
    },
  },
  actions: {},
  modules: {},
});
