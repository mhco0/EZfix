<template>
    <v-container>
        <v-card class="pa-5 py-0" outlined tile :style="{border: '3px solid'+$vuetify.theme.themes.light.primary}">
            <v-row justify="center" align="center" class="ma-0">
                <v-col sm="1" cols="12">
                    <v-row justify="center">
                        <v-avatar size="100">
                            <img :src="avatar_url">
                        </v-avatar>
                    </v-row>
                    <v-row justify="center" class="text-center">
                        {{provider_name}}
                    </v-row>
                </v-col>
                <v-col sm="11" cols="12">
                    <v-card class="pa-5 rounded-xl ma-5" color="grey lighten-5" flat width="100%">
                        {{provider_description}}

                        <v-card-actions>
                            {{provider_average_evaluations}}/5.0
                            <v-icon color="primary" x-small class="mx-1">fas fa-star</v-icon>
                            <div class="caption">
                                ({{provider_jobs_number}} Jobs)
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        
        <h1 class="mt-16">Reviews:</h1>

        <v-card class="pa-5 rounded-xl ma-5" color="grey lighten-5" flat width="100%">
            <ReviewBar
                class="mx-5" 
                v-for="(review, i) in reviews"
                :key="i"
                :client_name="review.client_name"
                :coment="review.coment"
            />
        </v-card>
    </v-container>
</template>

<script>
import ReviewBar from "../components/ReviewBar"

export default {
    data: () => ({
        avatar_url: "https://cdn.vuetifyjs.com/images/john.jpg",
        provider_name: "Flávio Playboy",
        provider_description: "Hi, as you already know my name is Flavio and I would love to help you! I have more than 5 years of experience in house cleaning. For me, nothing is more satisfiying then a good smelling bathroom. Fun fact, I am a architecture student and a use every money that I earn here to support my studies.",
        provider_average_evaluations: "4.8",
        provider_jobs_number: 27,
        reviews: [
            {
                client_name: "Thales",
                coment: "Very top!!! Amazing work, thank you."
            },
            {
                client_name: "Marcos",
                coment: " Thank you so much, my bathrom does not smell like penis anymore."
            },
            {
                client_name: "Marcos",
                coment: "Thank you so much, my bathrom does not smell like penis anymore."
            },
            {
                client_name: "Marcos",
                coment: "Thank you so much, my bathrom does not smell like penis anymore."
            },
        ]
    }),
    components: {
        ReviewBar,
    },
}
</script>
