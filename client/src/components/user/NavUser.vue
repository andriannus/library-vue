<template>
  <div>
    <v-toolbar app fixed>
      <v-icon medium color="green darken-3">mdi-book-open</v-icon>

      <v-toolbar-title>Library App</v-toolbar-title>

      <v-divider inset vertical class="ml-4"></v-divider>
      <v-toolbar-items>
        <v-btn flat to="/">Home</v-btn>
      </v-toolbar-items>

      <v-toolbar-items>
        <v-btn flat to="/book">Book</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu offset-y>
          <v-btn
            flat
            slot="activator"
          >
            <v-icon>mdi-settings</v-icon>
          </v-btn>
          
          <v-list>
            <v-list-tile
              to="/admin"
              v-if="this.$store.getters.isAdmin"
            >
              <v-list-tile-action>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                Admin Page
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile to="/profile">
              <v-list-tile-action>
                <v-icon>mdi-account</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                Profile
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile to="/logout" @click="logOut()">
              <v-list-tile-action>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                Logout
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  private logOut() {
    // Vuex Action
    this.$store.dispatch('AUTH_LOGOUT')
      .then(() => {
        this.$router.push('/login');
      });
  }
}
</script>
