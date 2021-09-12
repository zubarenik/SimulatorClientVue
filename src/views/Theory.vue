<template>
<div class="container px-0">
    <!-- <div style="position: absolute; top: 2rem; right: 25px; z-index: 999">
        <BackButton/>
    </div> -->
    <div class="theory row mx-0" v-if="curr_chapter">
        <div class="col-md-9 order-2 theory__content pt-5" >
            <Logo :logo="simInfo.logo" v-if="simInfo.logo && isMobile" style="margin-bottom:20px;"/>
            <div class="theory__page-title" >Теория</div>
            <div class="back-button" @click="$router.go(-1)" v-if="isMobile">
                <div class="mr-3">
                    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22L2 12L12 2" :stroke="simInfo.color" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="back-button__text font-weight-bold">
                    Вернуться
                </div>
            </div>
            <TheoryChapters v-if="isMobile"></TheoryChapters>
            <div class="theory__item" v-for="(t, key) in curr_chapter.theory_set" :key="key">
                <div class="theory__title">{{ t.name }}</div>
                <div class="theory__info"><span v-html="t.text"></span></div>
            </div>
        </div>
        <TheoryChapters v-if="!isMobile"></TheoryChapters>
    </div>
    <div class="theory" v-else-if="!process">
        <div class="theory__content" >
            <div class="theory__page-title">Здесь будет теория, когда вы её пройдете</div>
        </div>
    </div>
    <div v-else style="height: 100vh;" class="w-100 d-flex align-items-center justify-content-center">
        <b-spinner big></b-spinner>
    </div>
</div>
</template>

<script>
import TheoryChapters from "../components/Theory/TheoryChapters";
import {mapGetters} from 'vuex';
import Logo from '@/components/makeUser/Logo';


export default {
    name: "Theory",
    components: {
        TheoryChapters, 

        Logo
    },
    data(){
        return{
            process: false,
        }
    },
    computed: {
        ...mapGetters({
            curr_chapter: 'theory/getCurrChapter', 
            simInfo: "simulator/getSimInfo",
            isMobile: 'utility/getIsMobile'
        }),
        getWidth(){
            return `${window.innerWidth}`
        },
    },
    mounted(){
        this.fetchTheory()
    },
    methods:{
        async fetchTheory(){
            this.process = true;
            await this.$store.dispatch('theory/GET_THEORY_CHAPTERS')
            this.process = false;
        }, 
    }
}
</script>

<style lang="scss" scoped>
    img{
        max-width: 100%;
    }
    .theory{
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        display: flex;
        &__item{
            margin-bottom: 40px;
        }
        &__page-title{
            font-weight: 700;
            font-size: 44px;
            margin-bottom: 40px;
        }
        &__title{
            font-weight: 700;
            font-size: 32px;
            margin-bottom: 25px;
        }
        &__info{
            font-size: 18px;
        }
        .content
        {
            // padding: 80px 2rem;
        }
    }
    .back-button{
        cursor: pointer;
        display: flex;
        align-items: center;
        &__text{
            font-size: 1.25rem;
        }
    }
    @media (max-width: 767.98px) {
        .theory{
            &__page-title{
                font-weight: 700;
                font-size: 44px;
                margin: 20px 0;
            }
            .content
            {
                padding:0 15px;
            }
        }
    }
</style>


<style lang="scss">

.bm-cross-button{
    right: 0 !important;
    top: 28px !important;
}
.bm-burger-button{
    top: 69px;
    z-index: 999;
}
.bm-cross{
    background-color: #000000;
}

</style>