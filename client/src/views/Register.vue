<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form @submit.prevent="saveData()">
          <v-card>
            <v-card-title>
              <h3 class="title">Register</h3>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Name"
                    v-model="user.name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="E-mail"
                    v-model="user.email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Username"
                    v-model="user.username"
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
              <v-btn flat to="/login">Login</v-btn>
              <v-spacer></v-spacer>

              <v-btn flat color="info" type="submit">Submit</v-btn>
              <v-btn flat>Cancel</v-btn>
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
    title: 'Register',
  },
})

export default class Register extends Vue {
  private user = {};

  private saveData() {
    const user = this.user;

    this.axios.post('auth/register', user)
      .then((res) => {
        this.$router.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
