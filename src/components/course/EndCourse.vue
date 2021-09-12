<template>
<div class="end-course">
    <div class="end-course__header" v-if="!is_onboarding" v-html="simInfo.message_after_chapter || 'Поздравляем! Вы завершили эту страницу!'">
    </div>
    <div v-else-if="is_onboarding" class="end-course__header mb-3">Теперь Вы можете перейти к симулятору!</div>
    <div v-if="!is_onboarding && show_mark">
        <div v-for="(rat, index) in rating_list" :key="index">
            <RatingCourse :name="rat.name" v-model="rat.value" :stars="getStars(rat.code)" />
        </div>
        <FormButton :text="simInfo.text_button_after_chapter || 'Оценить главу'" size="md" @click="sendScore" :inactive='!getRating' class="mt-4" v-if="!fun && !utility" />
    </div>
    <div v-else-if="!is_onboarding && !show_mark">
        <FormButton :text="simInfo.text_button_after_chapter || 'Продолжить'" size="md" @click="$emit('endPage')" />
    </div>

    <div v-else>
        <FormButton text="Перейти к симулятору" size="md" @click="$emit('endPage')" />
    </div>
</div>

</template>


<script>
import RatingCourse from '@/components/global/course/RatingCourse'
import FormButton from "@/components/global/form/FormButton";
import { mapGetters } from 'vuex';
export default {
    props: ['page', 'fun', 'utility', 'is_onboarding', 'show_mark'],
    components: {
        RatingCourse,
        FormButton
    },
    data(){
        return {
            rating_list: [
            {
                code: 'utility',
                name: 'Полезность главы',
                value: 0
            },
            {
                code: 'fun',
                name: 'Интересность главы',
                value: 0
            }
        ]
        }
    },
    computed:{
        ...mapGetters({
            simInfo: "simulator/getSimInfo",
            
        }),
        getRating(){
            let res = 0
            this.rating_list.forEach(el=>{
                if (el.value > 0){
                    res += 1;
                }
            })
            return res === this.rating_list.length
        }
    },
    methods:{
        getStars(code){
            if (code === 'fun'){
                return this.fun ? this.fun : undefined
            }else{
                return this.utility ? this.utility : undefined
            }
        },
        async sendScore(){
            await this.$store.dispatch('page/SCORE_PAGE', {
                fun: this.rating_list[1].value,
                utility: this.rating_list[0].value,
                page: this.page
            })
            this.$emit("endPage");
        },
    },
    watch:{
        // getRating(val){
        //     if (val){
        //         this.sendScore()
        //     }
        // }
    }
    
}
</script>


<style lang="scss" scoped>
.end-course{
    padding: 1.75rem 4rem 1rem 4rem;
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);

    &__header{
        font-weight: 600;
        margin-bottom: 25px;
    }
}
@media (max-width: 575.8px) {
    .end-course
    {
        padding: 1.75rem 1rem 1rem 1rem;
    }
}

</style>