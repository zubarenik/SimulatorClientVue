<template>
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-6.05871e-08 8.61393L1.38607 10L8.61393 2.7789L15.835 10L17.2211 8.61393L8.61393 -3.76527e-07L-6.05871e-08 8.61393Z" fill="siminfo.color"/>
    </svg>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "Arrow", 
        computed:{
            ...mapGetters({
                simInfo: 'simulator/getSimInfo'
            })
        }
    }
</script>

<style scoped>

</style>