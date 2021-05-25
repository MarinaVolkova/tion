<template>
  <div class="header">
    <header class="header">
      <transition v-if="show == 'has-in'">
        <div class="overlay fade-in"></div>
      </transition>
      <transition v-else>
        <div class="overlay fade-out"></div>
      </transition>
      <nav class="container container--px flex flex-jc-sb flex-ai-c">
        <a href="#" class="header_logo"
          ><img src="../assets/images/logo.svg" alt="logo" />TION </a
        >
        <a id="btmHamburger" class="header_toggle hide-for-desktop">
          <transition name="fade" mode="out-in">
            <i
              class="material-icons menu"
              v-if="show == 'has-out'"
              @click="show = 'has-in'"
              key="menu"
              >menu</i
            >
            <i
              class="material-icons clear"
              v-else
              @click="show = 'has-out'"
              key="clear"
              >clear</i
            >
          </transition>
          <transition v-if="show == 'has-in'">
            <div class="header_menu has-in">
              <!-- <router-link to="/">Главная</router-link> -->
              <router-link to="/About">Посещаемость</router-link>
              <a href="http://www.ssuwt.ru/" target="_blank">Сайт СГУВТ</a>

              <a href="#" class=" " @click.prevent="logout">Выйти</a>
            </div>
          </transition>
          <transition v-else>
            <div class="header_menu has-out">
              <!-- <router-link to="/">Главная</router-link> -->
              <router-link to="/About">Посещаемость</router-link>
              <a href="http://www.ssuwt.ru/" target="_blank">Сайт СГУВТ</a>
              <a href="#" class="" @click.prevent="logout">Выйти</a>
            </div>
          </transition>
        </a>

        <div class="header_links hide-for-mobile">
          <!-- <router-link to="/">Главная</router-link> -->
          <router-link to="/About">Посещаемость</router-link>
          <a href="http://www.ssuwt.ru/" target="_blank">Сайт СГУВТ</a>                
 
        </div>         
        <a
          href="#"
          >Статус: {{status}}</a
        > 
        <a
          href="#"
          class="button header_cta hide-for-mobile"
          @click.prevent="logout"
          >Выйти</a
        > 

      </nav>
 
    </header>
      <router-view/>
  </div>
</template>

<script>
export default {
  name: "main-Layout",
  data: () => ({
    show: "has-out",
    stat: false,
    isOpen: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  computed: {
    status() {
      return this.$store.getters.info.status;
    }
  },
  methods: {
    async logout() {
      this.$router.push("/Login");
    },
  }
};
</script>