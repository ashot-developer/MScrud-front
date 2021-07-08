<template>
  <q-layout>
    
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../assets/av.jpg">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                TT Mobile
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
              @submit="submit()"
            >
              <q-input
                filled
                v-model="form.email"
                label="Էլ․ հասցե"
                lazy-rules
                :error="error" :error-message="errors"
                :rules="[
                  val => $v.form.email.required,
                ]"
              />

              <q-input
                type="password"
                filled
                v-model="form.password"
                label="Գաղտնաբառ"
                lazy-rules
                :rules="[
                  val => $v.form.password.required,
                ]"
              />

              <div class="text-center">
                <q-btn label="Մուտք" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
const axios = require('axios').default;
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

    export default {
        data() {
            return {
                form: {
                  email: '',
                  password: '',
                  device_name: 'browser'
                },
                dataNew: this.userData,
                error: false
            }
        },
        validations: {
          form: {
            email: {required},
            password: {required}
          }
        },
        methods: {
          ...mapActions({
            loginUs: 'auth/login'
            }),
          ...mapMutations({
            setUs: 'user/setUser'
            }),
          submit(){
            let a = this.loginUs(this.form)
          }
        },
        computed: {
          users() {
            return this.$store.getters['auth/user']
          },
          errors() {
            if(this.$store.getters['auth/getErrors']){
              this.error = true
            }
            return this.$store.getters['auth/getErrors']
          }
        }
    }
</script>

<style>

  .bg-image {
      background-image: url('../assets/bg.jpg');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
  }
</style>
