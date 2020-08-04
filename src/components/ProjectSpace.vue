<template>
  <v-app>
    <div class="paggination" v-if="project.name">
      <v-pagination
        v-model="page"
        :length="periodsLength"
        :total-visible="10"
      ></v-pagination>
      <AddPeriod :devs="devs" :addPeriod="addPeriod" />
    </div>
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="devs"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-app-bar app flat dark>
          <v-app-bar-nav-icon @click.stop="changeDrawer"></v-app-bar-nav-icon>

          <v-toolbar-title>{{ project.name }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-if="createBtn" v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on"
                >New Developer</v-btn
              >
            </template>
            <v-card>
              <v-card-title class="headOfEdit">
                <span class="headline">{{ formTitle }}</span>
                <v-checkbox
                  v-model="editedItem.isEmpFixedPayment"
                  label="Fixed salary"
                ></v-checkbox>
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="time">
                    <v-text-field
                      v-model="editedItem.hours"
                      label="Hours"
                      type="number"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.minutes"
                      label="Minutes"
                      type="number"
                      max="60"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.companyRate"
                      label="Company rate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      :disabled="editedItem.isEmpFixedPayment"
                      v-model="editedItem.devRate"
                      value="0"
                      label="Dev rate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fee"
                      label="Fee %"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-if="!editedItem.isEmpFixedPayment"
                      disabled
                      :value="calcDevPayout.toFixed(2)"
                      label="Dev payout"
                    ></v-text-field>
                    <v-text-field
                      v-if="editedItem.isEmpFixedPayment"
                      v-model="editedItem.devPayout"
                      label="Dev payout"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      disabled
                      :value="calcMarginPerH.toFixed(2)"
                      label="Margin per hour"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      disabled
                      :value="calcMargin.toFixed(2)"
                      label="Margin"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app-bar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-if="!project">
        <br />
        <CreateProject
          :projects="projects"
          :isProjectSpace="true"
          :createProject="createProject"
        />
      </template>
    </v-data-table>

    <!-- <v-pagination v-model="page" :length="periodsLength"></v-pagination> -->
  </v-app>
</template>

<script>
import CreateProject from "./CreateProject.vue";
import AddPeriod from "./AddPeriod.vue";
export default {
  components: {
    CreateProject,
    AddPeriod
  },
  props: [
    "changeDrawer",
    "project",
    "user",
    "createProject",
    "projects",
    "editProject",
    "changeCurPeriod",
    "newPeriod"
  ],
  data: () => ({
    currentPeriod: 0,
    page: 1,
    name: "",
    dialog: false,
    kek: 15,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Time", align: "start", value: "time" },
      { text: "Company rate", align: "start", value: "companyRate" },
      { text: "Dev rate", align: "start", value: "devRate" },
      { text: "Fee %", align: "start", value: "fee" },
      { text: "Margin per hour", align: "start", value: "marginPerH" },
      { text: "Dev payout", align: "start", value: "devPayout" },
      { text: "Margin", align: "start", value: "margin" },
      { text: "Actions", align: "start", value: "actions", sortable: false }
    ],
    devs: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      hours: 0,
      minutes: 0,
      companyRate: 0,
      devRate: 0,
      fee: 0,
      marginPerH: 0,
      isEmpFixedPayment: false,
      devPayout: 0,
      margin: 0
    },
    defaultItem: {
      name: "",
      hours: 0,
      minutes: 0,
      companyRate: 0,
      devRate: 0,
      fee: 0,
      marginPerH: 0,
      isEmpFixedPayment: false,
      devPayout: 0,
      margin: 0
    }
  }),

  computed: {
    kek() {
      return false;
    },
    periodsLength() {
      return this.project.periods.length;
    },
    createBtn() {
      if (this.project.name) {
        return true;
      } else return false;
    },
    timeCalc() {
      let time =
        Number(this.editedItem.hours) +
        Number(((100 / 60) * this.editedItem.minutes) / 100);
      return time;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Developer" : "Edit";
    },
    calcMarginPerH() {
      return this.calcMargin / this.timeCalc;
    },
    calcDevPayout() {
      return this.editedItem.devRate * this.timeCalc;
    },
    calcMargin() {
      if (this.editedItem.isEmpFixedPayment) {
        return (
          ((this.editedItem.companyRate * this.timeCalc) / 100) *
            (100 - this.editedItem.fee) -
          this.editedItem.devPayout
        );
      } else
        return (
          ((this.editedItem.companyRate * this.timeCalc) / 100) *
            (100 - this.editedItem.fee) -
          this.editedItem.devRate * this.timeCalc
        );
    },
    calcCustomerPaid() {
      return this.editedItem.companyRate * this.timeCalc;
    }
  },

  watch: {
    project() {
      this.currentPeriod = this.project.currentPeriod;
      this.page = this.currentPeriod + 1;
      this.devs = this.project.periods[this.project.currentPeriod].devs;

      this.name = this.project.name;
    },
    dialog(val) {
      val || this.close();
    },
    currentPeriod() {
      this.changeCurPeriod(this.currentPeriod, this.project.name);
      this.devs = this.project.periods[this.project.currentPeriod].devs;
    },
    page() {
      this.currentPeriod = this.page - 1;
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    addPeriod(devs) {
      this.newPeriod(devs, this.project.name);
      this.page = this.periodsLength;
    },
    initialize() {},

    editItem(item) {
      this.editedIndex = this.devs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.devs.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.devs.splice(index, 1);
      this.editProject(this.devs, this.project.name);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let edited = this.editedItem;
      edited.marginPerH = this.calcMarginPerH.toFixed(2);
      if (!this.editedItem.isEmpFixedPayment) {
        edited.devPayout = this.calcDevPayout.toFixed(2);
      }
      edited.time = `${edited.hours}:${edited.minutes}`;

      edited.margin = this.calcMargin.toFixed(2);
      if (this.editedItem.isEmpFixedPayment) {
        edited.devRate = 0;
      }
      if (this.editedIndex > -1) {
        Object.assign(this.devs[this.editedIndex], edited);
      } else {
        this.devs.push(edited);
      }
      this.editProject(this.devs, this.project.name);
      this.close();
    }
  }
};
</script>
<style lang="scss">
.headOfEdit {
  display: flex;
  justify-content: space-between;
}
.time {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
}

.paggination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
