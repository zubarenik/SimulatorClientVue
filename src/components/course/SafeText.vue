<template>
    <div class="safe_text" >
        
        <div class="safe_text__content" v-html="object.text.replace(/%name%/g, user.first_name).replace(/%surname%/g, user.last_name)" style="font-size:18px;" v-if="user.male || !object.female_text"></div>
        <div class="safe_text__content" v-html="object.female_text.replace(/%name%/g, user.first_name).replace(/%surname%/g, user.last_name)" style="font-size:18px;" v-else></div>
        <FormButton :loading="loading" v-if="button" text="Далее" size="medium-large" color="primary" @click="nextStory"/>

    </div>
</template>

<script>
import FormButton from '@/components/global/form/FormButton';
import postscribe from 'postscribe';
import { mapGetters } from 'vuex';

export default {
    name:'SafeText',
    props: ['object', 'button', 'page', 'sequence_no', 'place_id'],
    components:{
        FormButton
    },
    computed:{
        ...mapGetters({
            loading: 'utility/getCourseTaskLoading', 
            user: 'user/getMeInfo',
        })
    },
    mounted() {
        if(this.object.script_text && this.object.script_id && this.object.script_id != '' && this.object.script_text != '')
        {
             let str = this.object.script_text
            postscribe('#'+this.object.script_id, str ); 
        } 
       


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