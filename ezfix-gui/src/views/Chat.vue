<template>
    <div class="ChatArea">
        <v-card class="ChatTopArea">
            <div class="mb-3" v-for="(messageObj, index) in messageList" :key="index">
                <TimeMessage v-if="messageObj.type == 'time_message'" :appointments="messageObj.appointments"/>
                <Message v-else :text="messageObj.content"/>
            </div>
        </v-card>
        <v-card class="ChatBottomArea">
            <v-row>
                <RecordedMessage @send-message="sendMessageToServer" text="Bom dia!" />
                <RecordedMessage @send-message="sendMessageToServer" class="mx-4" text="Oi, tudo bem com você ?" />
                <RecordedMessage @send-message="sendMessageToServer" text="Tudo Bem !" />
            </v-row>
            <v-row>
                <InputTextChat @send-message="sendMessageToServer" class="mr-4"/>
                <AppointmentClock @appointments-times="sendTimeMessageToServer" />
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
        mounted: function() {
            console.log('test creation');
        },
        components: {
            TimeMessage,
            InputTextChat,
            AppointmentClock,
            RecordedMessage,
            Message,
        },
        data: function() {
            return {
                messageList: [],
            };
        },
        methods: {
            sendMessageToServer(content_text){
                this.messageList.push({type: "message", content: content_text, appointments: []});
            },

            sendTimeMessageToServer(appointments_array){
                let new_appointments_arr = [];
                // Vue can't let you assing the direct array
                // Eu posso refatorar aqui usando o JSON.strigifly and JSON.parse para fazer a deep copy dos objetos
                appointments_array.forEach(element => {
                    new_appointments_arr.push({begin: element.begin, end:element.end});
                });

                this.messageList.push({type: "time_message", content: '', appointments: new_appointments_arr});
            }
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
        overflow-y: auto;
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