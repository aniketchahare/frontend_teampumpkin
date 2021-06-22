<template>
  <md-app>
    <md-app-toolbar class="md-primary app-bar">
      <span class="md-title">Assignment - Normal User Login</span>
    </md-app-toolbar>

    <md-app-content class="content-div">
      <div class="main-div">
        <md-card class="left-div">
          <md-toolbar :md-elevation="1">
            <span class="md-title">Category</span>
          </md-toolbar>

          <md-card-content>
            <md-list v-for="category in categoryList" :key="category.id">
              <md-list-item @click="btnClick(category)">
                <img src="../assets/check.svg" alt="icon" />
                <span class="md-list-item-text">{{ category.name }}</span>
              </md-list-item>
            </md-list>
          </md-card-content>
        </md-card>

        <md-card class="right-div" style="overflow-y: auto">
          <div
            class="right-sub-div"
            @click="openDialogue(image)"
            v-for="image in imagesList"
            :key="image.id"
          >
            <!-- <md-card-media> -->
            <!-- <img
                :src="
                  image.urls.length !== 0 ? getImgUrl(image.urls[0].url) : null
                "
                alt="img"
              /> -->
            <!-- </md-card-media> -->

            <md-card-content class="inner-div-main">
              <div class="count-div">
                {{ image.urls.length }}
              </div>
              <div>
                <span class="inner-div">{{
                  `Contributer : ${image["uploadedByDetails.name"]}`
                }}</span>
              </div>
              <div>
                <span class="inner-div">{{
                  `Image Name : ${image.name}`
                }}</span>
              </div>
              <div>
                <span class="inner-div">{{
                  `Total Downloads : ${image.downloadsCount}`
                }}</span>
              </div>
            </md-card-content>
          </div>
        </md-card>
      </div>
      <md-dialog
        :md-active.sync="showDialog"
        :md-click-outside-to-close="false"
      >
        <div class="header-div">
          <div class="dialogue-header">Download Image</div>
          <md-card-media class="close-div">
            <img
              src="../assets/close.svg"
              @click="showDialog = false"
              alt="img"
            />
          </md-card-media>
        </div>

        <div class="dialogue-sub-div">
          <div class="grid-container">
            <div v-for="img in img" :key="img.id">
              <md-card-media>
                <img
                  :src="getImgUrl(img.url)"
                  alt="img"
                  class="grid-item"
                />
              </md-card-media>

              <md-dialog-actions class="download-btn">
                <md-button
                  style="background-color: #d5bc3d"
                  @click="downloadImg(img.url)"
                  >Download
                </md-button>
              </md-dialog-actions>
            </div>
          </div>

          <md-card-content class="inner-div-main">
            <div>
              <span class="inner-div">{{
                `Contributer : ${contributer}`
              }}</span>
            </div>
            <div>
              <span class="inner-div">{{ `Image Name : ${imgName}` }}</span>
            </div>
            <div>
              <span class="inner-div">{{
                `Total Downloads : ${totalDownloads}`
              }}</span>
            </div>
          </md-card-content>
        </div>
      </md-dialog>
    </md-app-content>
  </md-app>
</template>

<script>
import { GetAllCategory, GetAllImages, Download } from "../http-common";
import TokenService from "../http-common/token";
export default {
  name: "NormalUserDashboard",
  data: () => ({
    showDialog: false,
    categoryList: [],
    imagesList: [],
    img: "",
    contributer: "",
    imgName: "",
    totalDownloads: "",
    imgCount: 0,
  }),
  beforeMount() {
    this.getAllCategories();
  },
  methods: {
    btnClick(val) {
      this.getAllImages(val.id);
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
    getAllImages(categoryId) {
      new TokenService()
        .checkAuthentication(GetAllImages, categoryId)
        .then((response) => {
          console.log("result--> ", response.data.result);
          this.imagesList = response.data.result;
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
    getImgUrl(img) {
      return `http://localhost:4000/user/${img}`;
    },
    openDialogue(val) {
      this.showDialog = true;
      this.img = val.urls;
      this.contributer = val["uploadedByDetails.name"];
      this.imgName = val.name;
      this.totalDownloads = val.downloadsCount;
    },
    downloadImg(val) {
      console.log(val);
      Download(this.getImgUrl(val));
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
.selectedMenu {
  background-color: #bbbb;
}
.left-div {
  width: 20%;
}
.right-div {
  width: 80%;
  display: flex;
  flex-flow: wrap;
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
.count-div {
  font-size: 8em;
  height: 1em;
  display: inline-flex;
  align-items: center;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>