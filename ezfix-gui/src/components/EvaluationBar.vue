<template>
    <v-row justify="center" class="my-5">
        <v-card min-width="30vw" class="rounded-xl" color="primary" rounded>
            <v-card-title class="pa-1">
                <v-row class="ma-0 mx-8 pa-0" align="center">
                    {{label}}:
                    <v-spacer></v-spacer>
                    <v-rating
                        v-model="rating"
                        background-color="yellow"
                        color="yellow"
                        @input="emit_rating"
                    ></v-rating>
                </v-row>
            </v-card-title>
        </v-card>                
    </v-row>
</template>

<script>
export default {
    data: () => ({
        rating: 0
    }),
    props: {
        label: String
    },
    methods: {
        emit_rating(){
            this.$emit("rating", this.rating)
        }
    }
}
</script>