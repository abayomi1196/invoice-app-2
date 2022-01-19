<script>
import { reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { uid } from "uid";
import { collection, addDoc } from "firebase/firestore";

import db from "@/firebase/firebaseInit.js";

export default {
  name: "Invoice Modal",
  setup() {
    const store = useStore();
    const state = reactive({
      billerStreetAddress: "",
      billerCity: "",
      billerZipCode: "",
      billerCountry: "",
      clientName: "",
      clientEmail: "",
      clientStreetAddress: "",
      clientCity: "",
      clientZipCode: "",
      clientCountry: "",
      invoiceDateUnix: "",
      invoiceDate: "",
      paymentTerms: "",
      paymentDueDateUnix: "",
      paymentDueDate: "",
      productDescription: "",
      invoicePending: false,
      invoiceDraft: false,
      invoiceItemList: [],
      invoiceTotal: 0,
    });

    const dateOptions = { year: "numeric", month: "short", day: "numeric" };

    function addNewInvoiceItem() {
      state.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    }

    function deleteInvoiceItem(id) {
      state.invoiceItemList = state.invoiceItemList.filter(
        (item) => item.id !== id
      );
    }

    function publishInvoice() {
      state.invoicePending = true;
    }

    function saveDraft() {
      state.invoiceDraft = true;
    }

    function calcInvoiceTotal() {
      state.invoiceTotal = 0;
      state.invoiceItemList.forEach((item) => {
        state.invoiceTotal += item.total;
      });
    }

    async function uploadInvoice() {
      if (state.invoiceItemList.length <= 0) {
        alert("Please ensure you've filled out work items");
        return;
      }
      calcInvoiceTotal();

      const invoiceCollectionRef = collection(db, "invoices");

      await addDoc(invoiceCollectionRef, {
        invoiceId: uid(6),
        ...state,
      });

      store.commit("TOGGLE_INVOICE_MODAL");
    }

    function handleSubmitForm() {
      uploadInvoice();
    }

    // get current date for invoice date field
    state.invoiceDateUnix = Date.now();
    state.invoiceDate = new Date(state.invoiceDateUnix).toLocaleDateString(
      "en-US",
      dateOptions
    );

    // update paymentDueDate based on changes to paymentTerms
    watch(
      () => state.paymentTerms,
      (paymentTerms) => {
        const futureDate = new Date();
        state.paymentDueDateUnix = futureDate.setDate(
          futureDate.getDate() + parseInt(paymentTerms)
        );
        state.paymentDueDate = new Date(
          state.paymentDueDateUnix
        ).toLocaleDateString("en-US", dateOptions);
      }
    );

    return {
      ...toRefs(state),
      addNewInvoiceItem,
      deleteInvoiceItem,
      publishInvoice,
      saveDraft,
      handleSubmitForm,
      closeInvoice: () => store.commit("TOGGLE_INVOICE_MODAL"),
    };
  },
};
</script>

<template>
  <div class="invoice-wrap flex flex-column">
    <form @submit.prevent="handleSubmitForm" class="invoice-content">
      <h1>New Invoice</h1>

      <!-- bill from section -->
      <div class="bill-from flex flex-column">
        <h4>Bill From</h4>

        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input
            type="text"
            required
            id="billerStreetAddress"
            v-model="billerStreetAddress"
          />
        </div>

        <!-- bill from - location details -->
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input type="text" required id="billerCity" v-model="billerCity" />
          </div>

          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input
              type="text"
              required
              id="billerZipCode"
              v-model="billerZipCode"
            />
          </div>

          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input
              type="text"
              required
              id="billerCountry"
              v-model="billerCountry"
            />
          </div>
        </div>
      </div>
      <!-- end of bill from -->

      <!-- bill to section -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>

        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input type="text" required id="clientName" v-model="clientName" />
        </div>

        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input type="text" required id="clientEmail" v-model="clientEmail" />
        </div>

        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input
            type="text"
            required
            id="clientStreetAddress"
            v-model="clientStreetAddress"
          />
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input type="text" required id="clientCity" v-model="clientCity" />
          </div>

          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input
              type="text"
              required
              id="clientZipCode"
              v-model="clientZipCode"
            />
          </div>

          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input
              type="text"
              required
              id="clientCountry"
              v-model="clientCountry"
            />
          </div>
        </div>
      </div>
      <!-- end of bill to section -->

      <!-- invoice work details -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input
              type="text"
              disabled
              id="invoiceDate"
              v-model="invoiceDate"
            />
          </div>

          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due Date</label>
            <input
              type="text"
              disabled
              id="paymentDueDate"
              v-model="paymentDueDate"
            />
          </div>
        </div>

        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select required id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 days</option>
            <option value="60">Net 60 days</option>
          </select>
        </div>

        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input
            type="text"
            required
            id="productDescription"
            v-model="productDescription"
          />
        </div>

        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <thead>
              <tr class="table-heading flex">
                <th class="item-name">Item Name</th>
                <th class="qty">Qty</th>
                <th class="price">Price</th>
                <th class="total">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr
                class="table-items flex"
                v-for="(item, idx) in invoiceItemList"
                :key="idx"
              >
                <td class="item-name">
                  <input type="text" v-model="item.itemName" />
                </td>
                <td class="qty">
                  <input type="number" v-model="item.qty" />
                </td>
                <td class="price">
                  <input type="text" v-model="item.price" />
                </td>
                <td class="total flex">
                  ${{ (item.total = item.price * item.qty) }}
                </td>

                <img
                  @click="deleteInvoiceItem(item.id)"
                  src="@/assets/icon-delete.svg"
                  alt="delete item"
                />
              </tr>
            </tbody>
          </table>

          <div @click="addNewInvoiceItem" class="flex button">
            <img src="@/assets/icon-plus.svg" alt="add item" />
            Add New Item
          </div>
        </div>
      </div>
      <!-- invoice work details -->

      <!-- save/exit buttons -->
      <div class="save flex">
        <div class="left">
          <button @click="closeInvoice" class="red">Cancel</button>
        </div>

        <div class="right flex">
          <button @click="saveDraft" class="dark-purple">Save Draft</button>

          <button @click="publishInvoice" class="purple">Create Invoice</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    left: 90px;
  }
}

