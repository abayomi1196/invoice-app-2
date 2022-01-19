<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";

import AppNavigation from "@/components/AppNavigation.vue";
import AppInvoiceModal from "@/components/AppInvoiceModal.vue";

export default {
  name: "App",
  components: {
    AppNavigation,
    AppInvoiceModal,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      isMobile: false,
    });

    function checkScreen() {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 750) {
        state.isMobile = true;
        return;
      }
      state.isMobile = false;
    }

    // check the screen inner width on mounts, and update state accordingly
    onMounted(() => {
      checkScreen();
      window.addEventListener("resize", checkScreen);
    });

    return {
      ...toRefs(state),
      isInvoiceModalOpen: computed(() => store.state.isInvoiceModalOpen),
    };
  },
};
</script>

<template>
  <div>
    <div v-if="!isMobile" class="app flex">
      <AppNavigation />

      <div class="app-content flex flex-column">
        <router-view />

        <AppInvoiceModal v-if="isInvoiceModalOpen" />
      </div>
    </div>

    <div v-else class="mobile-message flex flex-column">
      <h2>Sorry, this app is not supported on mobile devices!</h2>
      <p>To use this app, please use a computer or tablet!</p>
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.app {
  background-color: #141625;
  min-height: 100vh;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
  }
}

.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141625;
  color: #fff;

  p {
    margin-top: 16px;
  }
}

.app-content {
  padding: 0 20px;
  flex: 1;
  position: relative;
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}

// utility classes
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling
.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }

  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }

  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }

  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }

  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
