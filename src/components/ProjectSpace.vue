<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="devs"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-app-bar app flat dark>
          <v-app-bar-nav-icon @click.stop="changeDrawer"></v-app-bar-nav-icon>
          <v-toolbar-title>{{ project }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark class="mb-2" v-bind="attrs" v-on="on"
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.time"
                      label="Time"
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
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  props: ["changeDrawer", "project", "user"],
  data: () => ({
    currentProject: {
      key: "150321",
      name: "Project 1",
      devs: [
        {
          name: "Nasya Pisya",
          time: 13.5,
          companyRate: 25,
          devRate: 15,
          fee: 5,
          marginPerH: 5,
          devPayout: 0,
          margin: 0,
          eployeeFixedPayment: 0,
          isEmpFixedPayment: false
        }
      ]
    },
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
    devs: [
      {
        name: "Nasya Pisya",
        time: 13.5,
        companyRate: 25,
        devRate: 15,
        fee: 5,
        marginPerH: 5,
        devPayout: 0,
        margin: 0,
        eployeeFixedPayment: 0,
        isEmpFixedPayment: false
      }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      time: 0,
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
      time: 0,
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
    formTitle() {
      return this.editedIndex === -1 ? "New Developer" : "Edit";
    },
    calcMarginPerH() {
      return this.calcMargin / this.editedItem.time;
    },
    calcDevPayout() {
      return this.editedItem.devRate * this.editedItem.time;
    },
    calcMargin() {
      if (this.editedItem.isEmpFixedPayment) {
        return (
          ((this.editedItem.companyRate * this.editedItem.time) / 100) *
            (100 - this.editedItem.fee) -
          this.editedItem.devPayout
        );
      } else
        return (
          ((this.editedItem.companyRate * this.editedItem.time) / 100) *
            (100 - this.editedItem.fee) -
          this.editedItem.devRate * this.editedItem.time
        );
    },
    calcCustomerPaid() {
      return this.editedItem.companyRate * this.editedItem.time;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
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

      edited.margin = this.calcMargin.toFixed(2);
      if (this.editedItem.isEmpFixedPayment) {
        edited.devRate = 0;
      }
      if (this.editedIndex > -1) {
        Object.assign(this.devs[this.editedIndex], edited);
      } else {
        this.devs.push(edited);
      }
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
</style>
