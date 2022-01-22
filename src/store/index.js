import { createStore } from "vuex";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

import db from "@/firebase/firebaseInit";

export default createStore({
  state: {
    isInvoiceModalOpen: false,
    isModalOpen: false,
    invoiceList: [],
    invoicesLoaded: false,
    isEditInvoice: false,
    selectedInvoice: null,
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
    TOGGLE_EDIT_INVOICE(state) {
      state.isEditInvoice = !state.isEditInvoice;
    },
    SET_SELECTED_INVOICE(state, payload) {
      state.selectedInvoice = payload;
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
    async UPDATE_INVOICE({ dispatch, state }, invoiceData) {
      const collectionRef = collection(db, "invoices");

      const invoiceRef = doc(collectionRef, state.selectedInvoice.docId);

      await updateDoc(invoiceRef, invoiceData);

      await dispatch("GET_INVOICES");
    },
  },
  modules: {},
});
