<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-form @submit="resetPassword">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">Փոխել գաղտնաբառը</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> Ընթացիկ գաղտնաբառ </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  v-model="current_password"
                  filled
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    val => $v.current_password.required,
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> Նոր գաղտնաբառ </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  v-model="new_password"
                  filled
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    val => $v.new_password.required,
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> Հաստատեք նոր գաղտնաբառը </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  v-model.trim="$v.confirm_new_password.$model"
                  filled
                  :type="isPwd ? 'password' : 'text'" :error="!$v.confirm_new_password.sameAsPassword"
                  :error-message="confirmError"
                  :rules="[
                    val => $v.confirm_new_password.required,
                    val => $v.confirm_new_password.sameAs,
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn type="submit" :disabled="$v.$invalid" class="text-capitalize bg-primary text-white"
              >Պահպանել</q-btn
            >
          </q-card-actions>
        </q-form>
        
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex'
import { Notify } from 'quasar'

export default {
  name: "UserProfile",
  data() {
    return {
      isPwd: true,
      current_password: "",
      new_password: "",
      confirm_new_password: "",
      confirmError: "Գաղտնաբառերը չեն համընկնում",
    };
  },
    computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
    formError() {
      return this.$store.getters['auth/getErrors']
    }
  },
  methods: {
    ...mapActions({
      reset: 'auth/reset'
    }),
    resetPassword() {
     this.reset({
        email: this.user.email,
        current_password: this.current_password,
        new_password: this.new_password,
      })
    }
  },
  validations: {
      current_password: {required},
      new_password: {required},
      confirm_new_password: {required},

      confirm_new_password: {
        sameAsPassword: sameAs('new_password')
      }
  },
};
</script>
