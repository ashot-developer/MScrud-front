<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Inline Actions
        <q-btn label="Export" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person"/>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table :data="data" :columns="columns" hide-bottom>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="props.row.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn icon="edit" size="sm" flat dense/>
            <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "TableActions",
  props: ['products'],
  data() {
    return {
      data: this.$props.products,
      columns: [
        {name: 'Կոդ', label: 'Կոդ', field: 'sku', sortable: true, align: 'left'},
        {name: 'Ապրանքի անուն', label: 'Ապրանքի անուն', field: 'product_name', sortable: true, align: 'left'},
        {name: 'Մուտքի գին', label: 'Մուտքի գին', field: 'input_price', sortable: true, align: 'left'},
        {name: 'Վաճառքի գին', label: 'Վաճառքի գին', field: 'sale_price', sortable: false, align: 'center'},
        {name: 'Քանակ', label: 'Քանակ', field: 'product_qty', sortable: false, align: 'center'}
      ],
    }
  },
}
</script>

<style scoped>

</style>
