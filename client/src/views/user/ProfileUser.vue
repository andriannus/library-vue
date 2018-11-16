<template>
  <v-container>
    <v-layout
      row
      wrap
      justify-center
    >
      <v-flex md4 sm6>
        <v-card>
          <v-card-title class="title">
            Profile User
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <div class="text-xs-center mb-4">
              <v-avatar
                class="avatar"
                color="grey"
                size="100"
              >
                <span class="white--text headline">
                  {{ firstCharacter }}
                </span>
              </v-avatar>
            </div>

            <strong>Name</strong>
            <p>{{ user.name }}</p>

            <strong>Username</strong>
            <p>{{ user.username }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.avatar:hover {
  cursor: pointer;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  metaInfo: {
    title: 'Profile User',
  },
})

export default class ProfileUser extends Vue {
  private user = {} as any;

  private mounted() {
    this.user = this.$store.state.user;
  }

  private get firstCharacter() {
    const name = String(this.user.name);
    return name.charAt(0).toUpperCase();
  }
}
</script>
