<template>
    <v-layout style="min-width:320px;">
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon class="d-sm-none" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Modern</v-toolbar-title>

        <v-spacer></v-spacer>

        <span class="d-none d-sm-block" v-for="(item, i) in items" :key='i'>
        
        <v-btn stacked :prepend-icon="item.icon" @click="handleclick(item.to)">{{item.text}}</v-btn>
          </span>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="left"
        temporary
        
      >
      <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        @click="handleclick(item.to)"
        active-color="primary"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
      </v-navigation-drawer>
      <v-main>
        <slot />      
      </v-main>
    </v-layout>
</template>

<script lang="ts">
  export default {
    data: () => ({
      drawer: false,
      items: [
        {
          icon: 'mdi-cog-outline',
          text: 'SETTING',
          value: 'setting',
          to: 'Setting',
        },
        {
          icon: 'mdi-account',
          text: 'AVATAR',
          value: 'avatar',
          to: 'Avatar'
        },
        {
          icon: 'mdi-file-chart',
          text: 'REPORT',
          value: 'report',
          to: 'Report',
        },
        {
          icon: 'mdi-logout',
          text: 'LOGOUT',
          value: 'logout',
          to: 'Logout',
        },
      ],
    }),
    methods: {
      handleclick(v:any) {
        switch(v) {
          case 'Setting' : this.$router.push("/"+v); break;
          case 'Avatar' : this.$router.push("/"+v); break;
          case 'Report' : this.$router.push("/"+v); break;
          case 'Logout' :           
                          this.$store.dispatch("auth/logout").then(
                          (result:any) => {
                               this.$router.push("/");
                          }
                        ); 
                        break;
        }
      }
    }

  }
</script>