<template>
    <v-sheet rounded>
      <v-card class="mx-auto px-5 py-5" max-width="500">
        <v-card-title class="text-center text-h4 pb-3">
        Pre S1<br>EngPlatform
      </v-card-title>      
      <v-form
        v-model:true="form"
        @submit.prevent="handleLogin" 
      >
          <v-text-field
            v-model="username"
            :readonly="loading"
            class="mb-2"
            clearable
            :label="'Login'"
            :placeholder="'Login'"
            :rules="[ v => !!v || 'Field is required' ]"
          ></v-text-field>
  
  
          <v-text-field
            v-model="password"
            :readonly="loading"
            :type="'password'"
            clearable
            :label="'Password'"
            :placeholder="'Password'"
            :rules="[ v => !!v || 'Field is required' ]"
          ></v-text-field>
  
        <br>
  
          <v-btn
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
          Login
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbartext }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar> 
    <v-overlay v-model="overlay"></v-overlay>   
  </template>
  
  <script lang="ts">
  import { useLocale } from 'vuetify'
  
  export default {
    name: "Login",
    setup () {
        const { t } = useLocale()
  
        return {
          t
        }
      },
    data() {
      return {
        form : {},
        username: "mp3a002",
        password: "summer", 
        loading: false,
        overlay: false, 
        message: "",
        snackbartext  : 'Login Fail',
        snackbar  : false,
      };
    },
    computed: {
      loggedIn() {
        //return this.$store.state.auth.status.loggedIn;
      },
    },
    methods: {
      handleLogin() {
        if(this.username != '' && this.password != '') {
          this.loading = true;
          this.overlay = true;
          this.$store.dispatch("auth/login", {username: this.username, password: this.password}).then(
            (result:any) => {
              if(result.resultCode == '0') {
                switch(result.user_type) {
                  default: this.$router.push("/Mock");
                }
              } else {
                this.loading = false;
                this.overlay = false;
                this.snackbar = true;
              }
              
            },
            (error: { response: { data: { message: any; }; }; message: any; toString: () => any; }) => {
              this.loading = false;
              this.overlay = false;
              this.snackbar = true;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                console.log(error);
            }
          );
        }
      },
    },
  };
  </script>
  