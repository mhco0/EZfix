<template> 
    <Message :text="text"><input type="text"/></Message>
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
