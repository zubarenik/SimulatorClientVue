<template>
    <div class="message">
        <div class="message__author">
            <div class="message__author__avatar d-none d-sm-block">
                <img :src="object.character.avatar?'//newapi.mysimulator.ru'+object.character.avatar:user.avatar.replace('http://','https://')" alt />
            </div>
            <div class="message__author__info d-none d-sm-block">
                
                <div class="message__author__info__name" v-html="object.character.first_name + ' ' + object.character.last_name "></div>
                <div class="message__author__info__role" v-if="object.character.social_role" v-html="object.character.social_role"></div>
                <div class="message__content" v-html="object.text.replace(/%name%/g, user.first_name).replace(/%surname%/g, user.last_name)" v-if="user.male || !object.female_text"> </div>
                <div class="message__content" v-html="object.female_text.replace(/%name%/g, user.first_name).replace(/%surname%/g, user.last_name)" v-else></div>
                
                <FormButton :loading="loading" :inactive="loading" v-if="button" text="Далее" color="primary" size='md' @click="nextStory"/>
            </div>
            <div class="message__author__info d-block d-sm-none">
                <img :src="'//newapi.mysimulator.ru' + object.character.avatar" alt class="d-table d-sm-none message__author__info__avatar_mob float-left mr-3" />
                <div class="author_info_group">
                    <div class="message__author__info__name" v-html="object.character.first_name + ' ' + object.character.last_name "></div>
                    <div class="message__author__info__role" v-if="object.character.social_role" v-html="object.character.social_role=='Пользователь игрока'?'Это вы':object.character.social_role"></div>
                </div>
                
                <div class="message__content" v-html="object.text.replace(/%name%/g, user.first_name).replace(/%surname%/g, user.last_name)" v-if="user.male || !object.female_text"> </div>
                <div class="message__content" v-html="object.female_text.replace(/%name%/g, user.first_name).replace(/%surname%/g, user.last_name)" v-else></div>
                
                <FormButton :loading="loading" :inactive="loading" v-if="button" text="Далее" color="primary" size='md' @click="nextStory"/>
            </div>
        </div>
        <div class="message__separate" v-if="!button"></div>
        
        
    </div>
</template>

<script>

import FormButton from '@/components/global/form/FormButton';
import { mapGetters } from 'vuex';
import postscribe from 'postscribe';

export default {
    components:{
        FormButton
    },
    props: ['object', 'page', 'sequence_no', 'button', 'place_id'],
    computed:{
        ...mapGetters({
            loading: 'utility/getCourseTaskLoading', 
            user: 'user/getMeInfo',
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
    },
    mounted() {
        if(this.object.script_text && this.object.script_id && this.object.script_id != '' && this.object.script_text != '')
        {
             let str = this.object.script_text
            postscribe('#'+this.object.script_id, str ); 
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.message{
    &__author{
        
       
        display: flex;
        &__avatar{
            margin-right: 20px;
            img{
                width: 70px;
                height:70px;
                border-radius: 35px;
            }
        }
        &__info{
            width: calc(100% - 90px);
            &__name{
                font-style: italic;
                font-weight: 700;
            }
            &__role{
                font-style: italic;
                font-size: $smallestTextSize;
            }
        }
    }
    &__separate {
        width: 100%;
        border-top: 1px solid #acacab;
        margin: 20px 0;
    }
    &__content{
        margin-top:10px;
        font-size: 18px;
    }
}
@media (max-width: 575.8px) {
  .message__author__info
  {
      width: 100%;
  }
  .message__author__info__avatar_mob
  {
      width: 40px;
      height: 40px;
      border-radius: 40px;
  }

}
</style>