<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "Single Invoice View",
  setup() {
    const store = useStore();
    const route = useRoute();

    return {
      currentInvoiceItem: computed(() =>
        store.state.invoiceList.find(
          (invoice) => invoice.invoiceId === route.params.invoiceId
        )
      ),
    };
  },
};
</script>

<template>
  <div class="invoice-view container" v-if="currentInvoiceItem">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="back img" /> Go Back
    </router-link>

    <!-- header section -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>

        <div
          class="status-button flex"
          :class="{
            paid: currentInvoiceItem.invoicePaid,
            draft: currentInvoiceItem.invoiceDraft,
            pending: currentInvoiceItem.invoicePending,
          }"
        >
          <span v-if="currentInvoiceItem.invoicePaid">Paid</span>
          <span v-if="currentInvoiceItem.invoiceDraft">Draft</span>
          <span v-if="currentInvoiceItem.invoicePending">Pending</span>
        </div>
      </div>

      <div class="right flex">
        <button
          @click="toggleEditInvoice(currentInvoiceItem.docId)"
          class="dark-purple"
        >
          Edit
        </button>

        <button @click="deleteInvoice(currentInvoiceItem.docId)" class="red">
          Delete
        </button>

        <button
          v-show="currentInvoiceItem.invoicePending"
          @click="updateStatusToPaid(currentInvoiceItem.docId)"
          class="green"
        >
          Mark as Paid
        </button>

        <button
          v-show="
            currentInvoiceItem.invoiceDraft || currentInvoiceItem.invoicePaid
          "
          @click="updateStatusToPending(currentInvoiceItem.docId)"
          class="orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- invoice details -->
    <div class="invoice-details flex flex-column">
      <!-- top section -->
      <section class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoiceItem.invoiceId }}</p>
          <p>{{ currentInvoiceItem.productDescription }}</p>
        </div>

        <div class="right flex flex-column">
          <p>{{ currentInvoiceItem.billerStreetAddress }}</p>
          <p>{{ currentInvoiceItem.billerCity }}</p>
          <p>{{ currentInvoiceItem.billerZipCode }}</p>
          <p>{{ currentInvoiceItem.billerCountry }}</p>
        </div>
      </section>

      <!-- middle section -->
      <section class="middle flex">
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>{{ currentInvoiceItem.invoiceDate }}</p>

          <h4>Payment Date</h4>
          <p>{{ currentInvoiceItem.paymentDueDate }}</p>
        </div>

        <div class="bill flex flex-column">
          <h4>Bill To</h4>

          <p>{{ currentInvoiceItem.clientName }}</p>
          <p>{{ currentInvoiceItem.clientStreetAddress }}</p>
          <p>{{ currentInvoiceItem.clientCity }}</p>
          <p>{{ currentInvoiceItem.clientZipCode }}</p>
          <p>{{ currentInvoiceItem.clientCountry }}</p>
        </div>

        <div class="send-to flex flex-column">
          <h4>Sent to</h4>
          <p>{{ currentInvoiceItem.clientEmail }}</p>
        </div>
      </section>

      <!-- bottom section -->
      <section class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>

          <div
            class="item flex"
            v-for="(item, idx) in currentInvoiceItem.invoiceItemList"
            :key="idx"
          >
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>

        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentInvoiceItem.invoiceTotal }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-link {
  margin-bottom: 32px;
  align-items: center;
  color: #fff;
  font-size: 12px;

  img {
    margin-right: 16px;
    width: 7px;
    height: 7px;
  }
}

.header,
.invoice-details {
  background-color: #1e2139;
  border-radius: 20px;
}

.header {
  align-items: center;
  padding: 24px 32px;
  font-size: 12px;

  .left {
    align-items: center;

    span {
      color: #dfe3fa;
      margin-right: 16px;
    }
  }

  .right {
    flex: 1;
    justify-content: flex-end;

    button {
      color: #fff;
    }
  }
}

.invoice-details {
  padding: 48px;
  margin-top: 24px;

  .top {
    div {
      color: #dfe3fa;
      flex: 1;
    }

    .left {
      font-size: 12px;

      p:first-child {
        font-size: 24px;
        text-transform: uppercase;
        color: #fff;
        margin-bottom: 8px;
      }

      p:nth-child(2) {
        font-size: 16px;
      }

      span {
        color: #888eb0;
      }
    }

    .right {
      font-size: 12px;
      align-items: flex-end;
    }
  }

  .middle {
    margin-top: 50px;
    color: #dfe3fa;
    gap: 16px;

    h4 {
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 12px;
    }

    p {
      font-size: 16px;
    }

    .bill,
    .payment {
      flex: 1;
    }

    .payment {
      h4:nth-child(3) {
        margin-top: 32px;
      }

      p {
        font-weight: 600;
      }
    }

    .bill {
      p:nth-child(2) {
        font-size: 16px;
      }

      p:nth-child(3) {
        margin-top: auto;
      }

      p {
        font-size: 12px;
      }
    }

    .send-to {
      flex: 2;
    }
  }

  .bottom {
    margin-top: 50px;

    .billing-items {
      padding: 32px;
      border-radius: 20px 20px 0 0;
      background-color: #252945;

      .heading {
        color: #dfe3fa;
        font-size: 12px;
        margin-bottom: 32px;

        p:first-child {
          flex: 2;
          text-align: left;
        }

        p {
          flex: 1;
          text-align: right;
        }
      }

      .item {
        margin-bottom: 32px;
        font-size: 13px;
        color: #fff;

        &:last-child {
          margin-bottom: 0;
        }

        p:first-child {
          flex: 2;
          text-align: left;
        }

        p {
          flex: 1;
          text-align: right;
        }
      }
    }

    .total {
      color: #fff;
      padding: 32px;
      background-color: rgba(12, 14, 22, 0.7);
      align-items: center;
      border-radius: 0 0 20px 20px;

      p {
        flex: 1;
        font-size: 12px;

        &:nth-child(2) {
          font-size: 24px;
          text-align: right;
        }
      }
    }
  }
}
</style>
