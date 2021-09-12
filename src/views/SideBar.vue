<template>
    <div id="SideBar" class="sidebar" v-if="user && user.sim_info">
        <div class="sidebar__container p-0 pt-md-5 pb-4 pl-md-4 pr-md-2">
            <Logo :logo="simInfo.logo" v-if="simInfo.logo"/>
            <BackButton v-if="routeName === 'Notifications' || routeName === 'Theory'"/>
            <Description :name="simInfo.name" :description="simInfo.description" v-if="(routeName !== 'Notifications' && routeName !== 'Theory' && routeName !== 'Home' )|| !(user.sim_info.onboarding_complete || simInfo.onboarding_skip)" />
            <PayButton :price="simInfo.price" v-if="simInfo.price != 0 && (!user.sim_info.simulator_paid && routeName !== 'MakeUser' && (user.sim_info.onboarding_complete || simInfo.onboarding_skip)) && (routeName !== 'Home' || !(user.sim_info.onboarding_complete || simInfo.onboarding_skip)) && routeName !== 'Notifications' && routeName !== 'Theory'"  />
            <PagePreviews v-if="routeName === 'Home'  && (user.sim_info.onboarding_complete || simInfo.onboarding_skip)" />
            <CourseItems v-if="routeName === 'Home'  && (user.sim_info.onboarding_complete || simInfo.onboarding_skip)" />
            <Footer v-if="routeName !== 'MakeUser'" :onboarding ='(user.sim_info.onboarding_complete || simInfo.onboarding_skip)' :paid='user.sim_info.simulator_paid' />
            <p style="font-size:10px;">Разработано на платформе <a href="//mysimulator.ru" target="_blank">mysimulator</a></p>            
        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import Description from '@/components/sidebar/Description';
import Logo from '@/components/sidebar/Logo';
import PayButton from '@/components/sidebar/PayButton';
import PagePreviews from '@/components/sidebar/PagePreviews';
import CourseItems from '@/components/sidebar/CourseItems';
import Footer from '@/components/sidebar/Footer';
import BackButton from '@/components/sidebar/BackButton';
export default {
    components:{
        Description,
        Footer,
        Logo,
        PagePreviews,
        CourseItems,
        PayButton,
        BackButton
    },
    computed:{
        ...mapGetters({
            user: 'user/getMeInfo',
            simInfo: 'simulator/getSimInfo'
        }),
        routeName(){
            return this.$route.name
        }
    },
    
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/vars.scss';

.sidebar{
    background: #fff;
    // width: calc(1 / 6 * 100vw);
    min-height: 100vh;
    height: 100%;
    // padding: calc(1 / 6 * 15vw) calc(1 / 6 * 12vw) calc(1 / 6 * 12vw) calc(1 / 6 * 12vw);
    /*position: fixed;*/
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    // justify-content: space-between;
    box-shadow: 5px 0 15px 0 #eeeeee;
    position: relative;
    &__container{
        // width: calc(1 / 6 * 100vw);
        // padding: calc(1 / 6 * 15vw) calc(1 / 6 * 12vw) calc(1 / 6 * 12vw) calc(1 / 6 * 12vw);
        // position: fixed;
        height: 100vh;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        
    }
}

</style>