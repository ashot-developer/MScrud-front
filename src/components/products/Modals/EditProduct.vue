<template>
  <q-card style="width: 740px; max-width: 80vw">
    <q-card-section class="row items-center q-pb-none q-mb-md">
      <div class="text-h6"><slot></slot></div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-form
      ref="form"
      @reset="resetFormCst"
      class="q-pa-sm text-right"
      @submit.prevent="updateProduct"
    >
      <div class="row q-mb-md">
        <q-input
          filled
          ref="sku"
          type="number"
          v-model="productForm.sku"
          v-on:input="$emit('input', $event)"
          label="Ապրանքի կոդը"
          class="col q-mr-md"
          :rules="[(val) => $v.productForm.sku.required]"
        />
        <q-input
          filled
          v-model="productForm.product_name"
          label="Ապրանքի անունը"
          class="col"
          :rules="[(val) => $v.productForm.product_name.required]"
        />
      </div>
      <div class="row q-mb-md">
        <q-input
          filled
          type="number"
          v-model="productForm.input_price"
          label="Մուտքի գին"
          class="col q-mr-md"
          :rules="[(val) => $v.productForm.input_price.required]"
        />
        <q-input
          filled
          type="number"
          v-model="productForm.sale_price"
          label="Վաճառքի գին"
          class="col"
          :error="$v.productForm.sale_price.$error"
          :error-message="priceError"
          :rules="[
            (val) => $v.productForm.sale_price.required,
            (val) => $v.productForm.sale_price.minValue,
          ]"
        />
      </div>
      <q-input
        filled
        type="number"
        v-model="productForm.product_qty"
        label="Քանակ"
        class="col q-mb-md"
        :rules="[(val) => $v.productForm.product_qty.required]"
      />
      <q-btn
        color="primary"
        type="submit"
        size="lg"
        :disabled="$v.$invalid"
        icon="save_alt"
        label="Փոփոխել"
      />
    </q-form>
  </q-card>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { Notify } from "quasar";

export default {
  data() {
    return {
      productForm: {

      },
      valName: "sale_price",
      priceError: "Վաճառքի գինը չի կարող փոքր լինել մուտքի գնից։",
    };
  },
  props: ["product", "id"],
  validations() {
    return {
      productForm: {
        sku: { required },
        product_name: { required },
        input_price: { required },
        [this.valName]: {
          required,
          minValue: minValue(this.productForm.input_price),
        },
        product_qty: { required },
      },
    };
  },
  methods: {
    ...mapActions({
      editProducts: "products/editProduct",
    }),
    updateProduct(event) {
      this.editProducts(this.productForm);
      this.$emit('closeModal', false)
    },
    resetFormCst() {
      this.productForm.sku =
        this.productForm.product_name =
        this.productForm.input_price =
        this.productForm.sale_price =
        this.productForm.product_qty =
          "";
    },
  },
  mounted() {
    this.productForm = Object.assign({}, this.product)
    console.log(this.productForm);
  }
};
</script>
