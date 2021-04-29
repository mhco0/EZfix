<template>
    <div class="ChatArea">
        <v-card class="ChatTopArea">
            <Message text="Teste com uma mensagem maior pra ver se o texto vai pra baixo hsauhaushauhsauhsuahuhahsauhsuaushauhsuahushauhsuahsuahushaushauhsuahsuahsuhaushaushaushaushuhsaushaushaushauhsuahsuahsuhaushahsuhauhsauhsuhahsuahsuahsuaushaushauhsu"/>
            <Message text="Teste"/>
        </v-card>
        <div class="ChatBottomArea">
            Bottom
        </div>
    </div>
</template>

<script>
    import Message from "../components/Message";

    export default {
        name: "Chat",
        components: {
            Message,
        },
        data: function() {
            return {
                messageList: [],
            };
        },
        methods: {
        },
    };
</script>

<style scoped>
    .ChatArea {
        max-height: calc(100vh - 56px);
        overflow-y: hidden;
    }

    .ChatTopArea {
        padding-top: 2vw;
        padding-right: 5vw;
        padding-left: 5vw;
        height: 80vh;
        overflow-y: inherit;
        background-color: #FAFAFA; 
    }

    .ChatBottomArea{
        height: 20vh;
        overflow-y: inherit;
    }
</style>