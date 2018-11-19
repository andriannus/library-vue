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
              <v-tooltip bottom>
                <v-avatar
                  class="avatar"
                  color="grey"
                  size="100"
                  slot="activator"
                >
                  <span class="white--text headline">
                    {{ firstCharacter }}
                  </span>
                </v-avatar>
                <span>Change Picture</span>
              </v-tooltip>
            </div>

            <v-hover v-if="!isEditName">
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 2 : 0} mb-4`"
                @dblclick="isEditName = true"
              >
                <v-card-text class="card-hover pa-2">
                  <strong>Name</strong>
                  <p class="mb-0">{{ user.name }}</p>
                </v-card-text>
              </v-card>
            </v-hover>

            <v-text-field
              box
              name="name"
              label="Name"
              v-model="user.name"
              append-icon="mdi-close"
              @click:append="isEditName = !isEditName"
              v-if="isEditName"
            ></v-text-field>

            <v-hover v-if="!isEditUsername">
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 2 : 0}`"
                @dblclick="isEditUsername = true"
              >
                <v-card-text class="card-hover pa-2">
                  <strong>Username</strong>
                  <p class="mb-0">{{ user.username }}</p>
                </v-card-text>
              </v-card>
            </v-hover>

            <v-text-field
              box
              name="username"
              label="Username"
              v-model="user.username"
              append-icon="mdi-close"
              @click:append="isEditUsername = !isEditUsername"
              v-if="isEditUsername"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.avatar:hover {
  cursor: pointer;
  opacity: 0.5;
}

.card-hover {
  cursor: pointer;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

@Component({
  metaInfo: {
    title: 'Profile User',
  },
})

export default class ProfileUser extends Vue {
  private isEditName = false;
  private isEditUsername = false;
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
