<template>
    <v-row justify="center" class="my-5">
        <v-card width="100%" class="rounded-xl" color="primary" rounded>
            <v-card-text class="pa-3 pl-10 black--text">
                {{client_name}}: {{coment}}
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>
export default {
    props: {
        client_name: String,
        coment: String,
    },
}
</script>