<template>
  <div class="header">
    <header class="header">
      <!-- <transition v-if="show == 'has-in'">
        <div class="overlay fade-in"></div>
      </transition>
      <transition v-else>
        <div class="overlay fade-out"></div>
      </transition> -->
      <nav class="container container--px flex flex-jc-sb flex-ai-c">
        <a href="/" class="header_logo"
          ><img src="../assets/images/logo.svg" alt="logo" />TION</a
        >
        <a href="/Login">Войти</a>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>

export default {
  computed: {
    error() {
    return this.$store.getters.error;
    }
  },
  watch: {
    error(fbError) {
      console.log("Ошибка:(");
    }
  }
};
</script>
