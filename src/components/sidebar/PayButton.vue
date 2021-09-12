<template>
<div class="pay">
    <div class="pay__price" v-if="isLogged">
        {{currPromoCode.price ? currPromoCode.price : price}} ₽
    </div>
    <div class="pay__button" @click="paySimulator">
        <PayButton :text="text"/>
    </div>
    <div class="pay__promocode" @click="active_code=true" v-if="isLogged && !active_code">
        У меня есть промокод
    </div>
    <form @submit.prevent="activateCode" class="pr-3 mt-3 pay__promocode-form" v-else-if="isLogged">
        <!-- <FormInput :valid="false" v-model="promocode" placeholder="Введите промокод"/> -->
        <div class="d-flex align-items-center" v-if="!currPromoCode.promo_code">
            <b-form-group class="w-100 mb-0">
                <b-form-input
                placeholder="введите промокод" v-model="promocode"></b-form-input>
            </b-form-group>
            <div @click="active_code=false" class="ml-3 pay__promocode-close">
                <Close/>
            </div>
        </div>
        <div v-else class="pay__curr-promo d-flex align-items-center">
            <div>Промокод <span>{{currPromoCode.promo_code}}</span></div>
            <div @click="deleteCode" class="ml-3 pay__promocode-close">
                <Close/>
            </div>
        </div>
    </form>

</div>

</template>

<script>
import PayButton from '@/components/global/form/FormButton.vue';
import {mapGetters} from 'vuex';
// import FormInput from '@/components/global/form/FormInput';
import Close from '@/components/global/svg/Close'

export default {
    props: ['price'],
    data(){
        return{
            show_form: false,
            promocode: '',
            active_code: false,
        }
    },
    components:{
        PayButton,
        Close,
    },
    computed: {
        ...mapGetters({
            isLogged: 'user/getIsLogin',
            currPromoCode: 'simulator/getPromocode'
        }),
        text(){
            return this.isLogged ? 'Купить курс' : 'Войти'
        }
    },
    methods:{
        async activateCode(){
            await this.$store.dispatch("simulator/ACTIVATE_PROMOCODE", {slug: this.promocode, vm: this})
        },
        deleteCode(){
            this.$store.commit("simulator/SET_CURR_PROMOCODE", {})
        },
        async paySimulator(){
            if (this.isLogged){
                await this.$store.dispatch("simulator/PAY");
            }else{
                this.$store.commit("utility/SET_SHOW_LOGIN", true);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.pay{
    // color: $primary_color;
    // margin-top: 2rem;
    margin-bottom: 50px;
    &__price{
        font-weight: 700;
        font-size: $bigTextSize;
        margin-bottom: 1.5rem;
        line-height: 1;
    }
    &__promocode{
       
        
        // font-size: 16px;
        font-size: $smallestTextSize;
        display: inline-block;
        cursor: pointer;
        font-weight: 400;
        margin-top: 1rem;
    }
    &__promocode-close{
        cursor: pointer;
    }
    &__curr-promo{
        color: $second_font_color;
        span{
            font-weight: 700;
        }
    }
}

// @media (max-width: 1400px) {
//     .pay{
//         &__button{
//             width: 100%;
            
//         }
//         &__promocode{
//             font-size: calc((100vw - 1150px)/(1400 - 1150) * (16 - 13) + 13px);
            
//         }
//         &__price{
//             font-size: calc((100vw - 1150px)/(1400 - 1150) * (45 - 38) + 38px);
//         }
//     }
// }
</style>