.invoice-content {
  position: relative;
  padding: 56px;
  max-width: 700px;
  width: 100%;
  background-color: #141625;
  color: #fff;
  box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  h1 {
    margin-bottom: 48px;
  }

  h3 {
    margin-bottom: 16px;
    font-size: 18px;
    color: #777f98;
  }

  h4 {
    color: #7c5dfa;
    font-size: 12px;
    margin-bottom: 24px;
  }
}

.input {
  margin-bottom: 24px;

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }
}
input,
select {
  width: 100%;
  background-color: #1e2139;
  color: #fff;
  border-radius: 4px;
  padding: 12px 4px;
  border: none;

  &:focus {
    outline: none;
  }
}

.bill-to,
.bill-from {
  margin-bottom: 48px;

  .location-details {
    gap: 16px;

    div {
      flex: 1;
    }
  }
}

.invoice-work {
  .payment {
    gap: 24px;

    div {
      flex: 1;
    }
  }
}

table.item-list {
  width: 100%;

  .table-heading,
  .table-items {
    gap: 16px;
    font-size: 12px;

    .item-name {
      flex-basis: 50%;
    }

    .qty {
      flex-basis: 10%;
    }

    .price {
      flex-basis: 20%;
    }

    .total {
      flex-basis: 20%;
      align-self: center;
    }
  }

  .table-heading {
    margin-bottom: 16px;

    th {
      text-align: left;
    }
  }

  .table-items {
    position: relative;
    margin-bottom: 24px;

    img {
      position: absolute;
      top: 15px;
      right: 0;
      width: 12px;
      height: 16px;
      object-fit: cover;
      cursor: pointer;
    }
  }
}

.button {
  color: #fff;
  background-color: #252945;
  align-items: center;
  justify-content: center;
  width: 100%;

  img {
    margin-right: 4px;
  }
}

.save {
  margin-top: 60px;

  div {
    flex: 1;
  }
  .right {
    justify-content: flex-end;
  }
}
</style>
