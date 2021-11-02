<template>
  <v-simple-table class="pa-0">
    <template>
      <thead>
        <tr>
          <th class="pa-1 text-left text-md-subtitle-1">
            Name
          </th>
          <th class="pa-1 text-left text-md-subtitle-1">
            Email
          </th>
          <th class="pa-1 text-center text-md-subtitle-1">
            Role
          </th>
          <th class="pa-1 text-center text-md-subtitle-1">
            Edit
          </th>
          <th class="pa-1 text-center text-md-subtitle-1">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in members"
          :key="item.id"
        >
          <td class="pa-1 text-left text-caption text-md-body-1">{{ item.name|omittedText }}</td>
          <td class="pa-1 text-left text-caption text-md-body-1">{{ item.email|omittedText_2 }}</td>
          <td class="pa-1 text-center text-caption text-md-body-1">{{ item.role_name }}</td>
          <td class="pa-1 text-center"><v-btn icon color="primary" @click="memberEdit(item.id)"><v-icon class="text-caption text-md-h6">mdi-pencil</v-icon></v-btn></td>
          <td class="pa-1 text-center"><v-btn icon color="error" @click="memberDelete(item.id)"><v-icon class="text-caption text-md-h6">mdi-delete</v-icon></v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    data () {
      return {
        members: [],
      }
    },
    methods: {
      memberEdit(id) {
        this.$router.push('/admin/member/' + id);
      }
    },
    mounted() {
      this.$axios.$get('/api/member')
      .then((res) => {
        this.members = res.data
      })
    },
    filters: {
      omittedText(text) {
        return text.length > 2 ? text.slice(0, 2) + '...' : text;
      },
      omittedText_2(text) {
        return text.length > 4 ? text.slice(0, 4) + '...' : text;
      }
    }
  }
</script>
