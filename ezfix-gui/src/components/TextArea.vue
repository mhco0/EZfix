<template>
    <v-card class="pa-5 rounded-xl ma-5" color="grey lighten-5" flat width="100%">
        <v-row>
            <v-col sm="2" cols="12">
                <div class="mt-5">
                    {{title}}:
                </div>
            </v-col>
            <v-col sm="10" cols="12">
                <v-textarea
                    outlined
                    auto-grow
                    full-width
                    label="Type here..."
                    background-color="white"
                    v-model="text"
                    @input="$emit('text', text)"
                ></v-textarea>
            </v-col>
        </v-row>

        <v-card-actions v-if="send_button">
            <v-spacer></v-spacer>
            <v-btn color="primary black--text" rounded @click="emit_send_click">Send</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        text: "",
    }),
    props: {
        title: {type: String, default: "Coment"},
        send_button: {type: Boolean, default: false}
    },
    methods: {
        emit_send_click(){
            this.$emit("send_click")
        }
    }
}
</script>