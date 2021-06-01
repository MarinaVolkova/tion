<template>
  <div class="reggroup" v-if="status == 'Деканат'">
    <form id="about_form" @submit.prevent="submitInfo">
      <div class="mb-3">
        <span for="exampleInputEmail1" class="form-label">Факультет</span>
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
      <div class="mb-3">
        <span for="exampleInputEmail1" class="form-label">Группа</span>
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
      <div class="mb-3" >
        <span for="exampleInputEmail1" class="form-label">Предмет</span>
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
      <div class="mb-3">
        <span for="exampleInputEmail1" class="form-label">Тип занятий</span>
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
      <div class="mb-3" >
        <span class="form-label">Месяц</span>
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
      <div class="mb-3" >
        <span class="form-label">Неделя</span>
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
      </div>
      <div class="mb-3">
        <span class="form-label">Посещаемость</span>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="pos"
          required
          
        >
          <option>
           Учитывается
          </option>
        </select>
      </div>
      <!-- <div class="mb-3" >
        <span class="form-label">Возможность прикрепления файлов</span>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="file"
          required
          
        >
          <option>
        Да
          </option>
                 <option>
        Нет
          </option>
        </select>
      </div> -->
      <button type="submit" class="btn btn-outline-primary saveBott" >Далее</button>
    </form>
  </div>
</template>

<script>

export default {
  name: "reggroup",
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
      pos:[],
      week:'',
      file:''
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
   async submitInfo() {
     try{
     const group = await this.$store.dispatch(`createGroup`,{
       groupname:this.groupname,
       predname:this.predname,
       typeZan:this.typeZan,
       monthname:this.monthname,
       pos:this.pos,
       week:this.week,

     })
     }catch(e){

     }
   
    //  this.$router.push("/table");
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
