<template> 
    <Message text="Tenho os seguintes hórarios disponiveis. Qual deles fica melhor pra voçê ?">
        <div class="mb-3 mt-3" v-for="(appointmentInterval, index) in appointments" :key="index">
            <label>
                <input class="mr-4" type="radio" :v-model="appointmentInterval">
                <span>{{appointmentInterval.begin}} - {{appointmentInterval.end}}</span>
                <br>
            </label>
        </div>
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
