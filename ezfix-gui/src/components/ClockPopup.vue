<template>
    <v-menu
    ref="menu"
    v-model="appear_menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
            name="clock-input-field"
            :rules="definedRule"
            v-model="time"
            :label="clockLabel"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
            ></v-text-field>
        </template>
        <v-time-picker
        v-if="appear_menu"
        v-model="time"
        full-width
        @click:minute="saveAndEmitClock()"
        ></v-time-picker>
    </v-menu>
</template>

<script>
    export default {
        name: "ClockPopup",
        data: function(){
            return {
                time: "",
                appear_menu: false,
                definedRule: [],
            }
        },
        props:{
            clockLabel: {
                type: String,
                default: ""
            },
            otherTime: {
                type: String,
                default:  ""
            },
            type: {
                type: String,
                default: ""
            }
        },
        watch:{
            time(){
                this.definedRule = []
            }
        },
        methods: {
            defineRule(){
                this.definedRule.push(function sendRule() {
                    let right_time = null;
                    let bouth_filled = (this.time !== "" && this.otherTime !== "");
                    let bouth_empty = (this.time === "" && this.otherTime === "");

                    if (bouth_filled || bouth_empty){
                        if(bouth_filled){
                            if(this.type === "begin"){
                                right_time = new Date ('1/1/1999 ' + this.time) < new Date ('1/1/1999 ' + this.otherTime);
                            }else{
                                right_time = new Date ('1/1/1999 ' + this.time) > new Date ('1/1/1999 ' + this.otherTime);
                            }

                            if(right_time !== null && right_time === true){
                                return true;
                            }else{
                                return "Coloque os tempos na ordem de menor e maior";
                            }
                        }else{
                            return true;
                        }
                    }else{
                        return "Campo correspondente não finalizado.";
                    }
                }.bind(this));
            },

            saveAndEmitClock(){
                this.$refs.menu.save(this.time)
                this.$emit("clock-change", this.time)
            },
        }
    }
</script>


<style scoped>

</style>