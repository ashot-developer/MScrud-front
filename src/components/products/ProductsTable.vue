<template>
  <div>
    <add-product>Ավելացնել նոր ապրանք</add-product>
    <q-dialog v-model="editProductShow">
      <edit-product :product.sync="product" @closeModal="editProductShow = $event" :id="productId" v-on:fromEdit="ShowEditModal">Փոփոխել</edit-product>
    </q-dialog>
    <q-card>
      <q-card-section class="q-pa-none">
        <q-table
          title="Ապրանքներ"
          :data="productsList"
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
              <q-btn icon="edit" @click="ShowEditModal(props.row)" size="sm" flat dense >
              </q-btn>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductsTable",
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
          name: "input_price",
          label: "Մուտքի գին",
          field: "input_price",
          sortable: true,
          align: "left",
        },
        {
          name: "sale_price",
          label: "Վաճառքի գին",
          field: "sale_price",
          sortable: false,
          align: "center",
        },
        {
          name: "product_qty",
          label: "Քանակ",
          field: "product_qty",
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
      editProductShow: false,
      productForm: {
        sku: "",
        product_name: "",
        input_price: "",
        sale_price: "",
        product_qty: "",
      },
      product: {
        
      },
      productId: ''
    }
  },
  methods: {
    ...mapActions({
      allProducts: "products/allProducts",
      deleteProduct: "products/deleteProduct",
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
          this.deleteProduct(id);
        });
    },
    ShowEditModal(product) {
      this.editProductShow = true
      this.product = product
      this.productId = product.id
    }
  },
  computed: {
    ...mapGetters({
      productsList: "products/getAllProducts",
    }),
  },
  async mounted() {
    this.allProducts();
  },
  components: {
    "add-product": require("components/products/Modals/AddProduct.vue").default,
    "edit-product": require("components/products/Modals/EditProduct.vue").default,
  },
};
</script>

<style>
.q-table__middle .q-table th{
    font-weight: bold!important;
}
</style>
