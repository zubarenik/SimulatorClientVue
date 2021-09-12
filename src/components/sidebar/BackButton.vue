<template>
    <div class="back-button" @click="$router.go(-1)">
        <div class="mr-3">
            <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22L2 12L12 2" :stroke="simInfo.color" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="back-button__text font-weight-bold">
            Вернуться
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
        name: "Back", 
        computed:{
            ...mapGetters({
                simInfo: 'simulator/getSimInfo'
            })
        }
    }
</script>

<style lang="scss" scoped>
.back-button{
    cursor: pointer;
    display: flex;
    align-items: center;
    &__text{
        font-size: 1.25rem;
    }
}
</style>