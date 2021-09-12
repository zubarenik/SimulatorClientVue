<template>
    <svg width="26" height="26" viewBox="0 0 26 26" :fill="color" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9864 0.999975C16.2282 0.999975 19.3439 2.29668 21.5951 4.61994C26.2236 9.37451 26.1156 16.9746 21.379 21.6031C17.4168 25.4392 11.3476 26.1056 6.66502 23.188L6.77308 23.296L2.07254 24.971L3.89152 20.8107C-0.232712 16.0021 0.0914641 8.81621 4.62992 4.40382C6.86313 2.22464 9.87076 0.999975 12.9864 0.999975Z" :stroke="border_color" stroke-width="1.4436" stroke-miterlimit="5.3333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.1587 11.5537C9.3303 7.84368 16.0299 6.61902 15.9039 11.3376C15.8138 12.094 15.4896 12.8864 13.6887 14.4172C13.1304 14.8855 12.7882 15.4078 12.7522 15.6599" :stroke="border_color" stroke-width="1.4436" stroke-miterlimit="5.3333" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.6261 17.1908C13.004 17.1908 13.3105 17.4972 13.3105 17.8752C13.3105 18.2532 13.004 18.5596 12.6261 18.5596C12.2481 18.5596 11.9417 18.2532 11.9417 17.8752C11.9417 17.4972 12.2481 17.1908 12.6261 17.1908Z" :fill="border_color"/>
    </svg>


</template>

<script>
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
        name: "Theory"
    }
</script>

<style scoped>

</style>