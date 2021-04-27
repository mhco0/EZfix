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
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import EvaluationBar from "../components/EvaluationBar"

export default {
    data: () => ({
        attendance_rating: 0,
        punctuality_rating: 0,
        service_quality_rating: 0,
    }),
    props: {
        service_provider_name: String,
    },
    components: {
        EvaluationBar,
    }
}
</script>
