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

        <v-card class="pa-5 rounded-xl ma-5" color="grey lighten-5" flat width="100%" min-height="350">    
            <ReviewBar
                class="mx-5" 
                v-for="(review, i) in reviews_filtered"
                :key="i"
                :client_name="review.client_name"
                :coment="review.coment"
            />

            <v-card-actions>
                <v-row justify="center" align="center">
                    <div :style="{'position': 'absolute', 'bottom': '0'}">
                        <v-btn icon @click="previows_coments_page">
                            <v-icon>fas fa-arrow-left</v-icon>
                        </v-btn>
                        Page {{coments_page+1}} / {{Math.ceil(reviews.length/4)}}
                        <v-btn icon @click="next_coments_page">
                            <v-icon>fas fa-arrow-right</v-icon>
                        </v-btn>
                    </div>
                </v-row>
            </v-card-actions>
        </v-card>

        <TextArea title="Send a message" :send_button="true" />

        <v-row justify="center" class="ma-0">
            <v-btn color="primary" tile @click="call_payment_page">
                Contract now
                <v-icon class="ml-1" small>fas fa-tools</v-icon>
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
import ReviewBar from "../components/ReviewBar"
import TextArea from "../components/TextArea"
import evaluation_api from "../api/evaluation"

export default {
    data: () => ({
        coments_page: 0,
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
            {
                client_name: "Marcos",
                coment: "Thank you so much, my bathrom does not smell like penis anymore."
            },
        ]
    }),
    components: {
        ReviewBar,
        TextArea
    },
    computed: {
        reviews_filtered(){
            return this.reviews.slice(
                this.coments_page*4, 
                this.coments_page*4>this.reviews.length?this.reviews.length:this.coments_page*4+4
            )
        }
    },
    methods: {
        get_reviews_list: evaluation_api.get_reviews_list,
        previows_coments_page(){
            if(this.coments_page > 0){
                this.coments_page--;
            }
        },
        next_coments_page(){
            if(this.coments_page+1 < this.reviews.length/4){
                this.coments_page++;
            }
        },
        call_payment_page(){
            this.$router.push({ name: 'Payment', params: { provider_id: this.$route.params.provider_id } })
        }
    },
    mounted(){
        this.get_reviews_list(this.$route.params.provider_id).then((reviews) => {
            console.log(reviews)
        })
    }
}
</script>
