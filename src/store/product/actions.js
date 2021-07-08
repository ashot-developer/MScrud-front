import axios from 'axios';
import { Notify} from 'quasar'
import { axiosParams } from '../../services/consts';


export async function allProducts(context, payload) {
  await axios.get(axiosParams.url + '/products').then((res) => {
    context.commit('allProducts', res.data);
  })
}

export async function productsSkuList(context, payload) {
  await axios.get(axiosParams.url + '/products/getSkus').then((res) => {
    context.commit('productsSkuList', res.data);
  })
}

export function storeProducts(context, payload) {
  axios.post(axiosParams.url + '/products', payload).then((res) => {
    context.commit('storeProducts', res.data);
    Notify.create({
      type: "positive",
      message: "Ապրանքը հաջողությամբ ավելացվել է",
    });
  }).catch(function (error) {
    if (error.response.data) {
      Notify.create({
        type: "negative",
        message: "Տվյալ ապրանքը արդեն գոյություն ունի",
      });
    }
  });
}

export function deleteProduct(context, payload) {
  axios.delete(axiosParams.url + '/products/' + payload).then((res) => {
      context.commit('deleteProduct', payload)
      Notify.create({
        type: "positive",
        message: "Ապրանքը հաջողությամբ ջնջվել է",
      });
    }

  )
}

export function editProduct(context, payload) {
  axios.patch(axiosParams.url + '/products/' + payload.id, payload).then((res) => {
    
    context.commit('editProduct', res.data)
    Notify.create({
      type: "positive",
      message: "Ապրանքը հաջողությամբ թարմացվել է",
    });
  }
).catch(function (error) {
  if (error.response.data) {
    Notify.create({
      type: "negative",
      message: "Ինչ֊որ բան այն չէ",
    });
  }
});
}

export function changeProduct(context, payload) {
  context.commit('changeProduct', payload)
}
