<template>
    <div class="logo" @click="goHome">
        <img :src="logoSrc" alt="Логотип" style="max-width:50%; display:table;"/>
    </div>
</template>

<script>
export default {
    props: ['logo'],
    computed:{
        logoSrc(){
            return this.logo ? `https://newapi.mysimulator.ru${this.logo}` : '';
        }
    },
    methods:{
        async goHome(){
            this.$router.push('/courses')
            await this.$store.dispatch('page/SET_PAGE', {
                vm: this,
                page: 0
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.logo{
    margin-bottom: 50px;
    cursor: pointer;
    display: table;
    

    
}

</style>