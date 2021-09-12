<template>
    <div>
        <div class="mark" v-if="comment && comment.comment_set && comment.comment_set.length > 0">
            <div v-b-toggle.commentsCollapse class="mark__number">
                {{comment.comment_set.length}} {{commentsNum()}} 
                <span class="mark__number__arrow" :class="{down: show}"></span>
            </div>
            <b-collapse id="commentsCollapse" @show="show=true" @hide="show=false" :visible='true'>
                <MarkMessages :comments="comment.comment_set"/>
            </b-collapse>
        </div>
        <div class="mark" v-else-if="comment.comment_set.length == 0" style="padding:0;">Скоро здесь появятся комментарии к вашему ответу
        </div>
        <div class="askadmin" v-if="!adminreq && !alreadyasked">
            <p><b>Вы можете запросить комментарий автора за {{simInfo.admin_comment_request_price}} </b><StarsSVG :border_color="simInfo.color" style="height: 18px; margin-left: -4px; margin-top: -6px;"/></p>
            <FormButton text="Запросить" size="md" @click="requestAuthorComment"/>
        </div>
        <div class="message__separate" ></div>

    </div>
</template>

<script>
import StarsSVG from '@/components/global/svg/Star'
import MarkMessages from './MarkMessages'
import { mapGetters } from 'vuex';
import FormButton from '@/components/global/form/FormButton'
export default {
    name: "Mark",
    components:{
        MarkMessages, 
        StarsSVG, 
        FormButton
    },
    props: ['comment', 'separate', 'adminreq', 'id_question'],
    data(){
        return{
            stars: [1, 2, 3, 4, 5],
            show: false,
            alreadyasked:false
        }
    },
    computed:{
        ...mapGetters({
            simInfo: "simulator/getSimInfo",
        }),
    },
    methods: {
        async requestAuthorComment(){
            var response = await this.$store.dispatch("course/REQUEST_AUTHOR_COMMENT", {id: this.id_question, vm: this})
            this.alreadyasked = true
            if(response)
            {
                this.alreadyasked = true
                this.$store.dispatch("user/FETCH_BALANCE");
            }
        },
        commentsNum(){
            if (this.comment.comment_set){
                if (this.comment.comment_set.length > 10 && this.comment.comment_set.length < 20)
                    return 'комментариев';
                if (this.comment.comment_set.length % 10 == 0 || this.comment.comment_set.length % 10 > 4)
                    return 'комментариев';
                if (this.comment.comment_set.length % 10 == 1)
                    return 'комментарий';
                if (5 > this.comment.comment_set.length % 10 && this.comment.comment_set.length % 10 > 1)
                    return 'комментария'
            }
            return 'комментариев'
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.mark{
    background-color: transparent;
    &__number{
        font-weight: 400;
        font-size: calc((100vw - 1150px)/(2500 - 1150) * (18 - 16) + 16px);
        margin: 0 0 25px 0;
        color: $second_font_color;
        display: flex;
        align-items: center;
        &__arrow{
            margin-left: 10px;
            width: 0; 
            height: 0; 
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            
            border-top: 7px solid $second_font_color;
            &.down{
                border-top: none;
                border-bottom: 7px solid $second_font_color;
            }
        }
    }
}
.message__separate{
    width: 100%;
    border-top: 1px solid #acacab;
    margin: 20px 0;
}
.askadmin
{
    margin-top:2rem
}
</style>