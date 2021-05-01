<template>
    <v-row>
        <v-card elevation="4" class="rounded-xl">
            {{text}}
            <slot/>
        </v-card>
    </v-row>
</template>

<script>
    export default {
        name: "Message",
        props: {
            text: {
                type: String,
                default: ""
            },
        },
        methods: {
            setMessageText(newText){
                this.text = newText;
            }
        }
    }
</script>

<style scoped>
    .v-card {
        padding-right: 1.5vw;
        padding-left: 1.5vw;
        padding-top: 0.5vh;
        padding-bottom: 0.5vh;
        max-width: 40vw; 
        margin-top : 1vh;
        margin-bottom: 1vh;
        color: white;
        background-color: rgba(33, 120, 183, 0.5);
    }
</style>