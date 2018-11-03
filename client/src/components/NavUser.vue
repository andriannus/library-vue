<template>
  <div>
    <v-toolbar app fixed>
      <v-icon medium color="green darken-3">mdi-book-open</v-icon>

      <v-toolbar-title>Library App</v-toolbar-title>

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
export default class NavUser extends Vue{
  private logOut() {
    // Vuex Action
    this.$store.dispatch('AUTH_LOGOUT')
      .then(() => {
        this.$router.push('/login');
      });
  }
}
</script>
