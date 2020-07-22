<template>
  <v-app id="inspire">
    <v-dialog persistent v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Sign in with your google account and start to use
        </v-card-title>
        <v-card-title>
          <v-btn dark class="signInButton" @click="signIn">Sign In</v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>
    <v-navigation-drawer v-model="drawer" dark app>
      <v-btn @click="signOut">Log out</v-btn>
      <v-btn dark class="signInButton" @click="signIn">Sign In</v-btn>
      <Projects :changeProject="changeProject" />
    </v-navigation-drawer>

    <v-main>
      <v-container class="fill-height" fluid>
        <ProjectSpace
          class="projectSpace"
          :changeDrawer="changeDrawer"
          :project="project"
          :user="user"
        />
      </v-container>
    </v-main>
    <v-footer app dark>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from "./firebase";
var provider = new firebase.auth.GoogleAuthProvider();
import Projects from "./components/Projects.vue";
import ProjectSpace from "./components/ProjectSpace.vue";
import { checkServerIdentity } from "tls";
export default {
  components: {
    ProjectSpace,
    Projects
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    project: "Project 1",
    user: "",
    dialog: false,
    check: "1",
    loggedIn: false
  }),
  mounted() {
    this.setupFirebase();
  },

  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.dialog = false;
          this.user = user;
        } else {
          this.user = "";
          this.dialog = true;
        }
      });
    },
    changeDrawer() {
      this.drawer = !this.drawer;
    },
    changeProject(project) {
      this.project = project;
    },
    signIn() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {})
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.projectSpace {
  width: 100%;
}
.signInButton {
  width: 100%;
}
</style>
