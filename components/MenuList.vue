<template>
  <v-simple-table class="pa-0">
    <template>
      <thead>
        <tr>
          <th class="pa-1 pa-md-4 text-left text-md-subtitle-1">
            料理名
          </th>
          <th class="pa-1 pa-md-4 text-center text-md-subtitle-1">
            編集
          </th>
          <th class="pa-1 pa-md-4 text-center text-md-subtitle-1">
            削除
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in menus"
          :key="item.id"
        >
          <!-- 料理名 -->
          <td class="pa-1 pa-md-4 text-left text-caption text-md-body-1">{{ item.title }}</td>
          <!-- 編集 -->
          <td class="pa-1 pa-md-4 text-center"><v-btn icon color="success" @click="menuEdit(item.id)"><v-icon class="text-caption text-md-h6">mdi-pencil</v-icon></v-btn></td>
          <!-- 削除 -->
          <td class="pa-1 pa-md-4 text-center"><v-btn icon color="error" @click="menuDelete(item.id)"><v-icon class="text-caption text-md-h6">mdi-delete</v-icon></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data() {
      return {
        menus: [],
      }
    },
    mounted() {
      this.$axios.$get('/api/menu')
      .then(res => {
        this.menus = res.data
      })
    },
    methods: {
      menuEdit(id) {
        this.$router.push('/admin/menu/' + id);
      },
      menuDelete(id) {
        this.$axios.$delete('/api/menu/' + id);
      }
    },
    // filters: {
    //   omittedText(text) {
    //     return text.length > 2 ? text.slice(0, 2) + '...' : text;
    //   },
    //   omittedText_2(text) {
    //     return text.length > 4 ? text.slice(0, 4) + '...' : text;
    //   },
    //   omittedText_3(text) {
    //     return text.length > 8 ? text.slice(0, 8) + '...' : text;
    //   },
    // }
  }
</script>
