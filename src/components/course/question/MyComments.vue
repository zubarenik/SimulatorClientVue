<template>
    <div class="my-comments"  v-if="comments.length">
        <!-- нужно вставить основной цвет -->
        <Carousel 
        :perPage="1"
        :paginationActiveColor="simInfo.color">
            <Slide
                v-for="(comment, index) in comments"
                :key="index"
                >
                <MarkCharMessage :comment="comment" />
            </Slide>
        </Carousel>
        
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import {mapGetters} from 'vuex'
import MarkCharMessage from './MarkCharMessage'
export default {
    components:{
        MarkCharMessage,
        Carousel,
        Slide
    },
    name: "MyComments",
    props: ['comments', 'author_comment'],
    data(){
        return{
            stars: [1, 2, 3, 4, 5]
        }
    }, 
    computed:{
    ...mapGetters({
        simInfo: 'simulator/getSimInfo'
    })
},
}
</script>

<style lang="scss" scoped>
    
</style>