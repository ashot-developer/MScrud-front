<template>
  <q-card style="width: 740px; max-width: 80vw">
    <q-card-section class="row items-center q-pb-none q-mb-md">
      <div class="text-h6"><slot>Վաճառք</slot></div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-form
      ref="form"
      @submit="formSubmit"
      @reset="resetFormCst"
      class="q-pa-sm text-right"
    >
      <div class="row q-mb-md">
        <q-select
          filled
          v-model="saleNow.sku"
          use-input
          input-debounce="0"
          label="Ապրանքի Կոդ"
          :options="options"
          @filter="filterFn"
          @input="getCurrentProduct(saleNow.sku, saleNow.qty)"
          class="col q-mr-md"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> Արդյունք չկա </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          filled
          v-model="saleNow.qty"
          type="number"
          label="Քանակ"
          class="col q-mb-md"
          min="1"
          @input="getCurrentProduct(saleNow.sku, saleNow.qty)"
        />
      </div>
      <div
        class="text-center product_info"
        :v-if="productInfo != ''"
        v-html="productInfo"
      ></div>
      <q-btn
        color="primary"
        type="submit"
        :disabled="!canSale"
        size="lg"
        class="q-mb-sm"
        icon="save_alt"
        label="Վաճառել"
      />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  props: ["getSkus", "productsList"],
  data() {
    return {
      stringOptions: [],
      products: [],
      saleNowShow: false,
      canSale: false,
      options: this.stringOptions,
      productInfo: "",
      saleNow: {
        sku: "",
        qty: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      storeSaledProducts: "sales/storeSaledProduct",
    }),
    ...mapMutations({
      updateProductQty: "products/updateProductQty",
    }),
    formSubmit() {
      this.storeSaledProducts(this.saleNow);
      this.updateProductQty(this.saleNow);
      this.$refs.form.reset();
      this.saleNowShow = false;
      this.$emit("closeModal", false);
    },
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.stringOptions;

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }
      update(() => {
        const needle = val.toString();
        this.options = this.stringOptions.filter(
          (v) => v.toString().indexOf(needle) > -1
        );
      });
    },

    getCurrentProduct(sku, qty) {
      var index = this.products.findIndex((x) => x.sku === sku);
      if (index != -1) {
        var currentProduct = this.products[index];
        if (+currentProduct.product_qty >= +qty) {
          this.productInfo =
            "<div>Վաճառվող ապրանք՝ <strong>" +
            currentProduct.product_name +
            '</strong></div><div class="product_price">Գինը՝  <strong>' +
            currentProduct.sale_price +
            '</strong>֏</div><div class="product_price">Ընդամենը՝  <strong>' +
            currentProduct.sale_price * qty +
            "</strong>֏</div>";
          this.canSale = true;
        } else if (currentProduct.product_qty == 0) {
          this.productInfo = "<p>Այս ապրանքը սպառվել է</p>";
          this.canSale = false;
        } else {
          this.productInfo = "<p>Այս ապրանքից տվյալ քանակի չկա</p>";
          this.canSale = false;
        }
      }
    },
    resetFormCst() {
      this.saleNow.sku = this.saleNow.qty = "";
    },
  },
  mounted() {
    this.stringOptions = this.getSkus;
    this.products = this.productsList;
  },
};
</script>

<style lang="scss">
.product_info {
  font-size: 28px;
  margin-top: 25px;
  margin-bottom: 50px;
  p{
    color: #db2828;
  }
  .product_price {
    color: green;
  }
  strong {
    margin-left: 10px;
  }
}
</style>
