import Vue from 'vue'

export function allProducts(state, payload) {
  state.products = payload
}

export function productsSkuList(state, payload) {
  state.skuList = payload
}

export function storeProducts(state, payload) {
  state.products.unshift(payload)
}

export function deleteProduct(state, id) {

  var index = state.products.findIndex(x => x.id === id)
  Vue.delete(state.products, index)

}

export function editProduct(state, payload) {

  var index = state.products.findIndex(x => x.id === payload.id)
  Object.assign(state.products[index], payload)

}

export function changeProduct(state, payload) {
  var index = state.products.findIndex(x => x.id === payload.id)
  Object.assign(state.products[index], payload)
}

export function updateProductQty(state, payload){
  var index = state.products.findIndex(x => x.sku === payload.sku)
  var oldQty = state.products[index].product_qty
  var newQty = oldQty - payload.qty
  state.products[index].product_qty = newQty
}