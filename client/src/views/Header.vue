<template>
  <div>
    <Navigation />

    <v-content>
      <router-view />
    </v-content>

    <v-footer app absolute>
      <v-layout justify-center row wrap>
        <v-flex text-xs-center py-3>
          &copy; 2018 - Library App with Vue
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';

@Component({
  metaInfo: {
    titleTemplate: '%s - Library App Vue',
  },

  components: {
    Navigation,
  },
})

export default class Header extends Vue {}
</script>
