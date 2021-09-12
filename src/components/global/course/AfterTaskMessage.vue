<template>
    <div class="after-task-message" v-html="simInfo.message_after_task">

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props: ['text'],
    computed:{
        ...mapGetters({
            simInfo: 'simulator/getSimInfo'
        }),
    }
}
</script>

<style lang="scss" scoped>
.after-task-message{
    font-style: italic;
}


</style>