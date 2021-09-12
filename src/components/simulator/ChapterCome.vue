<template>
    <div class="chapter-come p-3 col-12 col-md-8" :class="{active: active}" style="overflow-y:scroll !important;">
        
        <div  class="chapter-come__open flex-column d-flex mb-3">
            <div @click="$emit('close')" class="chapter-come__close align-self-end" :class="{active: active}">
                <Close/>
            </div>
        </div>
        <div class="chapter-come__content">
            <ChapterDetail/>
        </div>
    </div>
</template>

<script>
import ChapterDetail from "@/components/simulator/ChapterDetail.vue";
import Close from '@/components/global/svg/Close'
export default {
    components:{
        ChapterDetail,
        Close
    },
    props:['active']
}
</script>


<style lang="scss" scoped>

.chapter-come{
    position: fixed;
    right: 0px;
    top: 0px;
    // width: 100vw;
    height: 100vh;
    background-color: white;
    transform: translate3d(100%,0,0);
    transition: transform 0.6s cubic-bezier(0.550, 0.040, 0.030, 0.940);
    will-change: tranform;
    box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
    &.active{
        transform: translate3d(0%,0,0);
        
    }
    &__close{
        cursor: pointer;
    }
}
</style>