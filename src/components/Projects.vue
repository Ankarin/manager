<template>
  <div>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card class="deleteTitle">
        <v-card-title>
          {{ `Delete project ${projectToDelete} ?` }}
        </v-card-title>
        <v-card-actions>
          <v-btn color="error" @click="deleteIt">Yes</v-btn>
          <v-btn color="primary" @click="closeDialog">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      <v-list-item-group v-model="currentProject">
        <v-list-item
          @click="changeProject(project)"
          link
          v-for="project in projects"
          :key="project.name"
        >
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ project.name }} </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon small @click="openDelete(project.name)">
                mdi-delete
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
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
  props: [
    "changeProject",
    "user",
    "createProject",
    "projects",
    "signOut",
    "deleteProject"
  ],
  data() {
    return {
      currentProject: "",
      projectToDelete: "",
      dialog: false
    };
  },
  methods: {
    openDelete(name) {
      this.projectToDelete = name;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    deleteIt() {
      this.deleteProject(this.currentProject);
      this.closeDialog();
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
.menu-item {
  cursor: pointer;
}
.deleteTitle {
  display: flex;
  justify-content: space-between;
}
</style>
