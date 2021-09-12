<template>
<div class="score-course">
    <div class="score-course__header" v-html="name"></div>
    <div class="score-course__stars">
        <StarRating 
        :star-size="40"
        active-color="#FFCF5C"
        :show-rating="false"
        v-model="rating"
        :read-only="stars ? true : false"
        @rating-selected="select"/>
    </div>

</div>    
</template>


<script>
import StarRating from 'vue-star-rating'

// Гиперболизация 

// Уместное место на шутки?

// показать "вы всех так сотрудников нанимаете"

// В оправдание ушел игрок 1 "да вроде нормально все спросила"


export default {
    props: ['name', 'stars'],
    components:{
        StarRating
    },
    data(){
        return{
            rating: 0
            }
    },
    mounted(){
        this.rating = this.stars ? this.stars : 0;
    },
    methods:{
        select(){
            this.$emit("input", this.rating);
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.score-course{
    margin-bottom: 20px;
    &__header{
        color: $second_font_color;
    }
    &__stars{
        display: inline-block;
    }
}
</style>