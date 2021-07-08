
import axios from 'axios';
import { Notify} from 'quasar'
import { axiosParams } from '../../services/consts';


export async function getAllSaledProducts(context, payload) {
    await axios.get(axiosParams.url + '/sales').then((res) => {
        
        context.commit('getAllSaledProducts', res.data)
    })
}

export function storeSaledProduct(context, payload) {
    axios.post(axiosParams.url + '/sales', payload).then((res) => {
        console.log(res.data)
        context.commit('storeSaledProduct', res.data);
        Notify.create({
            type: "positive",
            message: "Վաճառքը հաջողությամբ կատարվել է",
          });
    }).catch(function (error){

    })
}

export function deleteSaledProduct(context, id) {
    axios.delete(axiosParams.url + '/sales/' + id).then((res) => {
        context.commit('deleteSaledProduct', id)
        context.dispatch('products/changeProduct', res.data, { root:true })
        Notify.create({
          type: "positive",
          message: "Վաճառքը հաջողությամբ ջնջվել է",
        });
    })
}

export function getIncome(context, payload) {
    axios.post(axiosParams.url + '/income', payload).then((res) => {
        context.commit('getIncome', res.data);
    })
}
