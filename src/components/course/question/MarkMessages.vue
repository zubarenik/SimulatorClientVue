<template>
    <div class="mark-messages">
        <div v-for="(comment, index) in comments" :key="index">
            <MarkUserMessage :comment="comment"/>
        </div>
    </div>
</template>

<script>

import MarkUserMessage from './MarkUserMessage'

export default {
    name: 'MarkMessages',
    props:['comments'],
    components:{
        MarkUserMessage
    }
}
</script>