<template>
  <v-container>
    <h1 class="mb-4 text-center">Staff List</h1>
      <v-col class="text-right">
        <v-btn color="primary" to="/admin/member/register">CREATE</v-btn>
      </v-col>
      <v-main class="pa-2">
        <MemberList />
      </v-main>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
