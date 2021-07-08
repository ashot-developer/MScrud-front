<template>
  <q-page class="q-pa-sm">
    <products-table  class="q-mt-lg"></products-table>
  </q-page>
</template>

<script>
export default {
  name: "Products",
  components: {
   'products-table': require('components/products/ProductsTable').default,
  },
}
</script>

<style>

</style>
