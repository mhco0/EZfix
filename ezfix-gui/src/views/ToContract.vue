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
import provider_api from "../api/provider"

export default {
    data: () => ({
        coments_page: 0,
        avatar_url: "",
        provider_name: "",
        provider_description: "",
        provider_average_evaluations: 0,
        provider_jobs_number: 0,
        reviews: [
            {
                client_name: "Thales",
                coment: "Very top!!! Amazing work, thank you."
            },
            {
                client_name: "Marcos",
                coment: " Thank you so much."
            },
            {
                client_name: "Marcos",
                coment: "Thank you so much."
            },
            {
                client_name: "Marcos",
                coment: "Thank you so much."
            },
            {
                client_name: "Marcos",
                coment: "Thank you so much."
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
        get_provider: provider_api.get_provider,
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
        this.get_reviews_list(this.$route.params.provider_id).then((response) => {
            response.data.coments.forEach(coment => {
                this.reviews.unshift(coment)
            });
        });

        this.get_provider(this.$route.params.provider_id).then((response) => {
            const provider = response.data.provider

            if(provider.avatar_url) this.avatar_url = provider.avatar_url
            this.provider_name = provider.first_name + " " + provider.last_name
            this.provider_description = provider.description
            this.provider_average_evaluations = provider.evaluations_average.toFixed(1);
            this.provider_jobs_number = provider.jobs_number
        })
    }
}
</script>
