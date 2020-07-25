<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-if="!isProjectSpace"
          class="mb-2 createBtn"
          v-bind="attrs"
          v-on="on"
          >New project</v-btn
        >
        <v-btn color="primary" v-else class="mb-2 " v-bind="attrs" v-on="on"
          >New project</v-btn
        >
      </template>
      <v-card>
        <v-card-title class="headOfEdit">
          <span class="headline">New project</span>
          <!-- <v-checkbox
            v-model="editedItem.isEmpFixedPayment"
            label="Fixed salary"
          ></v-checkbox> -->
        </v-card-title>

        <v-card-text>
          <!-- <v-row> -->
          <!-- <v-col cols="12" sm="6" md="4"> -->
          <v-text-field
            v-model="project.name"
            :rules="[rules.required, rules.counter, rules.exist]"
            label="Name"
          ></v-text-field>
          <!-- </v-col> -->
          <!-- </v-row> -->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue darken-1" text @click="close">Cancel</v-btn> -->
          <v-btn
            color="blue darken-1"
            :disabled="!isName || !isExist"
            text
            @click="save"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["createProject", "isProjectSpace", "projects"],
  data() {
    return {
      dialog: false,
      project: {
        name: ""
      },
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 20 || "Max 20 characters",
        exist: () => this.isEx() || "Project with this name already exists"
      }
    };
  },
  computed: {
    isName: function() {
      if (this.project.name) {
        return true;
      } else return false;
    },
    isExist: function() {
      if (
        this.projects.filter(item => item.name == this.project.name).length == 0
      )
        return true;
      else return false;
    }
  },
  methods: {
    isEx: function() {
      if (
        this.projects.filter(item => item.name == this.project.name).length == 0
      )
        return true;
      else return false;
    },
    save: async function() {
      const res = await this.createProject(this.project);
      if (res == "ok") {
        this.dialog = false;
        this.project.name = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.createBtn {
  width: 100%;
}
</style>
