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
      <!-- <v-btn @click="signOut">Log out</v-btn> -->
      <Projects
        :deleteProject="deleteProject"
        :signOut="signOut"
        :user="user"
        :changeProject="changeProject"
        :createProject="createProject"
        :projects="projects"
      />
    </v-navigation-drawer>

    <v-main>
      <v-container class="fill-height" fluid>
        <ProjectSpace
          :changeCurPeriod="changeCurPeriod"
          :editProject="editProject"
          :createProject="createProject"
          class="projectSpace"
          :changeDrawer="changeDrawer"
          :projects="projects"
          :project="project"
          :user="user"
          :newPeriod="newPeriod"
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
import firebase from "../firebase";
const db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();
import Projects from "./Projects.vue";
import ProjectSpace from "./ProjectSpace.vue";
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
    projects: [],
    drawer: false,
    project: {},
    user: "",
    dialog: false,
    check: "1",
    loggedIn: false,
    userData: ""
  }),
  mounted() {
    this.setupFirebase();
  },

  methods: {
    changeCurPeriod(period, name) {
      let indexOfProject = this.projects.findIndex(
        element => element.name == name
      );
      this.projects[indexOfProject].currentPeriod = period;
      // this.editProject(devs, name);
    },
    newPeriod(devs, name) {
      let indexOfProject = this.projects.findIndex(
        element => element.name == name
      );
      this.projects[indexOfProject].periods.push({ devs: devs });
      this.projects[indexOfProject].currentPeriod =
        this.projects[indexOfProject].periods.length - 1;
      db.collection("users")
        .doc(this.user.email)
        .update({
          projects: this.projects
        });
    },
    deleteProject(index) {
      this.projects.splice(index, 1);
      db.collection("users")
        .doc(this.user.email)
        .update({
          projects: this.projects
        });
    },
    log() {
      console.log(this.projects);
    },
    getUserData: async function() {
      try {
        let ref = await db.collection("users").doc(this.user.email);
        ref.get().then(doc => {
          if (doc.exists) {
            if (doc.data().projects) this.projects = doc.data().projects;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
      } catch (error) {
        console.log("Error getting document:", error);
      }
    },
    createProject: async function(project, type) {
      const isExist = this.projects.filter(item => item.name == project.name)
        .length;
      if (isExist > 0) {
        return;
      } else {
        let newProject = {
          name: project.name,
          currentPeriod: 0,
          type: type,
          periods: [{ devs: [] }]
        };
        this.projects.push(newProject);

        try {
          await db
            .collection("users")
            .doc(this.user.email)
            .update({
              projects: this.projects
            });
          return "ok";
        } catch (err) {
          console.log(err);
        }
      }
    },
    createUser(displayName, email) {},
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.dialog = false;
          this.user = user;
          this.getUserData();
        } else {
          this.user = "";
          (this.projects = []), (this.dialog = true);
        }
      });
    },
    changeDrawer() {
      this.drawer = !this.drawer;
    },
    changeProject(project) {
      this.project = project;
    },
    editProject(devs, name) {
      let indexOfProject = this.projects.findIndex(
        element => element.name == name
      );
      this.projects[indexOfProject].periods[
        this.projects[indexOfProject].currentPeriod
      ].devs = devs;
      db.collection("users")
        .doc(this.user.email)
        .update({
          projects: this.projects
        });
    },
    signIn() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log(result);
          db.collection("users")
            .doc(result.user.email)
            .get()
            .then(function(doc) {
              if (!doc.exists) {
                db.collection("users")
                  .doc(result.user.email)
                  .set({ name: result.user.displayName });
              }
            });
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
