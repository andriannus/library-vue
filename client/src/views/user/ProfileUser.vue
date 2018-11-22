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

            <v-card
              flat
              class="card-hover mb-4"
              @dblclick="edit('name')"
              v-if="!isEditName"
            >
              <v-card-text class="pa-2">
                <strong>Name</strong>
                <p class="mb-0">{{ user.name }}</p>
              </v-card-text>
            </v-card>

            <v-text-field
              box
              name="name"
              label="Name"
              v-model="name"
              :append-icon="`${isLoadingName ? 'mdi-timer-sand' : 'mdi-close'}`"
              @click:append="isEditName = !isEditName"
              @input="isTyping('updateName')"
              :disabled="isLoadingName"
              v-if="isEditName"
            ></v-text-field>

            <v-card
              flat
              class="card-hover mb-4"
              @dblclick="edit('username')"
              v-if="!isEditUsername"
            >
              <v-card-text class="pa-2">
                <strong>Username</strong>
                <p class="mb-0">{{ user.username }}</p>
              </v-card-text>
            </v-card>

            <v-text-field
              box
              name="username"
              label="Username"
              v-model="username"
              :append-icon="`${isLoadingUsername ? 'mdi-timer-sand' : 'mdi-close'}`"
              @click:append="isEditUsername = !isEditUsername"
              @input="isTyping('updateUsername')"
              :disabled="isLoadingUsername"
              v-if="isEditUsername"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <span class="grey--text">
              <em>Double click to edit</em>
            </span>
          </v-card-actions>
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
  border: 1px solid #fff;
  cursor: pointer;
}

.card-hover:hover {
  border: 1px solid #999;
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
  private debounce: any;
  private name = '';
  private username = '';
  private user = {} as any;
  private isEditName = false;
  private isEditUsername = false;
  private isLoadingName = false;
  private isLoadingUsername = false;

  private mounted() {
    this.user = this.$store.state.user;

    this.debounce = _.debounce((method: string) => {
      if (method === 'updateName') {
        this.updateName();
      }

      if (method === 'updateUsername') {
        this.updateUsername();
      }
    }, 2000);
  }

  private get firstCharacter() {
    const name = String(this.user.name);
    return name.charAt(0).toUpperCase();
  }

  private edit(type: string) {
    if (type === 'name') {
      this.name = this.user.name;
      this.isEditName = true;
    }

    if (type === 'username') {
      this.username = this.user.username;
      this.isEditUsername = true;
    }
  }

  private isTyping(method: string) {
    this.debounce(method);
  }

  private async updateName() {
    this.isLoadingName = true;

    const data = {
      _id: this.user._id,
      name: this.name,
    };

    const result = await this.axios.post('user/updateName', data);

    if (result) {
      this.$store.dispatch('AUTH_REFRESH', { _id: data._id })
        .then((res) => {
          this.user = this.$store.state.user;
          
          this.isEditName = false;
          this.isLoadingName = false;
        })
        .catch((err) => {
          // 
        });
    }
  }

  private updateUsername() {
    this.isLoadingUsername = true;

    setTimeout(() => {
      alert('OK Username');
      this.isLoadingUsername = false;
    }, 2000);
  }
}
</script>
