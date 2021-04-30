<template> 
    <Message text="Tenho os seguintes hórarios disponiveis. Qual deles fica melhor pra voçê ?"><input type="text"/></Message>
</template>

<script>
    import Message from "./Message.vue";

    export default {
        name: "TimeMessage",
        extends: Message,
        props: {
        },
        methods:{
        },
        components:{
            Message
        }
    }
</script>
