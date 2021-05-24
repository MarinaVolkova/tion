<template>
<div class="log">
  <div class="login mainlogin">
    <section class="login">
      <form action="" method="POST" id="login_form" @submit.prevent="registr">
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
          <div class="mb-3">
          <label class="form-label">Статус</label>
          <select
          id="status"
          class="form-select"
          aria-label="Default select example"
          required
          v-model.trim="resultstatus"
        >
          <option v-for="item in status" :key="item">
            {{ item }}
          </option>
        </select>
        </div>
        <button type="submit" class="btn_logo">Зарегистрировать</button>
      </form>
    </section>
  </div>
</div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'registr',
  data: ()=>({
    email:'',
    password:'',
    status:["Староста","Преподаватель","Деканат"],
    resultstatus:''
  }),
  validations: {
    email:{email, required},
    password:{required, minLength: minLength(6)}
  },
  methods: {
   async registr() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData={
        email: this.email,
        password: this.password,
        resultstatus:this.resultstatus
      }
      try{
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch(e) {
        alert('Ошибка при регистрации!')
      }
      
    }
  }
}
</script>

<style lang="scss">
@import "/src/assets/styles/style.css";
</style>