<template>
  <div>
    <div class="row justify-end">
      <q-btn
        label="Վաճառել հիմա"
        class="bg-positive text-white q-mb-md"
        @click="saleNowShow = true"
      />
    </div>
    <q-dialog v-model="saleNowShow">
      <sale-now
        :getSkus.sync="getSkus"
        @closeModal="saleNowShow = $event"
        :productsList.sync="productsList"
        class="q-mt-lg"
      ></sale-now>
    </q-dialog>
    <q-card>
      <q-card-section class="q-pa-none">
        <q-table
          title="Վաճառված ապրանքներ"
          :data="saledProductsList"
          :columns="columns"
          row-key="name"
          :filter="filter"
          rows-per-page-label="Ցուցադրել ամեն էջում։"
          no-results-label="Տվյալներ չեն գտնվել"
          no-data-label="Տվյալներ չեն գտնվել"
          :pagination-label="getPaginationLabel"
          :rows-per-page-options="[10, 15, 20, 25, 50, 0]"
          column-sort-order="ad"
        >
          <template v-slot:top-right>
            <q-input
              v-if="show_filter"
              filled
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Փնտրել"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-btn
              class="q-ml-sm"
              icon="filter_list"
              @click="show_filter = !show_filter"
              flat
            />
          </template>
          <template v-slot:body-cell-Action="props">
            <q-td :props="props">
              <q-btn
                icon="delete"
                size="sm"
                class="q-ml-sm"
                @click.stop="promtToDelete(props.row.id)"
                flat
                dense
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "SalesTable",
  data() {
    return {
      columns: [
        {
          name: "sku",
          required: true,
          label: "Կոդ",
          field: "sku",
          field: (row) => row.sku,
          format: (val) => `${val}`,
          sortable: true,
          align: "left",
        },
        {
          name: "product_name",
          label: "Ապրանքի անուն",
          field: "product_name",
          sortable: true,
          align: "left",
        },
        {
          name: "product_qty",
          label: "Քանակ",
          field: "product_qty",
          sortable: false,
          align: "center",
        },
        {
          name: "sale_date",
          label: "Վաճառվել է՝",
          field: "sale_date",
          sortable: false,
          align: "center",
        },
        {
          name: "Action",
          label: "",
          field: "Action",
          sortable: false,
          align: "center",
        },
      ],
      filter: "",
      show_filter: true,
      saleNowShow: false,
    };
  },
  methods: {
    ...mapActions({
      saledProducts: "sales/getAllSaledProducts",
      productsSkuList: "products/productsSkuList",
      allProducts: "products/allProducts",
      deleteSaledProduct: "sales/deleteSaledProduct",
    }),
    ...mapMutations({
      editProduct: 'products/editProduct'
    }),
    getPaginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
      return firstRowIndex + "-" + endRowIndex + " " + totalRowsNumber + "֊ից";
    },
    promtToDelete(id) {
      this.$q
        .dialog({
          title: "Հաստատել գործողությունը",
          message: "Իսկապե՞ս ջնջել",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteSaledProduct(id);
        });
    },
  },
  computed: {
    ...mapGetters({
      saledProductsList: "sales/saledProductsList",
      getSkus: "products/getSkus",
      productsList: "products/getAllProducts",
    }),
  },
  mounted() {
    this.saledProducts(), this.productsSkuList();
    this.allProducts();
    
  },
  components: {
    "sale-now": require("components/sales/Modals/SaleNow.vue").default,
  },
};
</script>

<style>
.q-table__middle .q-table th {
  font-weight: bold !important;
}
</style>
