<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark class="mb-2 createBtn" v-bind="attrs" v-on="on"
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
          <v-text-field v-model="project.name" label="Name"></v-text-field>
          <!-- </v-col> -->
          <!-- </v-row> -->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue darken-1" text @click="close">Cancel</v-btn> -->
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["createProject"],
  data() {
    return {
      dialog: false,
      project: {
        name: ""
      }
    };
  },
  methods: {
    save() {
      this.dialog = false;
      this.createProject(this.project.name);
      this.project.name = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.createBtn {
  width: 100%;
}
</style>
