<template>
    <div class="chapter-detail"  v-if="chapter">
        <div :class="{'chapter-detail__img': true, 'filter-img': !user.sim_info.simulator_paid && chapter.price != 0 && simInfo.price != 0 || (!chapter.order_active && simInfo.order_lesson) || !chapter.active}" :style="{'background': 'url('+chapter.picture+') center center'}">
<!--            <img alt="" :src="'//newapi.mysimulator.ru'+picture" style="height: 100%">-->
        </div>
        <h2 class="chapter-detail__title" v-html="chapter.name"></h2>
        <div class="chapter-detail__description" v-html="chapter.description"></div>
        <div class="chapter-detail__start" v-if="isLogin">
            <!-- <div :class="{'chapter-info-button-start': user.sim_info.simulator_paid, 'chapter-info-button-enabled': !user.sim_info.simulator_paid}">{{ getButtonWord }}</div> -->
            <FormButton :text="getButtonWord" :inactive="!user.sim_info.simulator_paid && chapter.price != 0 && simInfo.price != 0 || (!chapter.order_active && simInfo.order_lesson) || !chapter.active" :color="getColor" size="md" @click="openPage"/>
            <!-- <div class="chapter-detail__warning" v-if="!user.sim_info.simulator_paid">Чтобы получить доступ к главе, необходимо оплатить доступ к тренажеру.</div> -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormButton from '@/components/global/form/FormButton'
export default {
    components:{
        FormButton
    },
    computed:{
        ...mapGetters({
            chapter: 'chapter/getCurrChapter',
            simInfo: 'simulator/getSimInfo',
            isLogin: 'user/getIsLogin',
            user: "user/getMeInfo",
        }),
        getColor(){
            if (!this.user.sim_info.simulator_paid && this.chapter.paid ){
                return 'outline-secondary';
            }else{
                if (this.chapter.user_progress.completed){
                    return 'success'
                }else{
                    return 'primary'
                }
            }
            
        },
        getButtonWord(){
            if(!this.chapter.active)
            {
                return "скоро"
            }
            else if (!this.user.sim_info.simulator_paid && this.chapter.price != 0 && this.simInfo.price != 0)
                return 'Нужно купить курс';
            else if(!this.chapter.order_active && this.simInfo.order_lesson)
            {
                return 'Нужно закончить прошлые уроки';
            }
            else if(!this.chapter.user_progress.pages){
                return 'Начать';
            }
            else{
                if (this.chapter.user_progress.completed){
                    return 'Завершено'
                }
                return 'Продолжить'
                
            }
                
        }
    },
    methods:{
        async openPage(){
            await this.$store.dispatch('page/SET_PAGE', {
                vm: this,
                page: this.chapter.user_progress.first_uncompleted_page
            });
            this.$router.push("/");
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.chapter-detail{
    
    width: 100%;

    &__img
    {
        width: 100%;
        height: calc(100vw / 6 + 60px);
        margin-bottom: 8px;
        overflow: hidden;
        border-radius: 20px;
        background-size: cover !important;
        &.filter-img{
            filter: grayscale(1);
        }
        
    }

    &__title{
        // font-size: $bigTextSize;
        font-weight: 700;
    }   
    &__description{
        margin-top: 10px;
        font-weight: 400;
    }
    
    &__start{
        // display: flex;
        // flex-wrap: wrap;
        // flex-direction: row;
        // justify-content: flex-start;
        margin-top: 10px;
    }
    &__warning{
        max-width: 600px;
        min-width: 200px;
        font-weight: 600;
        color: $second_font_color;
        margin-top: 20px;
    }
}
</style>