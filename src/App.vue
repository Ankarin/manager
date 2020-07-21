<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" dark app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-toolbar-title>Project 1</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <ProjectSpace class="projectSpace" v-bind:changeDrawer="changeDrawer" />
      </v-container>
    </v-main>
    <v-footer app dark>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ProjectSpace from "./components/ProjectSpace.vue";
export default {
  components: {
    ProjectSpace
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: false
  }),
  methods: {
    changeDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>

<style lang="scss">
.projectSpace {
  width: 100%;
}
/* .contain {
  padding: 0;
} */
</style>
