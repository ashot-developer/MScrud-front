<template>
    <q-page class="q-pa-sm">
        <sales-table></sales-table>
    </q-page>
</template>

<script>

export default {
    name: 'Sales',
    components: {
        'sales-table' : require('components/sales/SalesTable.vue').default
    }

}
</script>
