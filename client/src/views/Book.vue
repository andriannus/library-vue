<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>Books</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn round color="info">
        Add New
        <v-icon right>mdi-plus-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">

      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  metaInfo: {
    title: 'List of Books',
  },
})
export default class Book extends Vue {
  private items = [];
  private headers = [
    {
      text: 'Name',
      value: 'name',
    },
    {
      text: 'Author',
      value: 'author',
    },
    {
      text: 'Publisher',
      value: 'publisher',
    },
    {
      text: 'Total Pages',
      value: 'totalPages',
    },
    {
      text: 'ISBN',
      value: 'isbn',
    },
    {
      text: 'Release',
      value: 'release',
    },
    {
      text: 'Actions',
      sortable: false,
    },
  ];
}
</script>
