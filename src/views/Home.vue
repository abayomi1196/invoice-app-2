<script>
import HomeHeader from "@/components/HomeHeader.vue";

export default {
  name: "Home",

  components: {
    HomeHeader,
  },
};
</script>

<template>
  <div class="home container">
    <!-- Header -->
    <HomeHeader />
  </div>
</template>

<style lang="scss" scoped>
.home {
  color: #fff;
}
</style>
