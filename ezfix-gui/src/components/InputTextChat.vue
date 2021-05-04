<template>
    <v-text-field
    id="chat-input-text-id"
    class="rounded-xl"
    append-icon="fas fa-envelope"
    v-model="text"
    placeholder="Digite aqui..."
    dark
    background-color="rgba(33, 120, 183, 0.5)"
    solo
    @click:append="sendMessage"
    @keydown.enter="sendMessage"
    ></v-text-field>
</template>

<script>
    export default {
        name: "InputTextChat",
        data: function(){
            return {
                text: ""
            }
        },
        props: {
        },
        methods: {
            sendMessage(){
                if (this.text !== ""){
                    this.$emit("send-message", this.text);
                    this.text = "";
                }
            }
        }
    }
</script>

<style scoped>
</style>