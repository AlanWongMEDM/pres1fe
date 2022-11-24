<template>
    <div class="py-2 px-2" v-for="(item, i) in items" :key='i'>
        This is Mock Form.
        <br>
        Current Form ID : {{ item.id }}
        <br>
        Mock Name : {{ item.name }}
        <br>
        Question : {{ item.question }}
    </div>
    <div class="py-2 px-2">
        <v-btn to="/Mock" color="secondary">Back to mock main page</v-btn>
    </div>    
</template>

<script>
import MockService from '../services/mock.service';
export default {
    name: "MockForm",
    data() {
      return {
        items : [],
      };
    },
    mounted() {
      this.mockform();
    },
    methods: {
        async mockform() {
        // Init variables
            MockService.mockform(this.$route.params.id)
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