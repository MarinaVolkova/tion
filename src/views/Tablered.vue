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
          <th scope="col" v-for="elem in this.tekgroup.pos[0].poss" :value='elem'><input type="date" class="form-control datatr" :value='(elem.data)'></input></th>
      
        </tr>
      </thead>
     
      <tbody class="tablein">
        <tr v-for="(elem, index) in fioname" :value='elem' class="fioname studfio">
          <td>{{elem}}</td>
          <td v-for="(el, ind) in podb[index]" :value='el'>
            <select 
             
              class="statuspos"
              required>
              <option selected="selected" >
                {{el.posstud}}
              </option>
              <option v-for="item in statuspos" :value='item' :key="item">
               {{ item }}
              </option>
          </select>
       
          </td>
        
            <tr>
              <td>Всего: {{fioname.length}} студентов <br>
                <span v-if="allpror.length != 0">Общее число пропусков: {{allpror.length}} </span>
              </td>
                              <td>
                  <div class="form-check form-switch" v-if="status == 'Деканат' || status == 'Преподаватель'">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="checkbox0">
                      
                  </div>
                </td>
                              <td>
                  <div class="form-check form-switch" v-if="status == 'Деканат' || status == 'Преподаватель'">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="checkbox1">
                  </div>
                </td>
                              <td>
                  <div class="form-check form-switch" v-if="status == 'Деканат' || status == 'Преподаватель'">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="checkbox2">
                  </div>
                </td>
                              <td>
                  <div class="form-check form-switch" v-if="status == 'Деканат' || status == 'Преподаватель'">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="checkbox3">
                  </div>
                </td>
                              <td>
                  <div class="form-check form-switch" v-if="status == 'Деканат' || status == 'Преподаватель'">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="checkbox4">
                  </div>
                </td>
                              <td>
                  <div class="form-check form-switch" v-if="status == 'Деканат' || status == 'Преподаватель'">
                      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="checkbox5">
                  </div>
                </td>
            
            </tr>
          </td>
        </tr>
        
      </tbody>
      <tfoot v-if="status != 'Студент'" class="tbod">
        <tr>
            <td scope="row" >
              <input type="text" class="search form-control" placeholder="Найти" title="Поле ввода" v-model="fio" @input="search()">
            </td>
            <td colspan="5">
                <input style="width: 300px" type="file" multiple accept="image/jpeg" @change="detectFiles($event.target.files)"><span class="badge bg-primary" v-if="flag">Успешно!</span>
            </td>
           
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
import firebase from 'firebase/app'
var storage = firebase.app().storage("gs://tionssuwt.appspot.com/");
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
      groupdb: [], //из бд
      tekgroup: [],
      podb: [],
      sost: true,
      file: File,
      uploadTask: '',
      flag:false,
      checkbox0: "",
      checkbox1: "",
      checkbox2: "",
      checkbox3: "",
      checkbox4: "",
      checkbox5: "",
      chek: [
        this.checkbox0,
        this.checkbox1,
        this.checkbox2,
        this.checkbox3,
        this.checkbox4,
        this.checkbox5,
      ],
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
 detectFiles (fileList) {
      Array.from(Array(fileList.length).keys()).map( x => {
        this.upload(fileList[x])
      })
    },
  upload(file) {
      this.uploadTask = storage
        .ref(`${localStorage.groupname}`)
        .child(file.name)
        .put(file)
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
      this.$router.push("/table");
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
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      }, 
      null, 
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.$emit('url', downloadURL)
          this.flag = true
        })
      })
    }
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