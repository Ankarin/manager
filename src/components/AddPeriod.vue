<template>
  <div>
    <v-card class="addPeriod" @click="dialog = true" color="primary"
      ><v-icon dark>mdi-plus</v-icon></v-card
    >
    <v-dialog max-width="500px" v-model="dialog">
      <v-card class="mx-auto">
        <v-card-title>
          Add new payout period
        </v-card-title>

        <v-card-text>
          Select developers for next period
          <v-checkbox
            v-for="dev in developers"
            :key="dev"
            v-model="selected"
            :label="dev"
            :value="dev"
            hide-details
          ></v-checkbox>
        </v-card-text>
        {{ selected }}
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["devs", "addPeriod"],
  data() {
    return {
      dialog: false,
      selected: [],
      newDevs: []
    };
  },
  methods: {
    save() {
      let devs = this.newDevs.filter(item => this.newDevs.includes(item.name));
      this.addPeriod(devs);
      this.dialog = false;
    },
    close() {
      this.dialog = false;
    }
  },
  computed: {
    developers: function() {
      let newArr = this.devs.map(item => (item = item.name));
      return newArr;
    }
  },
  mounted() {
    this.newDevs = this.devs;
    this.selected = this.devs.map(item => (item = item.name));
  }
};
</script>

<style lang="scss" scoped>
.addPeriod {
  cursor: pointer;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
