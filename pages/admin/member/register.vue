<template>
  <v-container>
    <v-row height="100vh" justify="center">
      <v-col cols="12">
        <v-btn
          icon
          color="error"
          class="ml-3"
          @click="back"
        >
        <v-icon>mdi-arrow-left</v-icon>
        戻る
        </v-btn>
      </v-col>
      <v-flex>
        <v-col cols="12" md="6" class="mx-auto text-center mb-md-6">
          <h1>スタッフ登録</h1>
        </v-col>
        <v-col cols="12" md="6" class="mx-auto">
          <validation-observer ref="obs" v-slot="ObserverProps">
          <v-form class="px-3">
            <!-- Name -->
              <validation-provider
                v-slot="ProviderProps"
                rules="required|max:10"
                name="名前"
              >
                <v-text-field
                  v-model="name"
                  label="名前"
                  dense
                  flat
                  counter="10"
                  height="24"
                  class="mb-3 mb-md-6"
                  :error-messages="ProviderProps.errors[0]"
                >
                </v-text-field>
              </validation-provider>

              <!-- メールアドレス -->
              <validation-provider
                v-slot="ProviderProps"
                rules="required|email"
                name="メールアドレス"
              >
                <v-text-field
                  v-model="email"
                  label="メールアドレス"
                  dense
                  flat
                  type="email"
                  height="24"
                  class="mb-3 mb-md-6"
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
                  height="24"
                  class="mb-3 mb-md-6"
                  :error-messages="ProviderProps.errors[0]"
                >
                </v-text-field>
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
                  dense
                  flat
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  height="24"
                  class="mb-3 mb-md-6"
                  :error-messages="ProviderProps.errors[0]"
                >
                </v-text-field>
              </validation-provider>

              <v-col class="d-flex pa-0">
                <v-checkbox
                  label="admin"
                  v-model="role_id"
                  class="mt-0"
                  value="1"
                  color="error"
                ></v-checkbox>

                <v-checkbox
                  label="staff"
                  v-model="role_id"
                  class="mt-0 ml-6"
                  value="2"
                  color="error"
                ></v-checkbox>
              </v-col>

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
                :disabled="ObserverProps.invalid || !ObserverProps.validated"
                @click="register"
              >
                送信
              </v-btn>
            </v-col>

          </v-form>
          </validation-observer>
        </v-col>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    middleware: 'auth',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '',
        show1: false,
        show2: false,
        error: [],
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
          this.$router.push('/admin/member')
        } catch(error) {
          this.errors = error.response.data.errors
        }
      },
      reset() {
        this.name = '',
        this.email = '',
        this.password = '',
        this.password_confirmation = '',
        this.select = '',
        this.$refs.obs.reset()
      },
      back() {
      this.$router.push('/admin/member')
    }
    }
  }
</script>