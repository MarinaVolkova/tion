<template>
  <div class="about">
    <form action="" method="POST" id="about_form" @submit.prevent="submitInfo">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Факультет</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="fuckulname"
          required
        >
          <option v-for="item in fuckul" :key="item.name">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="mb-3" v-if="fuckulname">
        <label for="exampleInputEmail1" class="form-label">Группа</label>
        <select
          class="form-select"
          aria-label="Default select example"
          required
          v-model.trim="groupname"
          @click="getgroup(fuckulname, groupname)"
        >
          <option
            v-for="item in group"
            v-if="item.fuckou == fuckulname"
            :key="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="mb-3" v-if="groupname">
        <label for="exampleInputEmail1" class="form-label">Предмет</label>
        <select
          v-model.trim="predname"
          class="form-select"
          aria-label="Default select example"
          required
        >
          <option v-for="item in pred" :key="item.name">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="mb-3" v-if="predname">
        <label class="form-label">Месяц</label>
        <select
          class="form-select"
          aria-label="Default select example"
          required
          v-model.trim="monthname"
        >
          <option v-for="item in month" :key="item">
            {{ item }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn_logo">Далее</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {},
  data: () => ({
    fuckul: [],
    fuckulname: "",
    group: [],
    groupname: "",
    pred: [],
    predname:'',
    month:[
   'Январь',
   'Февраль',
   'Март',
   'Апрель',
   'Май',
   'Июнь',
   'Июль',
   'Август',
   'Сентябрь',
   'Ноябрь',
   'Декабрь',
  ],
    monthname:''
  }),
  computed: {},
  methods: {
    makeGETRequest(url) {
      const API_URL =
        "https://raw.githubusercontent.com/MarinaVolkova/db/main/";
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${API_URL}${url}`);
        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(`Ошибка: [${xhr.status}] ${xhr.responseText}`);
          }
        });
        xhr.addEventListener("error", () => reject("Сетевая ошибка"));
        xhr.send();
      });
    },
    getgroup(fuckulname, stat) {
      this.pred = [];
      for (let item of this.group) {
        if (item.fuckou == fuckulname) {
          if (item.name == stat) {
            item.pred.forEach((elem) => this.pred.push(elem));
          }
        }
      }
    },
    submitInfo(){
       const formData={
        groupname: this.groupname,
        predname: this.predname,
        monthname:this.monthname
      }
       console.log(formData)
       this.$router.push('/table')
    }
  },
  watch: {},
  mounted() {
    this.makeGETRequest(`/fuckul.json`).then((fuckul) => {
      this.fuckul = fuckul;
      this.fuckul.forEach((element) =>
        element.group.forEach((item) => this.group.push(item))
      );
    });
  },
};
</script>

<style lang="scss">
@import "/src/assets/styles/style.css";
</style>;
