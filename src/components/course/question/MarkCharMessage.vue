<template>
    <div class="my-comment" v-if="comment">
        <div class="my-comment__answer" :is_user='true'>
            <CharMessage :object="comment"/>
        </div>
        <div class="my-comment__comment">
            <CharMessage :object="comment.comment_set[0]" direction="right" :is_user='true'/>
        </div>
        
    </div>
</template>

<script>
import CharMessage from '@/components/course/CharMessage';

export default {
    props: ['comment'],
    components:{
        CharMessage
    }
}
</script>

<style lang="scss" scoped>
.my-comment{
    &__answer{
        margin-bottom: 2rem;
    }
    &__comment{
        margin-bottom: 1rem;
    }
    padding: 10px 20px;
    width: 85%;
}
</style>