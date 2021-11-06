<template>
  <v-container>
    <v-row justify="center" style="height:500px" align="center">
      <v-col cols="12" md="4">
        <!-- <v-card max-width="400" class="mx-auto" origin="center center"> -->
          <v-card-title class="text-subtitle-1 text-md-h6 py-2 error" style="color: white">ログイン</v-card-title>
          <validation-observer ref="obs" v-slot="ObserverProps">
            <v-form class="pa-3">

              <!-- メールアドレス -->
              <validation-provider
                v-slot="ProviderProps"
                rules="required|email"
                name="メールアドレス"
              >
                <v-text-field
                  label="メールアドレス"
                  v-model="email"
                  dense
                  flat
                  type="email"
                  height="30"
                  :error-messages="ProviderProps.errors[0]"
                >
                </v-text-field>
              </validation-provider>

              <!-- パスワード -->
              <validation-provider
                v-slot="ProviderProps"
                rules="required|min:8|alpha_num"
                name="パスワード"
              >
                <v-text-field
                  label="パスワード"
                  v-model="password"
                  dense
                  flat
                  counter="min"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  :error-messages="ProviderProps.errors[0]"
                  height="30"
                >
                </v-text-field>
              </validation-provider>

              <v-col class="text-right">
                <v-btn
                  type="button"
                  color="error"
                  @click="reset"
                >
                  リセット
                </v-btn>
                <v-btn
                  type="button"
                  color="primary"
                  class="ml-8"
                  @click="login"
                  :disabled="ObserverProps.invalid || !ObserverProps.validated"
                >
                  ログイン
                </v-btn>
              </v-col>
            </v-form>
          </validation-observer>
        <!-- </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        show1: false,
      }
    },
    methods: {
      async login() {
        try{
          await this.$axios.$get('sanctum/csrf-cookie')
          .then(() => {
              this.$auth.loginWith('laravelSanctum', {data:{
              email: this.email,
              password: this.password
            },
          })
        })
        } catch(error) {
          alert(error)
        }
      },
      reset() {
        this.email = '',
        this.password = '',
        this.$refs.obs.reset()
      }
    }
  }
</script>