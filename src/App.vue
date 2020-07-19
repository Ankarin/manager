<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="devs"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="dark" dark class="mb-2" v-bind="attrs" v-on="on"
                >New Item</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
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
                        v-model="editedItem.devRate"
                        label="Dev rate"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fee"
                        label="Fee %"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
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
  data: () => ({
    dialog: false,
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
      { text: "Employee payout", align: "start", value: "devPayout" },
      { text: "Margin", align: "start", value: "margin" },
      { text: "Actions", align: "start", value: "actions", sortable: false }
    ],
    devs: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      time: 0,
      companyRate: 0,
      devRate: 0,
      fee: 0
    },
    defaultItem: {
      name: "",
      time: 0,
      companyRate: 0,
      devRate: 0,
      fee: 0,
      marginPerH: 0,
      devPayout: 0,
      margin: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Developer" : "Edit";
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
    initialize() {
      this.devs = [
        {
          name: "Nasya Pisya",
          time: 13.5,
          companyRate: 25,
          devRate: 15,
          fee: 5,
          marginPerH: 0,
          devPayout: 0,
          margin: 0
        }
      ];
    },

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
      if (this.editedIndex > -1) {
        Object.assign(this.devs[this.editedIndex], this.editedItem);
      } else {
        this.devs.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
