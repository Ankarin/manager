<template>
  <div>
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="summary"
      sort-by="calories"
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      summary: [
        {
          name: "Summary",
          avgTime: "",
          avgCompanyRate: "",
          avgDevRate: "",
          avgFee: "",
          avgMarginPerH: "",
          avgDevPayout: "",
          avgMargin: ""
        }
      ],
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Avg time", align: "start", value: "time" },
        { text: "Avg company rate", align: "start", value: "awvCompanyRate" },
        { text: "Avg dev rate", align: "start", value: "avgDevRate" },
        { text: "Avg fee %", align: "start", value: "avgFee" },
        { text: "Avg margin per h", align: "start", value: "avgMarginPerH" },
        { text: "Avg dev payour", align: "start", value: "avgDevPayout" },
        { text: "Avg margin", align: "start", value: "avgMargin" }
      ]

      // { text: "Actions", align: "start", value: "actions", sortable: false }
    };
  }
};
</script>

<style lang="scss" scoped></style>
