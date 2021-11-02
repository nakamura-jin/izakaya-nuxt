<template>
  <v-container>
    <v-row justify="center" height="100vh">
      <v-col md="6" sm="10" class="pt-0">
        <validation-observer ref="observer" >
          <v-form>
            <!-- 料理名 -->
              <v-text-field
                :placeholder="menu.title"
                v-model="title"
                class="mb-2 text-subtitle-1 text-md-h6 mb-md-8"
                solo
                dense
                hide-details="false"
                height="20"
                prepend-icon="mdi-beer"
                >
              </v-text-field>

            <!-- 説明 -->
              <v-textarea
                v-if="$vuetify.breakpoint.xs"
                :placeholder="menu.discription"
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

            <!-- タグ -->
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

            <!-- 金額 -->
            <!-- <validation-provider
              rules="numeric"
              name="料金"
              v-slot="ProviderProps"
            > -->
              <v-text-field
                placeholder="料金"
                v-model="price"
                class="mb-2"
                dense
                solo
                hide-details="false"
                prepend-icon="mdi-cash-register"
              >
              </v-text-field>
              <!-- <p class="text-caption mb-2 ml-8 error" >{{ ProviderProps.errors[0] }}</p>
            </validation-provider> -->

          <!-- 写真 -->
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
          </v-form>

          <v-col class="text-right pt-0">
            <!-- <v-btn @click="preview"></v-btn> -->
            <v-btn color="error" @click="resetMenu" >リセット</v-btn>
            <v-btn color="primary" class="ml-6" @click="open">確認</v-btn>
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
        <v-img v-if="image == ''" :src="menu.image"></v-img>
        <v-img v-else :src="file" ></v-img>

        <v-card-title v-if="title == ''">{{ menu.title }}</v-card-title>
        <v-card-title v-else>{{ title }}</v-card-title>

        <v-card-text v-if="discription == ''">{{ menu.discription }}</v-card-text>
        <v-card-text>{{ discription }}</v-card-text>
        <v-col class="d-flex mx-sm-auto pt-0" sm="10">
          <v-chip color="cyan" v-if="tag_id == ''">
            <v-icon left>
              mdi-label
            </v-icon>
            {{ menu.tag_name }}
          </v-chip>

          <v-chip color="cyan" v-else>
            <v-icon left>
              mdi-label
            </v-icon>
            {{ tag_id }}
          </v-chip>


          <v-spacer></v-spacer>

          <v-chip v-if="price == ''" label class="px-6" color="warning" style="color: black">¥{{ menu.price }}</v-chip>
          <v-chip v-else label class="px-6" color="warning" style="color: black">¥{{ price }}</v-chip>

        </v-col>
      </v-card>
      <v-col class="text-right pt-0">
          <v-btn color="error" @click="closeDialog">閉じる</v-btn>
          <v-btn
            color="primary"
            @click="editMenu"
            class="ml-6"
            >登録</v-btn>
      </v-col>
      </v-dialog>
    </template>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
      id: this.$route.params.id,
      dialog: false,
      file: '',
      title: '',
      discription: '',
      tag_id: '',
      price: '',
      image: [],
    }
  },
  methods: {
    // モーダル
    async open() {
      this.dialog = !this.dialog
      if(this.image != '') {
        this.file = window.URL.createObjectURL(this.image);
      }
      // this.$refs.observer.validate()
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
    async editMenu() {
      try
      {
        if(this.tag_id == '肉料理' ) {
          this.tag_id = 1
        } else if(this.tag_id == '揚げ物'){
          this.tag_id = 2
        } else if(this.tag_id == '野菜料理'){
          this.tag_id = 3
        } else if(this.tag_id == 'ごはんもの'){
          this.tag_id = 4
        }

        if(this.title == '') {
          this.title = this.menu.title
        }

        if(this.discription == '') {
          this.discription = this.menu.discription
        }

        if(this.tag_id == '') {
          this.tag_id = this.menu.tag_id
        }

        if(this.price == '') {
          this.price = this.menu.price
        }

        // if(this.image == []) {
        //   this.image = this.menu.image
        // }

        const updateData = new FormData()
        updateData.append('title', this.title);
        updateData.append('discription', this.discription);
        updateData.append('tag_id', this.tag_id);
        updateData.append('price', this.price);
        updateData.append('image', this.image);

        let config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };

        config.headers['X-HTTP-Method-Override'] = 'PUT';

        for (let value of updateData.entries()) {
            console.log(value);
        }
        await this.$axios.$get('sanctum/csrf-cookie')
        await this.$axios.$post('/api/menu/' + this.id, updateData, config)
        .then(() => {
          this.$router.push('/admin/menu/updated_menu')
        })
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
      // this.$refs.observer.reset()
    },
    closeDialog() {
      this.dialog = false
      this.image = []
    }
  },
  async mounted() {
    await this.$axios.$get('/api/menu/' + this.id)
    .then(res => {
      this.menu = res.data
    })
  },
}
</script>

<style>

</style>