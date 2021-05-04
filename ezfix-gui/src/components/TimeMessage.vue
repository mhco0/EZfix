<template> 
    <Message text="Tenho os seguintes hórarios disponiveis. Qual deles fica melhor pra voçê ?">
        <v-radio-group  class="mb-3 mt-3" v-model="radioGroup">
            <v-radio
            dark
            :ripple="false"
            v-for="(appointmentInterval, index) in appointments"
            :key="index"
            :label="appointmentInterval.begin + '-' + appointmentInterval.end"
            :value="appointmentInterval"
            ></v-radio>
        </v-radio-group>
    </Message>
</template>

<script>
    import Message from "./Message.vue";

    export default {
        name: "TimeMessage",
        extends: Message,
        data: function () {
            return {
            }  
        },
        props: {
            appointments: {
                type: Array
            },
        },
        methods:{
        },
        components:{
            Message
        }
    }
</script>
