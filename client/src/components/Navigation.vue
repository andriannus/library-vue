<template>
  <div>
    <v-toolbar app fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
      width="250"
    >
      <v-toolbar flat>
        <v-list-tile>
          <v-list-tile-title class="title">
            Library
          </v-list-tile-title>
        </v-list-tile>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-tile to="/" @click="setTitle">
          <v-list-tile-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Home
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/books" @click="setTitle">
          <v-list-tile-action>
            <v-icon>mdi-book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Books
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  public drawer = false;
  public title = '';

  public mounted() {
    this.setTitle();
    this.$root.$watch('setTitle', this.setTitle);
  }

  @Emit()
  public setTitle() {
    this.title = this.$route.meta.title;
  }
}
</script>
