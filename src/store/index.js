import { createStore } from "vuex";
import { collection, getDocs } from "firebase/firestore";

import db from "@/firebase/firebaseInit";

export default createStore({
  state: {
    isInvoiceModalOpen: false,
    isModalOpen: false,
    invoiceList: [],
    invoicesLoaded: false,
  },
  mutations: {
    TOGGLE_INVOICE_MODAL(state) {
      state.isInvoiceModalOpen = !state.isInvoiceModalOpen;
    },
    TOGGLE_MODAL(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    UPDATE_INVOICE_LIST(state, payload) {
      state.invoiceList = payload;
    },
    UPDATE_INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
  },
  actions: {
    async GET_INVOICES({ commit, state }) {
      const invoices = [];

      try {
        const querySnapshot = await getDocs(collection(db, "invoices"));

        querySnapshot.forEach((doc) => {
          invoices.push({ docId: doc.id, ...doc.data() });
        });

        commit("UPDATE_INVOICE_LIST", invoices);
        commit("UPDATE_INVOICES_LOADED");
      } catch (err) {
        // if there is an error, reset invoiceList to its previous state
        commit("UPDATE_INVOICE_LIST", state.invoiceList);
      }
    },
  },
  modules: {},
});
