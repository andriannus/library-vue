<template>
  <v-container fluid>
    <v-btn color="success" to="/book">Book</v-btn>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  metaInfo: {
    title: 'Home',
  },
})
export default class Home extends Vue {}
</script>
