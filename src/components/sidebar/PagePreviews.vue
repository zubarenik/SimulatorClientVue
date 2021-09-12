<template>
    <div class="pages-preview" v-if="page && simInfo && page.id!=simInfo.onboarding_id">
        <!-- <div class="pages-preview__lesson-title">
            {{chapter.name}}
        </div> -->
        <div class="lesson mb-4" v-for="lesson in lessons" :key="'lesson'+lesson.id">
            <div class="lesson__title" v-if='page.lesson === lesson.id' style="font-weight:bold">
                 {{lesson.name}}
            </div>
            <div class="lesson__title " v-else-if='lesson.user_progress && lesson.user_progress.first_uncompleted_page && lesson.active && (lesson.order_active || !simInfo.order_lesson) && (simInfo.paid||simInfo.price==0||lesson.price==0)' @click="selectPage(lesson.user_progress.first_uncompleted_page)">
                {{lesson.name}}
            </div>
            <div class="lesson__title inactive" v-else>
               {{lesson.name}}
            </div>
            
            <div class="pages_list mt-3" v-if='page.lesson === lesson.id'>
                <div class="pages-preview__page mb-3 mt-1 pl-4" v-for="item in page.lesson_info.user_progress.pages" :key="'page'+item.page" >
                    <div class="pages-preview__page__title" style="font-weight:bold" v-if='item.page === page.id'>
                        {{`${item.page_name}`}}
                    </div>
                    <div class="pages-preview__page__title" v-else @click="selectPage(item.page)">
                        {{`${item.page_name}`}}
                    </div>
                    
                    
                </div>
            </div>
        </div>
        
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    name: 'PagePreview',
    computed:{
        ...mapGetters({
            page: 'page/getPageInfo',
            simInfo: "simulator/getSimInfo", 
            user: "user/getMeInfo",
            lessons: "simulator/getLessons",
        }), 
        data(){
            return{
                current: 0, 
                lesson:0, 
                clear: true
            }
        },

    },
    mounted() {
        this.$nextTick(() => {
            if(!this.lessons)
            {
                this.$store.dispatch("simulator/LESSONS_FETCH");
            }
        });

        
    },
    watch: {
        page() {
        }
    },
    methods:{
        async selectPage(id){
            this.$store.commit('page/CLEAR_PAGE_PLACE_SET');
            await this.$store.dispatch('page/FETCH_PAGE', id);
            await this.$store.dispatch('page/SET_PAGE', {
                vm: this,
                page: id
            });
        }, 
    }
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.pages_list
{
    border-left: 3px $primary_color solid;
}
.pages-preview{
    
    &__page{
        font-size: 1rem;
        // margin-bottom: 20px;
        &__title{
            cursor: pointer;
            &.inactive{
                color: $second_font_color;
                pointer-events: none;
            }
            // &.active{
            //     color: $primary_color;
            // }
            
        }
    }
}
.pages-preview__page:last-child{
    margin-bottom: 0;
}
.lesson{
    
     &__title{
        cursor: pointer;
        &.inactive{
            color: $second_font_color;
            pointer-events: none;
            cursor: not-allowed !important;
        }
        &.active{
            font-weight: bold;
        }
        
    }
}
</style>