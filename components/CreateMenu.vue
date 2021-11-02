<template>
  <v-container>
    <v-row justify="center" height="100vh">
      <v-col md="6" sm="10" class="pt-0">
        <validation-observer ref="observer" v-slot="{invalid}">
          <v-form>
            <!-- 料理名 -->
            <validation-provider
              rules="required"
              name="料理名"
              v-slot="ProviderProps"
            >
              <v-text-field
                label="料理名"
                v-model="title"
                class="mb-2 text-md-h6 mb-md-8"
                solo
                dense
                hide-details="false"
                height="20"
                prepend-icon="mdi-beer"
                >
              </v-text-field>
              <p class="text-caption mb-2 ml-8 error" >{{ ProviderProps.errors[0] }}</p>
            </validation-provider>

            <!-- 説明 -->
            <validation-provider
              rules="required|max:40"
              name="説明"
              v-slot="ProviderProps"
            >
              <v-textarea
                v-if="$vuetify.breakpoint.xs"
                label="説明(40字以内)"
                v-model="discription"
                background-color
                solo
                rows="2"
                class="mb-4 text-md-h6"
                hide-details="false"
                dense
                prepend-icon="mdi-pencil mt-8"
              >
              </v-textarea>
              <!-- レスポンシブ -->
              <v-textarea
                filled
                v-else
                label="説明"
                v-model="discription"
                background-color
                solo
                rows="8"
                auto-grow
                class="mb-4 text-md-h6"
                hide-details="false"
                dense
                prepend-icon="mdi-pencil mt-8"
              >
              </v-textarea>
              <p class="text-caption mb-2 ml-8 error" >{{ ProviderProps.errors[0] }}</p>
            </validation-provider>

            <!-- タグ -->
            <validation-provider
              rules="required"
              name="タグ"
              v-slot="ProviderProps"
            >
            <v-col class="pl-0 pt-md-6">
              <v-icon>mdi-tag-outline</v-icon>
              <span>タグ</span>
            </v-col>
            <v-col class="d-flex pa-0 flex-wrap mb-xs-5 mb-6">
              <v-checkbox
                label="肉料理"
                v-model="tag_id"
                class="mt-0"
                value="1"
                color="error"
                hide-details="false"
              ></v-checkbox>

              <v-checkbox
                label="揚げ物"
                v-model="tag_id"
                class="mt-0 ml-6"
                value="2"
                color="error"
                hide-details="false"
              ></v-checkbox>

              <v-checkbox
                label="野菜料理"
                v-model="tag_id"
                class="mt-0 ml-md-6"
                value="3"
                color="error"
                hide-details="false"
              ></v-checkbox>

              <v-checkbox
                label="ごはんもの"
                v-model="tag_id"
                class="mt-0 ml-6"
                value="4"
                color="error"
                hide-details="false"
              ></v-checkbox>
            </v-col>
            <p class="text-caption mb-2 ml-8 error" >{{ ProviderProps.errors[0] }}</p>
            </validation-provider>

            <!-- 金額 -->
            <validation-provider
              rules="required|numeric"
              name="料金"
              v-slot="ProviderProps"
            >
              <v-text-field
                label="料金"
                v-model="price"
                class="mb-2"
                dense
                solo
                hide-details="false"
                prepend-icon="mdi-cash-register"
              >
              </v-text-field>
              <p class="text-caption mb-2 ml-8 error" >{{ ProviderProps.errors[0] }}</p>
            </validation-provider>

          <!-- 写真 -->
            <validation-provider
              rules="required|image"
              name="写真"
              v-slot="ProviderProps"
            >
              <v-file-input
                label="写真"
                v-model="image"
                class="mb-5"
                ref="file"
                dense
                solo
                show-size
                hide-details="false"
                prepend-icon="mdi-camera"
              ><v-icon>mdi-camera</v-icon>
              </v-file-input>
              <p class="text-caption mb-2 ml-8 error" >{{ ProviderProps.errors[0] }}</p>
              </validation-provider>
          </v-form>

          <v-col class="text-right">
            <!-- <v-btn @click="preview"></v-btn> -->
            <v-btn color="error" @click="resetMenu" >リセット</v-btn>
            <v-btn color="primary" class="ml-6" @click="open" :disabled="invalid">確認</v-btn>
          </v-col>
        </validation-observer>

      </v-col>
    </v-row>

    <!-- モーダル -->
    <template>
      <v-dialog
        v-model="dialog"
        max-width="400"
      >
      <v-card class="mb-4">
        <v-img :src="file"></v-img>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>{{ discription }}</v-card-text>
        <v-col class="d-flex mx-sm-auto" sm="10">
          <v-chip color="cyan">
            <v-icon left>
              mdi-label
            </v-icon>
            {{ tag_id }}
          </v-chip>

          <v-spacer></v-spacer>

          <v-chip label class="px-6" color="warning" style="color: black">¥{{ price }}</v-chip>
        </v-col>
      </v-card>
      <v-col class="text-right">
        <v-btn color="error" @click="dialog = false">閉じる</v-btn>
        <v-btn color="primary" @click="registerMenu" class="ml-6">登録</v-btn>
      </v-col>
      </v-dialog>
    </template>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      file: '',
      title: '',
      discription: '',
      tag_id: '',
      price: '',
      image: [],
      errors: []
    }
  },
  methods: {
    // モーダル
    open() {
      this.dialog = !this.dialog
      this.file = window.URL.createObjectURL(this.image);
      this.$refs.observer.validate()
        if(this.tag_id == 1) {
          this.tag_id = '肉料理'
        } else if(this.tag_id == 2){
          this.tag_id = '揚げ物'
        } else if(this.tag_id == 3){
          this.tag_id = '野菜料理'
        } else if(this.tag_id == 4){
          this.tag_id = 'ごはんもの'
        }
    },
    // 登録
    async registerMenu() {
      try
      {
        this.$refs.observer.validate()
        if(this.tag_id == '肉料理') {
          this.tag_id = 1
        } else if(this.tag_id == '揚げ物'){
          this.tag_id = 2
        } else if(this.tag_id == '野菜料理'){
          this.tag_id = 3
        } else if(this.tag_id == 'ごはんもの'){
          this.tag_id = 4
        }

        const data = new FormData()
        data.append('title', this.title);
        data.append('discription', this.discription);
        data.append('tag_id', this.tag_id);
        data.append('price', this.price);
        data.append('image', this.image);

        await this.$axios.$get('sanctum/csrf-cookie')
        await this.$axios.$post('/api/menu', data)
        this.$router.push('/admin/menu/completed_menu')
      } catch(error) {
        console.log(error)
      }
    },
    // リセット
    resetMenu() {
      this.title = '',
      this.discription = '',
      this.tag_id = '',
      this.price = '',
      this.image = []
      this.$refs.observer.reset()
    }
  }
}
</script>

<style>

</style>