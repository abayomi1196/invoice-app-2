<script>
import { reactive, toRefs } from "vue";

export default {
  name: "HomeHeader",

  setup() {
    const state = reactive({
      showFilterMenu: false,
      toggleStatus: "Filter by status",
    });

    function toggleFilterMenu() {
      state.showFilterMenu = !state.showFilterMenu;
    }

    function toggleNewInvoice() {}

    return {
      ...toRefs(state),
      toggleFilterMenu,
      toggleNewInvoice,
    };
  },
};
</script>

<template>
  <div class="header flex">
    <!-- LHS -->
    <div class="left flex flex-column">
      <h1>Invoices</h1>
      <span>There are 3 total invoices</span>
    </div>

    <!-- RHS -->
    <div class="right flex">
      <div class="filter flex" @click="toggleFilterMenu">
        <span>{{ toggleStatus }}</span>

        <img src="@/assets/icon-arrow-down.svg" alt="modal icon" />

        <ul v-if="showFilterMenu" class="filter-menu">
          <li>Draft</li>
          <li>Pending</li>
          <li>Paid</li>
          <li>Clear filter</li>
        </ul>
      </div>

      <div class="button flex" @click="toggleNewInvoice">
        <div class="inner-button flex">
          <img src="@/assets/icon-plus.svg" alt="add icon" />
        </div>
        <span>New Invoice</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  margin-bottom: 65px;

  .left,
  .right {
    flex: 1;
  }
}

.right {
  justify-content: flex-end;
  align-items: center;

  .button,
  .filter {
    align-items: center;

    span {
      font-size: 12px;
    }
  }
}

.filter {
  position: relative;
  margin-right: 40px;
  cursor: pointer;

  span,
  img {
    user-select: none;
  }

  img {
    margin-left: 12px;
    width: 9px;
    height: 5px;
  }

  .filter-menu {
    width: 120px;
    position: absolute;
    top: 25px;
    list-style: none;
    background-color: #1e2139;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    li {
      cursor: pointer;
      font-size: 12px;
      padding: 10px 20px;

      &:hover {
        color: #1e2139;
        background-color: #fff;
      }
    }
  }
}

.button {
  padding: 8px 10px;
  background-color: #7c5dfa;
  border-radius: 40px;

  .inner-button {
    margin-right: 8px;
    border-radius: 50%;
    padding: 8px;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    img {
      width: 10px;
      height: 10px;
    }
  }
}
</style>
