<template>
  <div class="row items-start justify-start">
    <div class="q-pa-md">
      <q-date v-model="model" mask="DD.MM.YYYY" range />
    </div>
    <q-btn
      color="primary"
      :disabled="model.from == ''"
      label="Եկամուտի հարցում"
      class="q-mt-md"
      @click.stop="dateSubmit"
    />
  </div>
</template>

<script>
const current = new Date();
const date =
  current.getFullYear() +
  "/" +
  (current.getMonth() + 1) +
  "/" +
  current.getDate();

import { mapActions } from 'vuex'

export default {
  data() {
    return {
      model: { from: "", to: "" },
    };
  },
  methods: {
    ...mapActions({
      getIncome: 'sales/getIncome'
    }),
    dateSubmit(){
      this.getIncome(this.model)
    }
  }
};
</script>