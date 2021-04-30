<template>
    <v-menu
    top
    :offset-y="offset"
    offset-x
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            icon
            color="white"
            dark
            large
            elevetion="4"
            v-bind="attrs"
            v-on="on"
            >
                <v-icon>far fa-clock</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
            v-for="(item, index) in items"
            :key="index"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default{
        name : "AppointmentClock",
        data : function(){
            return {
                items: [
                        { title: 'Click Me' },
                        { title: 'Click Me' },
                        { title: 'Click Me' },
                        { title: 'Click Me 2' },
                    ],
                offset: true,
            }
        },
        props: {    
        },
        methods:{
        }
    }
</script>

<style scoped>
    .v-btn {
        background-color: rgba(33, 120, 183, 0.5);
    }
</style>