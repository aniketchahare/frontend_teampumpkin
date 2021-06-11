<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary app-bar">
        <span class="md-title">Assignment</span>
      </md-app-toolbar>

      <md-app-content class="content-div">
        <div class="main-div">
          <div class="left-div" @submit.prevent="validateUser">
            <md-content class="header">Sign Up</md-content>
            <div class="sub-div">
              <div class="text-div">
                <label class="label" name="name">Name</label>
                <input
                  class="input-field"
                  type="text"
                  name="name"
                  id="name"
                  v-model="form.name"
                />
              </div>
              <div class="text-div">
                <label class="label" name="emailId">Email Id</label>
                <input
                  class="input-field"
                  type="email"
                  name="email"
                  id="email"
                  v-model="form.email"
                />
              </div>
              <div class="text-div">
                <label class="label" name="password">Password</label>
                <input
                  class="input-field"
                  type="password"
                  name="password"
                  id="password"
                  v-model="form.password"
                />
              </div>
            </div>
            <div class="radio-div">
              <md-radio
                v-model="radio"
                value="normal"
                class="md-primary"
                @click="userType('normal')"
                >Normal User</md-radio
              >
              <md-radio
                v-model="radio"
                value="contributer"
                class="md-primary"
                @click="userType('contributer')"
                >Contributer</md-radio
              >
            </div>
            <md-button
              style="background-color: #d5bc3d"
              class="md-raised md-accent"
              @click="signUp"
              >Sign Up</md-button
            >
          </div>
          <div class="right-div">
            <md-content class="header">Login</md-content>
            <div class="sub-div">
              <div class="text-div">
                <label class="label" name="emailIdLogin">Email Id</label>
                <input
                  class="input-field"
                  type="email"
                  name="emailLogin"
                  id="emailLogin"
                  v-model="formLogin.email"
                />
              </div>
              <div class="text-div">
                <label class="label" name="passwordLogin">Password</label>
                <input
                  class="input-field"
                  type="password"
                  name="passwordLogin"
                  id="passwordLogin"
                  v-model="formLogin.password"
                />
              </div>
            </div>
            <md-button
              style="background-color: #d5bc3d"
              class="md-raised md-accent"
              @click="login"
              >Login</md-button
            >
          </div>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { Login, Register } from "../http-common";
import TokenService from "../http-common/token";
import { validationMixin } from "vuelidate";

export default {
  name: "SignInSignUp",
  mixins: [validationMixin],
  data: () => ({
    formLogin: {
      email: "",
      password: "",
    },
    form: {
      name: "",
      email: "",
      password: "",
    },
    radio: "normal",
  }),
  methods: {
    clearForm() {
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
    },
    signUp() {
      if ((this.form.name === "" && this.form.email === "" && this.form.password === "")) {
        this.$toasted.show("Please provide name, email & password").goAway(2500);
      } else {
        let userData = {
          name: this.form.name,
          emailId: this.form.email,
          password: this.form.password,
          userType: this.radio,
        };
        Register(userData)
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
      }
    },
    userType(val) {
      this.radio = val;
    },
    login() {
      if ((this.formLogin.email === "", this.formLogin.password === "")) {
        this.$toasted.show("Please provide email & password").goAway(2500);
      } else {
        let userData = {
          emailId: this.formLogin.email,
          password: this.formLogin.password,
        };
        Login(userData)
          .then((response) => {
            const data = JSON.stringify(response.data.message);
            localStorage.setItem("token", response.data.result.accessToken);
            this.$toasted.show(data).goAway(2500);
            if (["normal"].includes(new TokenService().checkUserType())) {
              this.$router.push("/user/dashboard");
            }
            if (["contributer"].includes(new TokenService().checkUserType())) {
              this.$router.push("/contributer/dashboard");
            }
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
      }
    },
  },
};
</script>

<style lang="css" scoped>
.page-container {
  height: 100%;
}
.md-title {
  font-size: 2rem;
}
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
.md-app {
  height: 100%;
  border: 1px solid rgba(#000, 0.12);
}
.main-div {
  display: flex;
  justify-content: space-between;
  margin: 0 12% 0 12%;
  height: 100%;
  align-items: center;
}
.sub-div {
  display: flex;
  flex-direction: column;
}
.left-div {
  width: 30%;
}
.right-div {
  width: 30%;
  margin-bottom: 11.5%;
}
.header {
  font-size: 1.5rem;
  margin-bottom: 8%;
  font-weight: 800;
}
.input-field {
  height: 2rem;
}
.content-div {
  height: calc(100vh - 10em);
}
.text-div {
  display: flex;
  flex-flow: column;
  margin-bottom: 4%;
}
.radio-div {
  display: flex;
  flex-flow: column;
}
.md-radio {
  margin: 10px 16px 10px 0;
}
.label {
  font-size: 1.2em;
}
</style>