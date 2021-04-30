<template>
    <div class="ChatArea">
        <v-card class="ChatTopArea">
            <div class="mb-3" v-for="(messageObj, index) in messageList" :key="index">
                <TimeMessage v-if="messageObj.type == 'time_message'" :text="messageObj.content"/>
                <Message v-else :text="messageObj.content"/>
            </div>
        </v-card>
        <v-card class="ChatBottomArea">
            <v-row>
                <RecordedMessage text="Bom dia!" />
                <RecordedMessage class="mx-4" text="Tudo bem com você ?" />
                <RecordedMessage text="Tudo Bem !" />
            </v-row>
            <v-row>
                <InputTextChat class="mr-4"/>
                <AppointmentClock />
            </v-row>
        </v-card>
    </div>
</template>

<script>
    import TimeMessage from "../components/TimeMessage";
    import InputTextChat from "../components/InputTextChat";
    import AppointmentClock from "../components/AppointmentClock";
    import RecordedMessage from "../components/RecordedMessage";
    import Message from '../components/Message.vue';

    export default {
        name: "Chat",
        components: {
            TimeMessage,
            InputTextChat,
            AppointmentClock,
            RecordedMessage,
            Message,
        },
        data: function() {
            return {
                messageList: [
                    {
                        type: "time_message",
                        content: "esse texto n vai ser usado"
                    },
                    {
                        type: "message",
                        content: "esse texto vai ser usado"
                    },
                    {
                        type: "message",
                        content: "esse texto vai ser usado 2"
                    },
                    {
                        type: "message",
                        content: "esse texto vai ser usado 3"
                    },
                    {
                        type: "message",
                        content: "esse texto vai ser usado 4"
                    }
                    ],
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
        height: 70vh;
        width: 100vw;
        overflow-y: scroll;
        background-color: #FAFAFA; 
    }

    .ChatBottomArea {
        width: 100vw;
        height: 30vh;
        padding-top: 2vw;
        padding-right: 5vw;
        padding-left: 5vw;
        overflow-y: inherit;
        background-color: #FAFAFA; 
    }

</style>