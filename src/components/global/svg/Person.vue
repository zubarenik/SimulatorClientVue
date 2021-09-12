<template>
    <svg width="24" height="30" viewBox="0 0 24 30" :fill="color" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16C7.58 16 4 12.42 4 8C4 3.58 7.58 0 12 0C16.42 0 20 3.58 20 8C20 12.42 16.42 16 12 16ZM12 2C8.69 2 6 4.69 6 8C6 11.31 8.69 14 12 14C15.31 14 18 11.31 18 8C18 4.69 15.31 2 12 2Z" :fill="simInfo.color"/>
        <path d="M19 30H5C2.24 30 0 27.76 0 25V21C0 20.65 0.19 20.32 0.49 20.14L5.49 17.14C5.99 16.91 6.59 17.14 6.81 17.64C7.01 18.07 6.87 18.58 6.49 18.86L2 21.57V25C2 26.66 3.34 28 5 28H19C20.66 28 22 26.66 22 25V21.57L17.49 18.86C16.99 18.63 16.76 18.04 16.99 17.54C17.22 17.04 17.81 16.81 18.31 17.04C18.37 17.07 18.43 17.1 18.49 17.14L23.49 20.14C23.8 20.32 24 20.64 24 21V25C24 27.76 21.76 30 19 30Z" :fill="simInfo.color"/>
    </svg>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props:{
        border_color:{
            type: String,
            default: '#ACABAB'
        },
        color:{
            type: String,
            default: 'none'
        }
    },
    name: "Person",
    computed:{
        ...mapGetters({
            simInfo: 'simulator/getSimInfo'
        })
    },
}
</script>

<style scoped>

</style>