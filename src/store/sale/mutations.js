import Vue from 'vue'

export function getAllSaledProducts(state, payload) {
    state.saledProducts = payload
}

export function storeSaledProduct(state, payload) {
    state.saledProducts.unshift(payload)
}


export function deleteSaledProduct(state, id) {
    var index = state.saledProducts.findIndex(x => x.id === id)
    Vue.delete(state.saledProducts, index)
}

export function setIncome(state, data) {
    state.incomeArr = data
}

export function getIncome(state, data) {
    state.income = data
}