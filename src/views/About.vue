<template>
  <div class="about">
    <form id="about_form" @submit.prevent="submitInfo">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Факультет</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="fuckulname"
          v-bind:fuckul="fuckulname"
          required
        >
          <option v-for="item in fuckul" :value='item.name' :key="item.name">
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
            :value='item.name'
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
          <option v-for="item in pred" :value='item' :key="item.name">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="mb-3" v-if="predname">
        <label for="exampleInputEmail1" class="form-label">Тип занятий</label>
        <select
          v-model.trim="typeZan"
          class="form-select"
          aria-label="Default select example"
          required
        >
          <option v-for="item in zan" :value='item' :key="item.name">
            {{ item }}
          </option>
        </select>
      </div>
      <div class="mb-3" v-if="typeZan">
        <label class="form-label">Месяц</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="monthname"
          required
          
        >
          <option v-for="(item, index) in month" :value='index' :key="item">
            {{ item }}
          </option>
        </select>
        
      </div>
          <div class="mb-3" v-if="monthname !== undefined">
        <label class="form-label">Неделя</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="week"
          required
        >
          <option>
            1
          </option>
                    <option>
            2
          </option>
                    <option>
            3
          </option>
                    <option>
            4
          </option>
        </select>
      </div >
      <button type="submit" class="btn btn-outline-primary saveBott" style="margin-right: 20px">Далее</button>   
    </form> 
    <div class="addgr">
       <button class="btn btn-outline-primary saveBott" style="margin-top: 10px" v-if="status != 'Студент'" @click="redac">Добавить</button> 
    </div>
   
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      fuckul: [],
      fuckulname: "",
      group: [],
      groupname: "",
      pred: [],
      predname: "",
      zan:["Лекция","Практика","Лабораторная работа"],
      typeZan:"",
      month: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Ноябрь",
        "Декабрь",
      ],
      monthname: "",
      fioname:[],
      week:''
    };
  },
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
    redac(){
    localStorage.fuckulname = this.fuckulname;
    localStorage.groupname = this.groupname;
    localStorage.predname = this.predname;
    localStorage.monthname = this.monthname;
    localStorage.typeZan = this.typeZan;
    localStorage.week = this.week;
      this.$router.push("/Tablered");
    },
    submitInfo() {
    localStorage.fuckulname = this.fuckulname;
    localStorage.groupname = this.groupname;
    localStorage.predname = this.predname;
    localStorage.monthname = this.monthname;
    localStorage.typeZan = this.typeZan;
    localStorage.week = this.week;

    this.$router.push("/table");
    
   }
},
  mounted() {
    this.makeGETRequest(`/fuckul.json`).then((fuckul) => {
      this.fuckul = fuckul;
      this.fuckul.forEach((element) =>
        element.group.forEach((item) => this.group.push(item))
      );
    });
  },
   computed: {
    status() {
      return this.$store.getters.info.status;
    }
  },
};
</script>

<style lang="scss">
@import "/src/assets/styles/style.css";
</style>;
