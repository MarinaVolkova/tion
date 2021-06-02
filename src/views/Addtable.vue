<template>
  <div class="table tableinfo">

    <div class="wrapInfotable">
      <p>Группа: {{ groupname }}</p>
      <p>Дисциплина: {{ predname }}</p>
      <p>Тип занятий: {{ typeZan }}</p>
    </div>
    <div class="wraptable">
    <table class="table table-striped table-hover table-fixed">

      <thead>
        <tr class="tb">
          <th scope="col" class="fioname">Ф.И.О</th>
          <th scope="col" v-for="elem in fullday" :value='elem'><input type="date" class="form-control datatr"></input></th>
          <th></th>
        </tr>
      </thead>
     
      <tbody class="tablein">
        <tr v-for="(elem, index) in fioname" :value='elem' class="fioname studfio">
          <td>{{elem}}</td>
          <td v-for="el in fullday" :value='el'>
            <select 
              class="statuspos"
              required>
              <option v-for="item in statuspos" :value='item' :key="item" >
               {{ item }}
              </option>
          </select>
          </td>
          <td></td>
            <tr>
              <td>Всего: {{fioname.length}} студентов <br>
                <span v-if="allpror.length != 0">Общее число пропусков: {{allpror.length}} </span>
              </td>
              <td v-for="elem in fullday" :value='elem' :key="elem" >
                  <div class="form-check form-switch" v-if="status == 'Деканат' || status == 'Преподаватель'">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                  </div>
                </td>
              <td></td>
            </tr>
          </td>
        </tr>
        
      </tbody>
       <tfoot v-if="status != 'Студент'" class="tbod">
        <tr>
            <td scope="row" >
              <input type="text" class="search form-control" placeholder="Найти" title="Поле ввода" v-model="fio" @input="search()">
            </td>
            <td colspan="4">
                
            </td>
            <td></td>
            <td>
                
                <button class="btn btn-outline-primary saveBott"  @click="rec" >Готово</button> 
            </td>
     
        
        </tr>
      </tfoot>
    </table>
    </div>
  </div>
</template>

<script>
const intl = new Intl.NumberFormat("ru-RU");
export default {
  name: "tablereg",
  props: {},
  data() {
    return {
      fuckulname: localStorage.fuckulname,
      groupname: localStorage.groupname,
      predname: localStorage.predname,
      monthname: localStorage.monthname,
      typeZan: localStorage.typeZan,
      week: localStorage.week,
      fullday: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
      fioname: [],
      fio: "",
      pos: [],
      statuspos: ["", "О", "Б", "Н"],
      allpror: [],
      elembd: {},
      file: [],
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
    save() {
      this.pos = [];
      this.allpror = [];
      let i = 0;
      let j = 0;
      let p = -1;
      document.querySelectorAll(".studfio").forEach((element, index) => {
        if (element.attributes[0].nodeValue == this.fioname[index]) {
          this.pos.push({
            name: element.attributes[0].nodeValue,
            poss: [],
          });
        }
        element.childNodes.forEach((elem) => {
          elem.childNodes.forEach((el, ind) => {
            if (i < 7) {
              if (!el.data) {
                this.pos[j].poss.push({
                  posstud: el.value,
                  data: document.querySelectorAll(".datatr")[p].value
                    ? document.querySelectorAll(".datatr")[p].value
                    : "data",
                });
              }
            } else if (i == 7) {
              i = 0;
              j++;
              p = -1;
            }
            i++;
            p++;
            if (!el.data && el.value && el.value != "О") {
              this.allpror.push(el.value);
            }
          });
        });
      });
      let gr = this.$store.getters.group;
      let key = [];
      for (let elem in gr) {
        key.push(elem);
      }

      for (let ii = 0; ii < key.length; ii++) {
        if (
          localStorage.predname == gr[key[ii]].predname &&
          localStorage.typeZan == gr[key[ii]].typeZan &&
          localStorage.monthname == gr[key[ii]].monthname &&
          localStorage.week == gr[key[ii]].week
        ) {
          this.elembd = {
            id: key[ii],
            groupname: this.groupname,
            monthname: this.monthname,
            pos: this.pos,
            predname: this.predname,
            typeZan: this.typeZan,
            week: this.week,
      
          };
        } else {
          continue;
        }
      }
      gr[Symbol.iterator] = function () {
        return {
          current: this.from,
          last: this.to,
          next() {
            if (this.current <= this.last) {
              return { done: false, value: this.current++ };
            } else {
              return { done: true };
            }
          },
        };
      };
      this.$router.push("/About");
    },
    async rec() {
      try {
        this.save();
        await this.$store.dispatch("updatee", this.elembd);
      } catch (e) {
        throw e;
      }
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
  },
  mounted() {
    this.submitInfo();
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