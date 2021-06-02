<template>
  <div class="table tableinfo">
    <div class="wrapInfotable">
      <p>Группа: {{ groupname }}</p>
      <p>Дисциплина: {{ predname }}</p>
      <p>Тип занятий: {{ typeZan }}</p>
    </div>
    <div class="wraptable">
    <table class="table table-striped table-hover table-fixed table-bordered">
     
      <thead>
        <tr class="tb">
          <th scope="col" class="fioname">Ф.И.О</th>
          <th scope="col" v-for="elem in this.tekgroup.pos[0].poss" :value='elem' ><span>{{(elem.data).split("-").reverse().join('.')}}</span></th>

        </tr>
      </thead>
     
      <tbody class="tablein">
        <tr v-for="(elem, index) in fioname" :value='elem'  class="fioname studfio">
          <td>{{elem}}</td>
          <td v-for="el in podb[index]" :value='el' >
            {{el.posstud}}
          </td>
         
            <tr>
              <td>Всего: {{fioname.length}} студентов <br>
                <span v-if="allpror.length != 0">Общее число пропусков: {{allpror.length}} </span>
              </td>
              <td v-for="elem in fullday" :value='elem'  ></td>
         
            </tr>
          </td>
        </tr>
        
      </tbody>
      <tfoot class="tbod">  
        <tr>
            <td scope="row" style="width:300px">
              <input type="text" class="search form-control" placeholder="Найти" title="Поле ввода" v-model="fio" @input="search()">
            </td>
            <td colspan="7">
              <button class="btn btn-outline-primary saveBott"  @click="gofiles()" v-if="status == 'Деканат'">Получить файлы</button>
              <button class="btn btn-outline-primary saveBott" style="margin: 0 10px" @click="gored()" v-if="status != 'Студент'">Редактировать</button>
              <button class="btn btn-outline-primary saveBott" @click="ex()">Назад</button>
            </td>
        </tr>
      </tfoot>
    </table><div id="files"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
var storage = firebase.app().storage("gs://tionssuwt.appspot.com/");

const intl = new Intl.NumberFormat("ru-RU");
export default {
  name: "tableinfo",
  props: {},
  data() {
    return {
      fuckulname: localStorage.fuckulname,
      groupname: localStorage.groupname,
      predname: localStorage.predname,
      monthname: localStorage.monthname,
      typeZan: localStorage.typeZan,
      fullday: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
      fioname: [],
      fio: "",
      pos: [],
      statuspos: ["", "О", "Б", "Н"],
      allpror: [],
      groupdb: [], //из бд
      tekgroup: [],
      podb: [],
    };
  },
  computed: {
    status() {
      return this.$store.getters.info.status;
    },
    groupsall() {
      return this.$store.getters.group;
    },
  },
  created() {},
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

    gofiles() {
      let files = [];
      let elem = document.getElementById("files");
      storage
        .ref(`${localStorage.groupname}`)
        .listAll()
        .then(function (result) {
          result.items.forEach(function (imageRef) {
            displayImage(imageRef);
          });
        })
        .catch(function (error) {
          // Handle any errors
        });
      function displayImage(imageRef) {
        imageRef
          .getDownloadURL()
          .then(function (url) {
            files.push(url);
            let a = document.createElement("a");
            a.innerHTML = `<a href=${url} download target="_blank">Файл</a>`;
            if (elem.childNodes.length <= files.length) {
              elem.appendChild(a);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    submitInfo() {
      this.fioname = [];
      this.makeGETRequest(`/${this.groupname}.json`).then((fio) => {
        fio.forEach((element) => {
          this.fioname.push(element.name);
        });
      });
      this.groupdb = Object.keys(this.groupsall).map((key) => ({
        ...this.groupsall[key],
        id: key,
      }));
    },
    search() {
      let enterValue = this.fio;
      let liElem = document.querySelectorAll(".fioname");

      if (enterValue != "") {
        liElem.forEach(function (element) {
          if (
            element.innerText.toLowerCase().search(enterValue.toLowerCase()) ==
            -1
          ) {
            element.classList.add("none");
          } else {
            element.classList.remove("none");
            let spanPl = element.firstChild;
            let pos = element.innerText
              .toLowerCase()
              .search(enterValue.toLowerCase());
            let len = enterValue.length;
            spanPl.innerHTML = marker(spanPl.innerText, pos, len);
          }
        });
      } else {
        liElem.forEach(function (element) {
          element.classList.remove("none");
          element.firstChild.innerHTML = element.firstChild.innerText;
        });
      }
    },
    gored() {
      this.$router.push("/Tablered");
    },
    trkgroup() {
      this.groupdb.forEach((element) => {
        if (
          element.predname == localStorage.predname &&
          element.typeZan == localStorage.typeZan &&
          element.week == localStorage.week
        ) {
          this.tekgroup = element;
        }
      });
      this.tekgroup.pos.forEach((elem) => {
        this.podb.push(elem.poss);
        elem.poss.forEach((el) => {
          if (el.posstud) {
            this.allpror.push(el.posstud);
          }
        });
      });
    },
    async ex() {
      this.$router.push("/About");
    },
  },
  mounted() {
    this.submitInfo();
    this.trkgroup();
  },
};

function marker(str, pos, len) {
  return (
    str.slice(0, pos) +
    "<mark>" +
    str.slice(pos, pos + len) +
    "</mark>" +
    str.slice(pos + len)
  );
}
</script>