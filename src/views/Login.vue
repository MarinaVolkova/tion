<template>
<div class="log">
  <div class="login mainlogin">
    <section class="login">
      <form action="" method="POST" id="login_form" @submit.prevent="submitHander">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Логин</label>
          <input
            id="email"
            type="email"
            class="form-control"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
            aria-describedby="emailHelp"
          />
          <small
          v-if="($v.email.$dirty && !$v.email.required)"
          >Заполните поле Email!</small>
          <small
          v-else-if="($v.email.$dirty && !$v.email.email)"
          >Ошибка при заполнении поля Email!</small>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Пароль</label>
          <input
            id="password"
            type="password"
            class="form-control"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          />
             <small
          v-if="($v.password.$dirty && !$v.password.required)"
          >Заполните поле!</small>
          <small
          v-else-if="($v.password.$dirty && !$v.password.minLength)"
          >Пароль должен быть минимум {{$v.password.$params.minLength.min}} символов!</small>
        </div>
        <button type="submit" class="btn_logo">Войти</button>
      </form>
    </section>
  </div>
</div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data: ()=>({
    email:'',
    password:'',
  }),
  validations: {
    email:{email, required},
    password:{required, minLength: minLength(6)}
  },
  methods: {
   async submitHander() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData={
        email: this.email,
        password: this.password,
      }
      try{
        await this.$store.dispatch('login', formData)
        this.$router.push('/About')
      } catch(e) {
        alert('Ошибка при авторизации!')
      }
    }
  }
}
</script>

<style lang="scss">
@import "/src/assets/styles/style.css";
</style>