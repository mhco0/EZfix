<template>
    <v-card>{{text}}</v-card>
</template>

<script>
    export default {
        name: "Message",
        props: {
            text: {
                type: String,
                default: ""
            }
        },
        methods:{
            setMessageText(newText){
                this.text = newText
            }
        }
    }
</script>

<style scoped>
</style>