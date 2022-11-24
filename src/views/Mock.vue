<template>
    <div class="py-2 px-2">
        This is Mock Page.
        
    </div>

    <div class="py-2 px-2" v-for="(item, i) in items" :key='i'>
        <v-btn :to="{ name: 'MockForm', params: { id: item.id }}" color="primary">{{ item.name }}</v-btn>
    </div>
</template>

<script>
import MockService from '../services/mock.service';
export default {
    name: "Mock",
    data() {
      return {
        items : [],
      };
    },
    mounted() {
      this.mock();
    },
    methods: {
        async mock() {
        // Init variables
            MockService.mock()
                .then(response => {
                //console.log(response);
                this.items[0] = response.data;
                })
                .catch(e => {
                //console.log(e);
                });          
        },
    }
}
</script>