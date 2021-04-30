<template>
    <div class="ChatArea">
        <v-card class="ChatTopArea">
            <TimeMessage v-for="(messageText, index) in messageList" :key="index" :text="messageText"/>
        </v-card>
        <v-card class="ChatBottomArea">
            <v-row>
                <v-col>
                    <InputTextChat />
                </v-col>
                <v-col>
                    <AppointmentClock />
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    import TimeMessage from "../components/TimeMessage";
    import InputTextChat from "../components/InputTextChat";
    import AppointmentClock from "../components/AppointmentClock";

    export default {
        name: "Chat",
        components: {
            TimeMessage,
            InputTextChat,
            AppointmentClock,
        },
        data: function() {
            return {
                messageList: ["Teste com uma mensagem maior pra ver se o texto vai pra baixo hsauhaushauhsauhsuahuhahsauhsuaushauhsuahushauhsuahsuahushaushauhsuahsuahsuhaushaushaushaushuhsaushaushaushauhsuahsuahsuhaushahsuhauhsauhsuhahsuahsuahsuaushaushauhsu",
                 "Teste"],
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
        padding-top: 2vw;
        padding-right: 5vw;
        padding-left: 5vw;
        height: 20vh;
        overflow-y: inherit;
        background-color: #FAFAFA; 
    }
</style>