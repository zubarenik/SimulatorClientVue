<template>
    <div class="theory">
        <ContentHeader type="Теория" :text="object.title"/>
        <div class="theory__content" v-html="object.text"></div>
        <FormButton v-if="button" :loading="loading" text="Далее" size="medium-large" color="primary" @click="nextStory" class="mt-2"/>

    </div>
</template>

<script>
import ContentHeader from '@/components/global/course/ContentHeader'
import FormButton from '@/components/global/form/FormButton';
import { mapGetters } from 'vuex';

export default {
    name: 'Theory',
    components: {
        ContentHeader,
        FormButton
    },
    props: ['object', 'page', 'sequence_no', 'button', 'place_id'],
    computed:{
        ...mapGetters({
            loading: 'utility/getCourseTaskLoading'
        })
    },
    methods:{
        async nextStory(){        
            this.$store.commit("utility/SET_COURSE_TASK_LOADING", true)
            await this.$store.dispatch("page/PAGE_NEXT", {
                page_id: this.page,
                place: this.place_id,
                seq_no: this.sequence_no,
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.theory{
    &__title{
        margin-bottom: 30px;
        &__type{
            color: $primary_color;
        }
        &__name{
            font-weight: 700;
            font-size: $mediumTextSize;
            line-height: 1.15;
        }
       
    }
     &__content
        {
            font-size: 18px;
        }
}
</style>