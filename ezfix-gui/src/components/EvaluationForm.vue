<template>
    <v-dialog value="true" max-width="1000">
        <v-card>
            <v-card-title class="text-h4">
                Add a review to {{service_provider_name}}...
            </v-card-title>

            <v-card-text>
                <v-row align="center">
                    <v-col sm="8" cols="12">
                        <EvaluationBar label="Attendance" @rating="attendance_rating=$event" />
                        <EvaluationBar label="Punctuality" @rating="punctuality_rating=$event" />
                        <EvaluationBar label="Service Quality" @rating="service_quality_rating=$event" />
                    </v-col>
                    <v-col sm="4" cols="12">
                        <v-avatar size="200">
                            <img
                                src="https://cdn.vuetifyjs.com/images/john.jpg"
                                alt="Flávio"
                            >
                        </v-avatar>
                    </v-col>
                </v-row>
                
                <v-row>
                    <TextArea />
                </v-row>
            </v-card-text>

            <v-card-actions>
                <EvaluationBar class="mx-2" label="Evaluate EZfix" @rating="ezfix_rating=$event" justify="start" />
                <v-spacer></v-spacer>
                <v-btn color="primary black--text" rounded @click="save_evaluation">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import EvaluationBar from "../components/EvaluationBar"
import TextArea from "../components/TextArea"
import evaluation from "../api/evaluation"

export default {
    data: () => ({
        attendance_rating: 0,
        punctuality_rating: 0,
        service_quality_rating: 0,
        ezfix_rating: 0,
    }),
    props: {
        service_id: String,
        service_provider_name: String,
    },
    components: {
        EvaluationBar,
        TextArea,
    },
    methods: {
        evaluate: evaluation.evaluate,
        save_evaluation(){
            this.evaluate(
                this.service_id, 
                this.attendance_rating, 
                this.punctuality_rating, 
                this.service_quality_rating, 
                this.ezfix_rating
            );

            this.$emit("close_EvaluationForm");
        }
    },
}
</script>
