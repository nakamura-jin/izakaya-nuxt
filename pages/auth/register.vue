<template>
  <v-container>
    <v-row justify="center" style="height:100vh" align-content="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-subtitle-1 text-md-h6 py-2 error">登録</v-card-title>
          <validation-observer ref="obs" v-slot="ObserverProps">
            <v-form class="pa-3">
              <!-- Name -->
              <validation-provider
                v-slot="ProviderProps"
                rules="required|max:10"
                name="名前"
              >
                <v-text-field
                  label="名前"
                  v-model="name"
                  counter="10"
                  height="30"
                >
                </v-text-field>
                <span class="text-md-subtitle-2 text-caption" style="color: red;">{{ ProviderProps.errors[0] }}</span>
              </validation-provider>

              <!-- メールアドレス -->
              <validation-provider
                v-slot="ProviderProps"
                rules="required|email"
                name="メールアドレス"
              >
                <v-text-field
                  label="メールアドレス"
                  v-model="email"
                  type="email"
                  height="30"
                >
                </v-text-field>
                <span class="text-md-subtitle-2 text-caption" style="color: red;" >{{ ProviderProps.errors[0] }}</span>
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
                  counter="min"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  height="30"
                >
                </v-text-field>
                <span class="text-md-subtitle-2 text-caption" style="color: red;">{{ ProviderProps.errors[0] }}</span>
              </validation-provider>

              <!-- パスワード確認 -->
              <validation-provider
                v-slot="ProviderProps"
                rules="required|min:8|alpha_num|confirmed:パスワード"
                name="パスワード確認"
              >
                <v-text-field
                  label="パスワード確認"
                  v-model="password_confirmation"
                  counter="min"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  height="30"
                >
                </v-text-field>
                <span class="text-md-subtitle-2 text-caption" style="color: red;">{{ ProviderProps.errors[0] }}</span>
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
                  class="ml-4"
                  @click="register"
                  :disabled="ObserverProps.invalid || !ObserverProps.validated"
                >
                  送信
                </v-btn>
              </v-col>

            </v-form>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: 3,
        show1: false,
        show2: false,
        error: []
      }
    },
    methods: {
      async register() {
        try{
          await this.$axios.$get('sanctum/csrf-cookie')
          await this.$axios.$post('/api/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            role_id: this.role_id
          })
          this.$router.push('/auth/done')
        } catch(error) {
          this.errors = error.response.data.errors
        }
      },
      reset() {
        this.name = '',
        this.email = '',
        this.password = '',
        this.password_confirmation = '',
        this.$refs.obs.reset()
      }
    }
  }
</script>