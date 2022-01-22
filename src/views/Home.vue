<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";

import HomeHeader from "@/components/HomeHeader.vue";
import AppInvoiceItem from "@/components/AppInvoiceItem.vue";

export default {
  name: "Home",

  components: {
    HomeHeader,
    AppInvoiceItem,
  },

  setup() {
    const store = useStore();

    const state = reactive({
      filterValue: "",
    });

    function handleFilterChange(filterType) {
      state.filterValue = filterType;
    }

    return {
      invoiceList: computed(() => {
        return store.state.invoiceList.filter((invoice) => {
          if (state.filterValue === "Pending") {
            return invoice.invoicePending === true;
          }

          if (state.filterValue === "Paid") {
            return invoice.invoicePaid === true;
          }

          return invoice;
        });
      }),
      handleFilterChange,
    };
  },
};
</script>

<template>
  <div class="home container">
    <!-- Header -->
    <HomeHeader @onFilterInvoiceChange="handleFilterChange" />

    <!-- Invoices -->
    <div v-if="invoiceList.length">
      <AppInvoiceItem
        v-for="invoice in invoiceList"
        :invoice="invoice"
        :key="invoice.docId"
      />
    </div>

    <div class="empty flex flex-column" v-else>
      <img src="@/assets/illustration-empty.svg" alt="no invoices" />
      <h3>There is nothing here</h3>
      <p>
        Create a new invoice by clicking the New Invoice button and get started
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  color: #fff;
}

.empty {
  margin-top: 160px;
  align-items: center;

  img {
    width: 214px;
    height: 200px;
  }

  h3 {
    font-size: 20px;
    margin-top: 40px;
  }

  p {
    text-align: center;
    font-size: 12px;
    font-weight: 300;
    max-width: 224px;
    margin-top: 16px;
  }
}
</style>
