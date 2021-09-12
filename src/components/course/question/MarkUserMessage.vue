<template>
    <div class="my-comment" v-if="comment">
        <div class="my-comment__author__avatar">
            <img :src="'//newapi.mysimulator.ru' + comment.author.avatar" alt />
        </div>
        <div class="my-comment__author">
            <div class="my-comment__author__info">
                <div class="my-comment__author__info__name" v-html="comment.author.first_name + ' ' + comment.author.last_name "></div>
            </div>
            <div class="my-comment__content" v-html="comment.text">
            </div>
            <StarRating 
            :star-size="24"
            style="line-height:1;"
            active-color="#FFCF5C"
            :show-rating="false"
            :rating="comment.score ? comment.score : 0"
            :read-only="false"/>
        </div>
        
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
    components:{
        StarRating
    },
    name: "MarkMessage",
    props: ['comment'],
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.my-comment{
    margin-bottom: 30px;
    display: flex;
    &__author{
        &__avatar{
            margin-right: 40px;
            img{
                width: 70px;
                height:70px;
                border-radius: 35px;
            }
        }
        &__info{
            &__name{
                font-size: 1rem;
                font-weight: 600;
                margin-bottom: 6px;
                color: $second_font_color;
            }
        }
    }
}
.my-comment__content
{
    font-size: 1rem;
    margin-bottom: 6px;
}
</style>