<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <footer class="footer">
      <div class="footer_copyright">
        &copy;{{ new Date().getFullYear() }} СГУВТ Tion
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import "/src/assets/styles/style.css";
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

</style>

<script>
import MainLayout from './layout/MainLayout'
import EmptyLayout from './layout/EmptyLayout'
export default {
  computed: {
    layout(){
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components:{
    EmptyLayout, MainLayout
  },

  // data: () => ({
  //   show: 'has-out',
  //   stat: false
  // }),
  // methods: {
  // async logout(){
  //    await this.$store.dispatch('logout')
  //    this.$router.push('/?message=logout')
  //  }
  // }
};

</script>