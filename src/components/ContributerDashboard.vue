<template>
  <md-app>
    <md-app-toolbar class="md-primary app-bar">
      <span class="md-title">Assignment - Contributer Login</span>
    </md-app-toolbar>

    <md-app-content class="content-div">
      <div class="main-div">
        <md-card class="left-div">
          <md-card-content>
            <md-list>
              <md-list-item
                :class="{ selectedMenu: selected == 'first' ? true : false }"
                @click="btnClick('first')"
              >
                <span class="md-list-item-text">Upload Image</span>
              </md-list-item>

              <md-list-item
                :class="{ selectedMenu: selected == 'second' ? true : false }"
                @click="btnClick('second')"
              >
                <span class="md-list-item-text">Download Report</span>
              </md-list-item>
            </md-list>
          </md-card-content>
        </md-card>

        <md-card
          v-if="this.selected == 'first' ? true : false"
          class="right-div"
          style="overflow: hidden"
        >
          <div class="right-div-header">Upload Image</div>
          <div class="sub-div">
            <div class="text-div">
              <label class="label">Image Name</label>
              <input
                class="input-field"
                type="text"
                name="imgName"
                id="imgName"
                v-model="form.imgName"
              />
            </div>
            <div class="text-div">
              <label class="label">Image</label>
              <div class="img-choose-div">
                <input
                  disabled
                  type="text"
                  aria-readonly="true"
                  class="input-field"
                  style="width: 86%"
                  v-model="form.imgFile"
                />
                <div class="input-group-btn">
                  <span class="fileUpload btn btn-success">
                    <span class="upl" id="upload">Choose file</span>
                    <input
                      type="file"
                      class="upload up input-field"
                      name="img"
                      id="img"
                      multiple="multiple"
                      @change="uploadImage($event)"
                    /> </span
                  ><!-- btn-orange -->
                </div>
              </div>
            </div>
            <div class="text-div">
              <label class="label">Category</label>
              <select
                name="Category"
                class="input-field"
                v-model="form.category"
              >
                <option
                  v-for="category in categoryList"
                  :key="category.id"
                  v-bind:value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="btn-div">
            <md-button
              style="background-color: #d5bc3d"
              class="md-raised md-accent"
              @click="create()"
              >Save</md-button
            >
          </div>
        </md-card>

        <md-card
          v-if="this.selected == 'second' ? true : false"
          class="right-div"
          style="overflow: hidden"
        >
          <div class="right-div-header">Download Report</div>
          <div class="table-div">
            <div class="table-header">
              <div class="tableheader-label">Image Name</div>
              <div class="tableheader-label">Category</div>
              <div class="tableheader-label">Total Downloads</div>
            </div>
            <!-- <div class="table-row-main"> -->
            <div class="table-row" v-for="item in reportList" :key="item.id">
              <div class="table-row-data">{{ item.name }}</div>
              <div class="table-row-data">{{ item.name }}</div>
              <div class="table-row-data">{{ item.downloadsCount }}</div>
            </div>
          </div>
        </md-card>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import { GetAllCategory, Upload, GetDownloadsReport } from "../http-common";
import TokenService from "../http-common/token";
export default {
  name: "ContributerDashboard",
  data: () => ({
    showDialog: false,
    selected: "first",
    form: { imgName: "", imgFile: [], category: "" },
    categoryList: [],
    reportList: [],
  }),
  beforeMount() {
    this.getAllCategories();
  },
  methods: {
    btnClick(val) {
      this.selected = val;
      this.getDownloadsReport();
    },
    getAllCategories() {
      new TokenService()
        .checkAuthentication(GetAllCategory)
        .then((response) => {
          this.categoryList = response.data.result;
          const data = JSON.stringify(response.data.message);
          this.$toasted.show(data).goAway(2500);
        })
        .catch((e) => {
          let message = "Something went wrong!";
          if (e.response.data.statuscode >= 400) {
            message = e.response.data.message;
          }
          this.$toasted.show(message).goAway(2500);
        });
      window.setTimeout(() => {}, 2500);
    },
    uploadImage(event) {
      this.form.imgFile = event.target.files;
    },
    clearForm() {
      this.form.imgName = "";
      this.form.category = "";
      this.form.imgFile = [];
    },
    create() {
      console.log(this.form.imgFile);
      let imgData = new FormData();
      imgData.append("name", this.form.imgName);
      imgData.append("category", this.form.category);
      for (let index = 0; index < this.form.imgFile.length; index++) {
        imgData.append("file",this.form.imgFile[index]);
        
      }
      // imgData.append("file", this.form.imgFile);
      Upload(imgData)
        .then((response) => {
          const data = JSON.stringify(response.data.message);
          this.$toasted.show(data).goAway(2500);
          this.sending = false;
          this.clearForm();
        })
        .catch((e) => {
          let message = "Something went wrong!";
          if (e.response.data.statuscode >= 400) {
            message = e.response.data.message;
          }
          this.$toasted.show(message).goAway(2500);
          this.clearForm();
        });
      window.setTimeout(() => {
        this.sending = false;
        this.clearForm();
      }, 2500);
    },
    getDownloadsReport() {
      new TokenService()
        .checkAuthentication(GetDownloadsReport)
        .then((response) => {
          this.reportList = response.data.result;
          const data = JSON.stringify(response.data.message);
          this.$toasted.show(data).goAway(2500);
        })
        .catch((e) => {
          let message = "Something went wrong!";
          if (e.response.data.statuscode >= 400) {
            message = e.response.data.message;
          }
          this.$toasted.show(message).goAway(2500);
        });
      window.setTimeout(() => {}, 2500);
    },
  },
};
</script>

