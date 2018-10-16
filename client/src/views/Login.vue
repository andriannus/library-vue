<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form @submit.prevent="loginProcess()">
          <v-card>
            <v-card-title>
              <h3 class="title">Login</h3>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="E-mail"
                    v-model="user.email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Password"
                    type="password"
                    v-model.number="user.password"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
              <v-btn flat to="/register">Register</v-btn>
              <v-spacer></v-spacer>

              <v-btn flat color="info" type="submit">Submit</v-btn>
              <v-btn flat @click="reset()">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  metaInfo: {
    title: 'Login',
  },
})

export default class Login extends Vue {
  private user = {};

  private loginProcess() {
    const user = this.user;

    this.$store.dispatch('AUTH_REQUEST', user)
      .then(() => {
        this.$router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private reset() {
    this.user = {};
  }
}
</script>
