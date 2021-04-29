<template>
    <Message text="Teste"/>
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
</style>