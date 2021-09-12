<template>
    <div class="course-items">
        <div class="course-items__items" v-if="isLogin">
            <!-- <div class="course-items__item profile" @click="$router.push('/theory')">
                <div class="course-items__item__icon">
                    <TheorySVG border_color="#08A2DC"/>
                </div>
                <div class="course-items__item__content">
                    Теория
                </div>
            </div> -->
            <!-- <div class="course-items__item">
                <div class="course-items__item__icon">
                    <QuestionSVG border_color="#08A2DC"/>
                </div>
                <div class="course-items__item__content">
                    Последний вопрос
                </div>

            </div> -->
            <!-- <div class="course-items__item stars"  @click="$router.push('/notifications')">
                <div class="course-items__item__icon" style="position:relative;">
                    <Notification border_color="#08A2DC"/>
                    <b-badge variant="danger" class="absolute_badge">{{getNotifCount}}</b-badge>
                </div>
                <div class="course-items__item__content">
                    Уведомления
                    
                </div>

            </div> -->
        </div>
    </div>
</template>

<script>
// import TheorySVG from '@/components/global/svg/Theory';
// import QuestionSVG from '@/components/global/svg/Question';
// import Notification from '@/components/global/svg/Notification';
// import StarsSVG from '@/components/global/svg/Star'
import { mapGetters } from 'vuex'
export default {
    components:{
        // TheorySVG,
        // QuestionSVG,
        // Notification
    },
    computed:{
        ...mapGetters({
            isLogin: 'user/getIsLogin',
            userInfo: 'user/getMeInfo',
            notifications: "notifications/getNotifications",
        }), 
        getNotifCount() {
            if(this.notifications && this.notifications.character_comments)
            {
                return this.notifications.character_comments.length + this.notifications.character_comments_expert.length + this.notifications.user_comments.length
            }
            else{
                return 0
            }
        },  
    },
    data(){
        return{
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.course-items{
    margin-top: 2.5rem;
    &__items{
        margin-bottom: 40px;
    }
    &__item{
        margin-bottom: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 1rem;

        &.stars{
            margin-bottom: 0px;
        }
        &__icon{       
            margin-right: 20px;
            display: flex;
            width: 30px;
            justify-content: center;
        }
        &__content{
            
        }
    }
}
.absolute_badge
{
    position: absolute;
    right: -6px;
    top: -8px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    padding: 0;
    border-radius: 20px;
}

</style>