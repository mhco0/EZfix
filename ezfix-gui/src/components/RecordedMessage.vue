<template>
    <v-btn  color="grey--text" elevation="4" class="rounded-xl"  @click="sendMessage()">
        {{text}}
    </v-btn>
</template>

<script>
    export default {
        name : "RecordedMessage",
        props : {
            text : {
                type: String,
                default: ""
            },
        },
        methods:{
            sendMessage(){
                if (this.text !== ""){
                    this.$emit("send-message", this.text)
                }
            }
        }
    }
</script>

<style scoped>
    .v-btn{
        padding-right: 1.5vw;
        padding-left: 1.5vw;
        padding-top: 0.5vh;
        padding-bottom: 0.5vh;
        max-width: 40vw; 
        margin-top : 1vh;
        margin-bottom: 1vh;
        color: grey;
        background-color: rgba(239, 244, 248, 0.911);
    }
</style>