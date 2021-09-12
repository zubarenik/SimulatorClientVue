<template>
    <svg width="25" height="30" viewBox="0 0 25 30" :fill="color" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 26H1C0.45 26 0 25.55 0 25C0 24.84 0.04 24.69 0.11 24.55C1.34 22.06 1.99 19.33 2 16.55V13C2 7.48 6.47 3 12 3C17.53 3 22 7.48 22 13V16.53C22.01 19.31 22.66 22.04 23.89 24.53C24.15 25.02 23.96 25.62 23.48 25.88C23.33 25.96 23.16 26 23 26ZM2.55 24H21.45C20.49 21.62 20 19.09 20 16.53V13C20 8.58 16.42 5 12 5C7.58 5 4 8.58 4 13V16.53C3.99 19.09 3.5 21.62 2.55 24Z" :fill="simInfo.color"/>
        <path d="M12 30C9.24 30 7 27.76 7 25C7 24.45 7.45 24 8 24C8.55 24 9 24.45 9 25C9 25.8 9.32 26.56 9.88 27.12C11.07 28.25 12.93 28.25 14.12 27.12C14.51 26.73 15.15 26.73 15.54 27.12C15.93 27.51 15.93 28.15 15.54 28.54C14.6 29.48 13.32 30 12 30Z" :fill="simInfo.color"/>
        <path d="M12 5C11.45 5 11 4.55 11 4V1C11 0.45 11.45 0 12 0C12.55 0 13 0.45 13 1V4C13 4.55 12.55 5 12 5Z" :fill="simInfo.color"/>
        <!--                                <path d="M22 4C20.9 4 20 3.1 20 2C20 0.9 20.9 0 22 0C23.1 0 24 0.9 24 2C24 3.1 23.1 4 22 4Z" fill="#ACABAB"/>-->
    </svg>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: "Notification",
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
    computed:{
        ...mapGetters({
            simInfo: 'simulator/getSimInfo'
        })
    },
}
</script>

<style scoped>

</style>