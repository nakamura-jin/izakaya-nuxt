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
        <v-col cols="12" md="6" class="mx-auto text-center">
          <h1>スタッフ編集</h1>
        </v-col>
        <v-col cols="12" md="6" class="mx-auto">
          <v-form class="px-3" ref="obs">
            <!-- Name -->
              <validation-provider
                v-slot="ProviderProps"
                rules="max:10"
                name="名前"
              >
                <v-text-field
                  v-model="name"
                  :placeholder="member.name"
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
                rules="email"
                name="メールアドレス"
              >
                <v-text-field
                  v-model="email"
                  :placeholder="member.email"
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
                rules="min:8|alpha_num"
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
                rules="min:8|alpha_num|confirmed:パスワード"
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

                <v-checkbox
                  label="user"
                  v-model="role_id"
                  class="mt-0 ml-6"
                  value="3"
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
                @click="memberUpdate"
              >
                送信
              </v-btn>
            </v-col>

          </v-form>
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
        member: [],
        id: this.$route.params.id,
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
      async memberUpdate() {
        try{

          // 名前指定
          if(this.name == '') {
            this.name = this.member.name
          }

          // メールアドレス指定
          if(this.email == '') {
            this.email = this.member.email
          }

          // パスワード指定
          if(this.password == '') {
            this.password = this.member.password
          }

          // 権限指定
          if(this.role_id == '') {
            this.role_id = this.member.role_id
          }

          await this.$axios.$get('sanctum/csrf-cookie')
          await this.$axios.$put('/api/member/' + this.id, {
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
    },
    mounted() {
      this.$axios.$get('/api/member/' + this.id)
      .then((res) => {
        this.member = res.data
      })
    }
  }
</script>