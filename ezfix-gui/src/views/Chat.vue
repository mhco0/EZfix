<<<<<<< HEAD
<template>
    <div class="ChatArea">
        <v-card id="chat-top-area-id" class="ChatTopArea">
            <v-row class="mb-6" v-for="(messageObj, index) in messageList" :key="index">
                <v-col cols="12">
                    <v-row class="ma-0" :justify="isProvider ? 'start' : 'end' " v-if="messageObj.sender === 'client'">
                        <div name='div-message'>
                            <TimeMessage v-if="messageObj.type == 'time_message'" :appointments="messageObj.appointments"/>
                            <Message v-else :text="messageObj.content"/>
                        </div>
                    </v-row>
                    <v-row class="ma-0" :justify="isProvider ? 'end' : 'start' " v-if="messageObj.sender === 'provider'">
                        <div>
                            <TimeMessage v-if="messageObj.type == 'time_message'" :appointments="messageObj.appointments"/>
                            <Message v-else :text="messageObj.content"/>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
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
    import ChatApi from "../api/chat";

    export default {
        name: "Chat",
        create: function () {
            this.fetchMessagesFromServer();
        },
        mounted: function() {
            this.isProvider = (this.$route.params.provider_id !== undefined)  ? true : false;
            this.service_id = this.$route.params.service_id;
            this.sender = this.isProvider ? "provider" : "client";

            this.pollData()
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
            async sendMessageToServer(content_text){
                let obj = {
                    sender : this.sender,
                    type: "message", 
                    content: content_text, 
                    appointments: []
                };

                await ChatApi.sendMessage(this.service_id, JSON.stringify(obj));
                let response = await ChatApi.fetchMessageLists(this.service_id);

                if(!response.data.failure){
                    this.messageList = JSON.parse(response.data.bytes);
                    console.log(this.messageList);
                }
            },

            async sendTimeMessageToServer(appointments_array){
                let new_appointments_arr = [];
                // Vue can't let you assing the direct array
                // Eu posso refatorar aqui usando o JSON.strigifly and JSON.parse para fazer a deep copy dos objetos
                appointments_array.forEach(element => {
                    new_appointments_arr.push({begin: element.begin, end:element.end});
                });

                let obj = {
                    sender : this.sender,
                    type: "time_message", 
                    content: '', 
                    appointments: new_appointments_arr
                };

                await ChatApi.sendMessage(this.service_id, JSON.stringify(obj));
                let response = await ChatApi.fetchMessageLists(this.service_id);

                if(!response.data.failure){
                    this.messageList = JSON.parse(response.data.bytes);
                }
            },

            async fetchMessagesFromServer(){
                let response = await ChatApi.fetchMessageLists(this.service_id);

                if(!response.data.failure){
                    this.messageList = JSON.parse(response.data.bytes);
                }
            },

            pollData(){
                window.setInterval(() => {
                    //let elem = document.getElementById('chat-top-area-id');
                    //elem.scrollTop = elem.scrollHeight;
                    this.fetchMessagesFromServer();
                }, 300)
            },
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

=======
<template>
    <div class="ChatArea">
        <v-card id="chat-top-area-id" class="ChatTopArea">
            <v-row class="mb-6" v-for="(messageObj, index) in messageList" :key="index">
                <v-col cols="12">
                    <v-row class="ma-0" :justify="isProvider ? 'start' : 'end' " v-if="messageObj.sender === 'client'">
                        <div name='div-message'>
                            <TimeMessage v-if="messageObj.type == 'time_message'" :appointments="messageObj.appointments"/>
                            <Message v-else :text="messageObj.content"/>
                        </div>
                    </v-row>
                    <v-row class="ma-0" :justify="isProvider ? 'end' : 'start' " v-if="messageObj.sender === 'provider'">
                        <div>
                            <TimeMessage v-if="messageObj.type == 'time_message'" :appointments="messageObj.appointments"/>
                            <Message v-else :text="messageObj.content"/>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
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
    import Message from "../components/Message";
    import ChatApi from "../api/chat";

    export default {
        name: "Chat",
        mounted: function() {
            this.isProvider = (this.$route.params.provider_id !== undefined)  ? true : false;
            this.service_id = this.$route.params.service_id;
            this.sender = this.isProvider ? "provider" : "client";

            this.pollData()
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
                service_id: null,
                sender: "",
                isProvider: false
            };
        },
        methods: {
            sendMessageToServer(content_text){
                let obj = {
                    sender : this.sender,
                    type: "message", 
                    content: content_text, 
                    appointments: []
                };

                ChatApi.sendMessage(this.service_id, JSON.stringify(obj)).then(() => {
                    this.fetchMessagesFromServer();
                });
            },

            sendTimeMessageToServer(appointments_array){
                let new_appointments_arr = [];
                // Vue can't let you assing the direct array
                // Eu posso refatorar aqui usando o JSON.strigifly and JSON.parse para fazer a deep copy dos objetos
                appointments_array.forEach(element => {
                    new_appointments_arr.push({begin: element.begin, end:element.end});
                });

                let obj = {
                    sender : this.sender,
                    type: "time_message", 
                    content: '', 
                    appointments: new_appointments_arr
                };

                ChatApi.sendMessage(this.service_id, JSON.stringify(obj)).then(() => {
                    this.fetchMessagesFromServer();
                });
            },

            fetchMessagesFromServer(){
                ChatApi.fetchMessageLists(this.service_id).then((res) => {
                    if(!res.data.failure){
                        this.messageList = JSON.parse(res.data.bytes);
                    }
                });
            },

            pollData(){
                window.setInterval(() => {
                    //let elem = document.getElementById('chat-top-area-id');
                    //elem.scrollTop = elem.scrollHeight;
                    this.fetchMessagesFromServer();
                }, 300)
            },
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
>>>>>>> efb96aac42b5a32b8866007f1fc7036a65fc990c
</style>