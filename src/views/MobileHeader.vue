<template>
    <div id="SideBarMobile" class="sidebar" v-if="user.sim_info">
        <div class="sidebar__container  pl-4">
            <Logo :logo="simInfo.logo" v-if="simInfo.logo"/>
            <Description :name="simInfo.name" :description="simInfo.description" v-if="(routeName !== 'Notifications' && routeName !== 'Theory' && routeName !== 'Home' )|| !user.sim_info.onboarding_complete" />
            <PayButton :price="simInfo.price" v-if="simInfo.price != 0 &&(!user.sim_info.simulator_paid && routeName !== 'MakeUser' && user.sim_info.onboarding_complete) && (routeName !== 'Home' || !user.sim_info.onboarding_complete) && routeName !== 'Notifications' && routeName !== 'Theory'"  />

        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
import Description from '@/components/sidebar/Description';
import Logo from '@/components/sidebar/Logo';
import PayButton from '@/components/sidebar/PayButton';
export default {
    components:{
        Description,
        Logo,
        PayButton,
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
    // min-height: 100vh;
    // height: 100%;
    // padding: calc(1 / 6 * 15vw) calc(1 / 6 * 12vw) calc(1 / 6 * 12vw) calc(1 / 6 * 12vw);
    /*position: fixed;*/
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    // justify-content: space-between;
    box-shadow: 5px 0 15px 0 #eeeeee;
    padding-top:30px;
    position: relative;
    &__container{
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        
    }
}

</style>