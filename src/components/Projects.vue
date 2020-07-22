<template>
  <div>
    <v-list dense>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title> Dmitry Loza</v-list-item-title>
        </v-list-item-content>
        <v-icon class="cog-icon">mdi-cog</v-icon>
      </v-list-item>
      <v-divider horisontal></v-divider>
      <br />
      <v-list-item>
        <CreateProject class="createProject" :createProject="createProject" />
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
  props: ["changeProject"],
  data() {
    return {
      projects: ["Project 1", "Project 2"]
    };
  },
  methods: {
    createProject(project) {
      this.projects.push(project);
    }
  }
};
</script>

<style lang="scss" scoped>
.createProject {
  width: 100%;
}
.cog-icon:hover {
  cursor: pointer;
}
</style>
