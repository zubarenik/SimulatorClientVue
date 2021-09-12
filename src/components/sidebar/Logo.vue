<template>
    <div class="logo" @click="goHome">
        <img :src="logoSrc" alt="Логотип" style="max-width:50%"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['logo'],
    computed:{
        logoSrc(){
            return this.logo ? `https://newapi.mysimulator.ru${this.logo}` : '';
        }, 
        ...mapGetters({
            page: 'page/getPageInfo',
            onboardingComplete: "user/getOnboardingComplete",
        }),
    },
    methods:{
        async goHome(){
            if(this.$route.name == 'Theory'|| this.$route.name == 'Notifications' ||(this.$route.name != 'Courses' && ((this.$route.name == 'Home') && (!this.page.is_onboarding || this.onboardingComplete))))
            {
                this.$router.push('/courses')
                await this.$store.dispatch('page/SET_PAGE', {
                    vm: this,
                    page: 0
                });
            }
            
        }
        
    }

}
</script>
<style lang="scss" scoped>
.logo{
    margin-bottom: 2rem;
    cursor: pointer;

    
}

</style>