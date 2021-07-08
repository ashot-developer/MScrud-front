import axios from 'axios';
import { Notify } from 'quasar'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
axios.defaults.withCredentials = true;
import { axiosParams } from '../../services/consts';

export function login(context, payload){
    
    axios.get(axiosParams.url + '/sanctum/csrf-cookie').then(response => {
    axios.post(axiosParams.url + '/api/login', payload).then((res)=>{
        if(res.data){
          localStorage.setItem('token', res.data)
          context.commit('login', res.data)
          this.$router.push({name: 'dash'});
        }
      }).catch(function (error) {
        var mess = error.response.data.errors.email[0];
        context.commit('addErrorMessage', mess)
      });
    })
}

export function logout(context, payload){
  axios.get("http://tt-api.loc/api/logout").then((res) => {    
  context.commit('logout', payload)
  this.$router.push({name: 'loginR'});
    
  })
}

export function reset(context, payload){
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  axios.post(axiosParams.url + '/api/reset', payload).then((res) => {
    context.commit('reset', res.data)
    Notify.create({
      type: 'positive',
      message: 'Գաղտնաբառը թարմացվել է'
    })
  }).catch(function (error) {
    var mess = error.response.data.error;
    context.commit('addErrorMessage', mess)
    Notify.create({
      type: 'negative',
      message: "Ընթացիկ գաղտնաբառ գոյություն չունի"
    })
  });
}