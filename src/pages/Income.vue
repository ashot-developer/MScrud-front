<template>
  <q-page class="q-pa-sm">
    <date-picker></date-picker>
    <div class="result text-center q-mt-xl" v-if="income.black !== ''">
      Ձեր նշած օրերի շրջանառությունը կազմում է՝ <strong class="text-red">{{ income.black }} դրամ</strong>, իսկ եկամուտը՝ <strong class="text-red">{{ income.clear }} դրամ:</strong>
    </div>
    <div class="result text-center q-mt-xl" v-if="income.black === ''"> Նշեք օր կամ օրերի միջակայք ձեր շրջանառություն/եկամուտը տեսնելու համար </div>
  </q-page>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  name: "Income",
  computed: {
    ...mapGetters({
      income: 'sales/getFullIncome',
    })
  },
  beforeMount() {
    var password = prompt("Մուտքագրեք ձեր գաղտնաբառը");

    while(password != '1995'){
        var password = prompt("Մուտքագրեք ձեր գաղտնաբառը");
    }
  },
  components: {
    'date-picker': require('components/income/DatePicker.vue').default
  }
};
</script>

<style>
  .result{
    font-size: 48px;
  }
</style>