<style lang="css" scoped>
.md-toolbar.md-theme-default.md-primary {
  background-color: #d5bc3d;
  height: 8rem;
}
.md-toolbar.md-theme-default.md-primary .md-title {
  color: #6a531c;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.md-title {
  font-size: 2rem;
}
.md-app {
  height: 100%;
  border: 1px solid rgba(#000, 0.12);
}
.content-div {
  height: calc(100vh - 10em);
}
.main-div {
  display: flex;
  height: 100%;
}
.left-div {
  width: 20%;
}
.right-div {
  width: 80%;
  display: flex;
  flex-flow: wrap;
  flex-flow: column;
}
.right-sub-div {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
  width: 26em;
  height: 22em;
  margin: 2% 1% 1% 2%;
  overflow-y: hidden;
  cursor: pointer;
}
.dialogue-sub-div {
  width: 38em;
  margin: 0 2em 0 2em;
}
.md-list-item-text {
  font-size: 1.2em;
  margin: 0 0 0 4%;
}
.inner-div {
  font-size: 1.3em;
  font-weight: 500;
}
.dialogue-header {
  font-size: 2em;
  height: mar;
  text-align: center;
  margin: 2% 0 2% 31%;
}
.inner-div-main {
  margin-top: 4%;
  text-align: center;
}
.download-btn {
  align-self: center;
  margin: 0 2em 0 2em;
}
.md-dialog-actions {
  padding: 0;
}
.header-div {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.close-div {
  width: 6%;
  cursor: pointer;
}
.select {
  background-color: #bbbb;
}
.selectedMenu {
  background-color: #bbbb;
}
.right-div-header {
  font-weight: 800;
  width: 100%;
  font-size: 1.5em;
  margin: 3% 0 0 3%;
}
.input-field {
  height: 2rem;
}
.sub-div {
  display: flex;
  flex-direction: column;
  width: 45%;
  margin: 3% 0 0 3%;
}
.text-div {
  display: flex;
  flex-flow: column;
  margin-bottom: 4%;
}
.label {
  font-size: 1.2em;
}
.btn-div {
  margin: 0 0 0 2.4%;
}
.table-header {
  display: flex;
  justify-content: space-around;
  font-size: 1.3em;
  font-weight: 600;
  margin-top: 2%;
}
.tableheader-label {
  width: 100%;
  text-align: center;
  border: 1px solid #bbbb;
  height: 3em;
  display: flex;
  justify-content: center;
  flex-flow: column;
}
.table-row-data {
  width: 33.33%;
  text-align: center;
  /* height: 3em;
  display: flex;
  justify-content: center;
  flex-flow: column; */

  border: 1px solid #dddddd;
  padding: 8px;
  border-bottom-color: transparent;
  border-top-color: transparent;
}
.table-row {
  display: flex;
  flex-flow: row;

  border: 0px solid #dddddd;
}
.table-div {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding: 0 2% 0 2%;
}
.custom-file-upload {
  display: block;
  width: auto;
  font-size: 16px;
  margin-top: 30px;
  /* //border: 1px solid #ccc; */
}
.label {
  display: block;
  margin-bottom: 5px;
}

.it .btn-orange {
  background-color: blue;
  border-color: #777 !important;
  color: #777;
  text-align: left;
  width: 100%;
}
.it input.form-control {
  border: none;
  margin-bottom: 0px;
  border-radius: 0px;
  border-bottom: 1px solid #ddd;
  box-shadow: none;
}
.it .form-control:focus {
  border-color: #ff4d0d;
  box-shadow: none;
  outline: none;
}
.fileUpload {
  position: relative;
  overflow: hidden;
  display: flex;
  margin-top: 6px;
}
.fileUpload input.upload {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
}
.img-choose-div {
  display: flex;
  flex-flow: row;
}
.upl {
  font-size: 1.1em;
}
.input-group-btn {
  background-color: #d1d1d1bb;
}
</style>