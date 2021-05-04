<template>
    <v-menu
    top
    v-model="closeCondition"
    :close-on-content-click="false"
    :offset-y="offset"
    offset-x
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            id="appointment-clock-id"
            icon
            color="white"
            dark
            x-large
            elevetion="4"
            v-bind="attrs"
            v-on="on"
            >
                <v-icon>far fa-clock</v-icon>
            </v-btn>
        </template>
        <v-form
        v-if="closeCondition"
        required
        ref="SchedulesForm"
        >
            <v-list>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                >
                    <v-row class="ma-0">
                        <ClockPopup type="begin" :ref="'clock_menul' + index.toString()" :otherTime="item.end" @clock-change="item.begin = $event" clockLabel="Begin"/>
                        <ClockPopup type="end" :ref="'clock_menur' + index.toString()" :otherTime="item.begin" @clock-change="item.end = $event" clockLabel="End"/>
                    </v-row>
                </v-list-item>
                <v-list-item>
                    <v-row justify="center">
                        <v-btn class="mr-5"
                        id="check-appointment-id"
                        icon
                        color="white"
                        dark
                        small
                        elevetion="2"
                        @click="sendSchedules()"
                        >
                            <v-icon>fas fa-check</v-icon>
                        </v-btn>
                        <v-btn 
                        id="close-appointment-id"
                        icon
                        color="white"
                        dark
                        small
                        elevetion="2"
                        @click="cancelSchedules()"
                        >
                            <v-icon>fas fa-times</v-icon>
                        </v-btn>
                    </v-row>
                </v-list-item>
            </v-list>
        </v-form>
    </v-menu>
</template>

<script>
    import ClockPopup from "./ClockPopup";

    export default{
        name : "AppointmentClock",
        data : function(){
            return {
                closeCondition: false,
                items: [
                        { begin: '', end: '' },
                        { begin: '', end: '' },
                        { begin: '', end: '' },
                        { begin: '', end: '' },
                    ],
                offset: true,
            }
        },
        props: {    
        },
        methods:{
            sendSchedules(){
                for(let i = 0; i < this.items.length; i++){ 
                    this.$refs['clock_menul' + i.toString()][0].defineRule();
                    this.$refs['clock_menur' + i.toString()][0].defineRule();
                }
                
                let self = this;

                setTimeout(() => {
                    if(self.$refs.SchedulesForm.validate()){
                        let validItems = self.items.filter((item) => {
                            return (item.begin !== "" && item.end !== "");
                        });

                        if (validItems.length >= 1){
                            self.$emit("appointments-times", validItems);
                            self.cancelSchedules();
                        }else{
                            alert("Selecione pelo menos um hórario.");
                        }
                    }
                });
            },

            cancelSchedules(){
                for(var i = 0; i < this.items.length; i++){
                    this.items[i].begin = '';
                    this.items[i].end = '';
                }

                this.closeCondition = false;
            },
        },
        components:{
            ClockPopup
        }
    }
</script>

<style scoped>
    .v-btn {
        background-color: rgba(33, 120, 183, 0.5);
    }
</style>