<template>
  <v-simple-table class="pa-0">
    <template >
      <thead>
        <tr>
          <th class="pa-1 text-left text-md-subtitle-1">
            Name
          </th>
          <th class="pa-1 text-left text-md-subtitle-1">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in users"
          :key="item.id"
        >
          <td class="pa-1 text-left text-caption text-md-body-1">{{ item.name|omittedText }}</td>
          <td class="pa-1 text-left text-caption text-md-body-1">{{ item.email|omittedText_2 }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data () {
      return {
        users: [],
      }
    },
    mounted() {
      this.$axios.$get('/api/user_list')
      .then((res) => {
        this.users = res.data
      })
    },
    filters: {
      omittedText(text) {
        return text.length > 2 ? text.slice(0, 2) + '...' : text;
      },
      omittedText_2(text) {
        return text.length > 4 ? text.slice(0, 4) + '...' : text;
      }
    },
  }
</script>
