<template>
  <div>
    <v-list dense>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ user.email }}</v-list-item-title>
        </v-list-item-content>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="cog-icon" v-bind="attrs" v-on="on">mdi-cog</v-icon>
          </template>
          <v-list>
            <v-list-item class="menu-item">
              <v-list-item-title link @click="signOut"
                >Log Out</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
      <v-divider horisontal></v-divider>
      <br />
      <v-list-item>
        <CreateProject
          :projects="projects"
          class="createProject"
          :createProject="createProject"
        />
      </v-list-item>

      <v-list-item
        link
        v-for="project in projects"
        :key="project"
        @click="changeProject(project)"
      >
        <v-list-item-action>
          <v-icon></v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="project"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-expansion-panel>
        <v-expansion-panel-header>Item</v-expansion-panel-header>
        <v-expansion-panel-content v-for="project in projects" :key="project">
          <v-list-item link>
            <v-list-item-action>
              <v-icon></v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ project }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-content>
      </v-expansion-panel> -->
    </v-list>
  </div>
</template>

<script>
import CreateProject from "./CreateProject.vue";
export default {
  components: {
    CreateProject
  },
  props: ["changeProject", "user", "createProject", "projects", "signOut"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.createProject {
  width: 100%;
}
.cog-icon:hover {
  cursor: pointer;
}
.menu-item {
  cursor: pointer;
}
</style>
