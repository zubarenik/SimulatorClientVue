<template>
    <div class="question" :class="{answered: object.complete}">
        <div class="d-flex justify-content-between">
            <ContentHeader :type="object.title&&object.title!=''?object.title:'Тестовое задание'" :text="object.text" :description='object.text_description' v-if="user.male || !object.female_text"/>
            <ContentHeader :type="object.title&&object.title!=''?object.title:'Тестовое задание'" :text="object.female_text" :description='object.text_description' v-else/>
            <b-spinner small v-if="process" ></b-spinner>
        </div>
        <div class="question__answers">
            <div class="question__answers__item" v-for="(answer, index) in object.answers" :key="index">
                <AnswerButton :correct_nochosen="object.complete && !answer.is_correct && !isChosen(index)" :incorrect_nochosen="object.complete && answer.is_correct && !isChosen(index)" :text="answer.text" @click="chooseAnswer(answer, index)" :active="!process && !object.complete" :type="getType(answer, index)"/>
            </div>
        </div>
        <div v-if="!object.complete && object.is_multiple && answers_set.length > 0">
            <FormButton :loading="loading" text="Ответить" :inactive="process" size="medium-large" color="primary" @click="sendAnswer"/>
        </div>
        <div v-if="object.complete" :id="'question-'+object.id">
            <AuthorAnswer :text="object.is_correct?object.postreply_text:object.postreply_error_text" style="margin-top:20px !important;" v-if="object.is_multiple && user.male"/>
            <AuthorAnswer :text="object.postreply_female_text?object.postreply_female_text:object.postreply_text" style="margin-top:20px !important;" v-else-if="object.is_multiple && !user.male && object.is_correct"/>
            <AuthorAnswer :text="object.postreply_error_female_text?object.postreply_error_female_text:object.postreply_error_text" style="margin-top:20px !important;" v-else-if="object.is_multiple && !user.male && !object.is_correct"/>
            <AuthorAnswer :text="user.male?object.answers[object.user_answers[0]].text:object.answers[object.user_answers[0]].female_text?object.answers[object.user_answers[0]].female_text:object.answers[object.user_answers[0]].text" style="margin-top:20px !important;" v-else/>
            <AfterTaskMessage/>
        </div>
    </div>
    
</template>

<script>
import ContentHeader from '@/components/global/course/ContentHeader'
import AuthorAnswer from '@/components/global/course/AuthorAnswer';
import AfterTaskMessage from '@/components/global/course/AfterTaskMessage';
import AnswerButton from '@/components/global/course/AnswerButton'
import FormButton from '@/components/global/form/FormButton';
import { mapGetters } from 'vuex';

export default {
    props: ['object', 'page', 'sequence_no', 'place_id'],
    components: {
        ContentHeader,
        FormButton,
        AnswerButton,
        AuthorAnswer,
        AfterTaskMessage,
    },
    mounted(){
        // this.object.is_multiple = true;
    },
    data(){
        return{
            process: false,
            answers_set: [],
            type: 1
        }
    },
    computed:{
        ...mapGetters({
            loading: 'utility/getCourseTaskLoading',
            user: "user/getMeInfo",
        }),

        answer_chosen_value(){
            return this.object.answer_set.filter(obj => {
                return this.answers_set.includes(obj.id)
            })
        },
        is_chosen_right(){
            if (this.object && this.object.is_multiple){
                let result = true
                this.object.answer_set.forEach(ans => {
                    if ((ans.chosen && !ans.is_correct) || (!ans.chosen && ans.is_correct)){
                        result = false
                    }
                });
                return result
            }
            return undefined
        },
        authorAnswer(){
            if (!this.object.complete){
                return undefined
            }
            let comment = '';
            this.object.answer_set.forEach(ans => {
                if (ans.chosen){
                    comment = ans.comment;
                }
            });
            return comment;
        }
    },
    methods:{
        isChosen(index)
        {
            if(this.object.user_answers)
            {
                return this.object.user_answers.includes(index)
            }
            else{
                return false
            }
            
        },
        getType(answer, index){
            if (this.isChosen(index)){
                if (answer.is_correct){
                    return 'success'
                }else{
                    return 'wrong'
                }
            }
            return 'default'
        },
        chooseAnswer(answer, index){
            if (this.answers_set.includes(index)){
                this.answers_set = this.answers_set.filter(el=> el !== index)
            }else{
                this.answers_set.push(index);
            }
            if (!this.object.is_multiple){
                this.sendAnswer();
            }
        },
        async sendAnswer(){
            this.process = true;
            this.$store.commit("utility/SET_COURSE_TASK_LOADING", true)
            await this.$store.dispatch("course/SEND_QUESTION", {
                page_id: this.page,
                seq_no: this.sequence_no,
                answers: this.answers_set,
                place: this.place_id,
            })
            this.$store.commit("utility/SET_COURSE_TASK_LOADING", false)
            this.process = false
            // if(this.object.need_notifications)
            // {
            //     this.$store.dispatch("simulator/SEND_NOTIFICATION", {
            //         type: 'question',
            //         id : this.object.id,
            //         text: this.object.title,
            //         answer: this.answer_chosen_value.map(function(elem){
            //             return elem.text;
            //         }).join(', ')
            //     })
            // }
            
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.question{
    margin-bottom: 40px;
    padding: 25px 30px 30px 30px;
    border: solid 1px $third_color;
    border-radius: 10px;
    &__answers{
        flex-wrap: wrap;
        display: flex;
        &__item{
            margin-right: 20px;
        }
    }
    &.answered{
        background-color: $second_background_color;
        border: none;
    }
}
</style>