<template>
    <div id="myscripts" v-if="simInfo.simulator_script"></div>
</template>
<script>
import postscribe from 'postscribe';
import {mapGetters} from 'vuex'
export default {
    name:'Scripts', 
    mounted() {
        if(this.simInfo)
        {
            postscribe('#myscripts', this.simInfo.simulator_script ); 
        }
    },
    computed: {
        ...mapGetters({
            simInfo: 'simulator/getSimInfo'
        }),
    },
    watch: {
        imInfo(val){
            postscribe('#myscripts', val.simulator_script ); 
        }
    },
}
</script>
