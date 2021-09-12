<template>
    <div class="footer">
        <div class="footer__items d-block" v-if="isLogin">
            <div class="footer__item profile mb-3" @click="$router.push('/profile')">
                <div class="footer__item__icon ">
                    <ProfileSVG border_color="#08A2DC"/>
                </div>
                <div class="footer__item__content">
                    Профиль
                </div>
            </div>
            <!-- <div class="footer__item profile mb-3" @click="$router.push('/shop')" v-if="simInfo.show_store && onboarding">
                <div class="footer__item__icon ">
                    <ShopSVG border_color="#08A2DC"/>
                </div>
                <div class="footer__item__content">
                    Магазин
                </div>
            </div> -->
            <div class="footer__item stars mb-3" v-if="onboarding">
                <div class="footer__item__icon">
                    <StarsSVG border_color="#08A2DC"/>
                </div>
                <div class="footer__item__content" >
                    {{userInfo.balance}}
                </div>
            </div>
            <div class="footer__item stars" @click="$router.push('/certificate')" v-if="userInfo.sim_info.simulator_completed">
                <div class="footer__item__icon">
                    <CertificateSVG border_color="#08A2DC"/>
                </div>
                <div class="footer__item__content" >
                    Сертификат
                </div>
            </div>

        </div>
        <div class="footer__social" v-if="onboarding && (paid || simInfo.price == 0 || simInfo.random_showing)">
            <div class="footer__item mb-3" v-if="simInfo.facebook">
                <div class="footer__item__icon">
                        <a :href="simInfo.facebook" target="_blank" style="color:black; text-decoration:none;">
                    <FacebookSVG/>
                        </a>
                </div>
                <div class="footer__item__content">
                    <a :href="simInfo.facebook" target="_blank" style="color:black; text-decoration:none;">
                    Facebook сообщество
                    </a>
                </div>
            </div>
            <div class="footer__item mb-3" v-if="simInfo.telegram">
                <div class="footer__item__icon">
                    <a :href="simInfo.telegram" target="_blank" style="color:black; text-decoration:none;">
                    <TgSVG/>
                    </a>
                </div>
                <div class="footer__item__content">
                    <a :href="simInfo.telegram" target="_blank" style="color:black; text-decoration:none;">
                    Telegram чат
                    </a>
                </div>
            </div>
            <div class="footer__item mb-3" v-if="simInfo.vkontakte">
                <div class="footer__item__icon">
                    <a :href="simInfo.vkontakte" target="_blank" style="color:black; text-decoration:none;">
                        <VKSVG/>
                    </a>
                </div>
                <div class="footer__item__content">
                    <a :href="simInfo.vkontakte" target="_blank" style="color:black; text-decoration:none;">
                        VK чат
                    </a>
                </div>
            </div>
            <div class="footer__item mb-3" v-if="simInfo.whatsapp">
                <div class="footer__item__icon">
                    <a :href="simInfo.whatsapp" target="_blank" style="color:black; text-decoration:none;">
                    <WASVG/>
                    </a>
                </div>
                <div class="footer__item__content">
                    <a :href="simInfo.whatsapp" target="_blank" style="color:black; text-decoration:none;">
                        WA чат
                    </a>
                </div>
            </div>
            <div class="footer__item mb-3" v-if="simInfo.random_link  && simInfo.random_text && simInfo.random_icon">
                <div class="footer__item__icon">
                    <a :href="simInfo.random_link" target="_blank" style="color:black; text-decoration:none;">
                        <b-icon  :icon="simInfo.random_icon" class="main_font_color" style="width: 30px; height: 30px;"></b-icon>
                    </a>
                </div>
                <div class="footer__item__content">
                    <a :href="simInfo.random_link" target="_blank" style="color:black; text-decoration:none;">
                        {{simInfo.random_text}}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileSVG from '@/components/global/svg/Person'
import StarsSVG from '@/components/global/svg/Star'
import FacebookSVG from '@/components/global/svg/Facebook'
import CertificateSVG from '@/components/global/svg/Certificate'
import VKSVG from '@/components/global/svg/VK'
import WASVG from '@/components/global/svg/WA'
import TgSVG from '@/components/global/svg/Telegram'
// import ShopSVG from '@/components/global/svg/Shop'
import { mapGetters } from 'vuex'
export default {
    components:{
        ProfileSVG,
        TgSVG,
        FacebookSVG,
        CertificateSVG,
        StarsSVG, 
        VKSVG, 
        WASVG, 
        // ShopSVG
    },
    props: {
        onboarding: {
            type: Boolean
        },
        paid: {
            type: Boolean
        },
        
    },
    computed:{
        ...mapGetters({
            isLogin: 'user/getIsLogin',
            userInfo: 'user/getMeInfo',
            simInfo: 'simulator/getSimInfo'
        })  
    },
    data(){
        return{
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.footer{
    margin-top: auto;
    &__items{
        margin-bottom: 40px;
    }
    &__item{
        // margin-bottom: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 1rem;

        &.stars{
            margin-bottom: 0px;
        }
        &__icon{       
            margin-right: 10px;
            display: flex;
            width: 30px;
            justify-content: center;
        }
    }
}

</style>