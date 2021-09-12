<template>
    <div class="chapter-list " v-if="lessons">
        <div class="onboarding_lesson mb-2 main_font_color border-primary-color" @click='to_onboarding' v-if="!simInfo.onboarding_skip">
            <div>{{simInfo.onboarding_name}}</div></div>
        <div v-for="(chapter, index) in lessons" :key="index">
            <Chapter :filter="(!user.sim_info.simulator_paid && chapter.price !=0 && simInfo.price != 0) || (!chapter.order_active && simInfo.order_lesson) || !chapter.active" @click="setCurrChapter(chapter)" :index="index" :chapter="chapter" :picture="chapter.picture" :paid="user.sim_info.simulator_paid"/>
        </div>
    </div>
</template>

<script>
import Chapter from './Chapter.vue';
import { mapGetters } from 'vuex';

export default {
    props: ['chapters', 'picture'],
    components:{
        Chapter
    },
    computed:{
        ...mapGetters({
        simInfo: 'simulator/getSimInfo', 
        lessons: "simulator/getLessons",
        user: "user/getMeInfo",
        })
    },
    methods:{
        setCurrChapter(chapter){
            this.$emit("select_lesson");
            this.$store.commit("chapter/SET_CURR_CHAPTER", chapter);
        }, 
        async to_onboarding()
        {
            this.$router.push("/onboarding");
        }
    },
    
}
</script>
<style lang="scss">
    .onboarding_lesson
    {
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        position: relative;
        cursor:pointer;
    }
    .onboarding_lesson div{
        width: 36%;
        margin: 0 auto;
    }
    .onboarding_lesson:after
    {
        content: '';
        border-bottom: 3px solid black;
        right: 72%;
        left:0;
        top:50%;
        position: absolute;
    }
    .onboarding_lesson:before
    {
        content: "";
        border-bottom: 3px solid black;
        left: 72%;
        right: 0%;
        top: 50%;
        position: absolute;

    }
</style>