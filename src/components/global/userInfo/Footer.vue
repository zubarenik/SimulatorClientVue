<template>
    <div class="info-panel">
        <div class="info-panel__user-info">
            <div class="arrow-up" @click="showInfo">
               <Arrow></Arrow>
            </div>
            <div class="info-panel__container">
                <div class="info-panel__item">
                    <div class="info-panel__icon">
                        <Person></Person>
                    </div>
                    <div class="info-panel__item-title">Профиль</div>
                </div>
                <div class="info-panel__item">
                    <div class="info-panel__icon">
                        <Theory></Theory>
                    </div>
                    <div class="info-panel__item-title">Теория</div>
                </div>
                <div class="info-panel__item">
                    <div class="info-panel__icon">
                        <Star></Star>
                    </div>
                    <div class="info-panel__item-title">{{ userData.coin }}</div>
                </div>
                <div class="info-panel__item">
                    <div class="info-panel__icon">
                        <Notification></Notification>
                    </div>
                    <!-- <div class="info-panel__item-title">{{getNewComments.user_comments.length + getNewComments.character_comments.length}}</div> -->
                </div>
            </div>
        </div>
        <div class="info-panel__telegram" style="cursor: pointer">
            <div class="info-panel__social-icon">
                <Telegram></Telegram>
            </div>
            <div class="info-panel__social-title">Телеграм чат</div>
        </div>
        <div class="info-panel__facebook" style="cursor: pointer">
            <div class="info-panel__social-icon">
                <Facebook></Facebook>
            </div>
            <div class="info-panel__social-title">Facebook сообщество</div>
        </div>
    </div>
</template>

<script>
    import Person from "../svg/Person";
    import Theory from "../svg/Theory";
    import Star from "../svg/Star";
    import Notification from "../svg/Notification";
    import Telegram from "../svg/Telegram";
    import Facebook from "../svg/Facebook";
    import Arrow from "../svg/Arrow";
    import {mapGetters} from 'vuex'

    export default {
        name: "Footer",
        components: {
            Person,
            Theory,
            Star,
            Notification,
            Telegram,
            Facebook,
            Arrow
        },
        computed: {
            ...mapGetters({
                userData: 'user/getMeInfo',
                getNewComments: 'comments/getComments'
            })
        },
        methods: {
            showInfo(){
                this.is_opened = !this.is_opened;
                let info = document.getElementsByClassName('info-panel__user-info')[0];
                info.classList.toggle('active-info');
                let arrow = document.getElementsByClassName('arrow-up')[0];
                arrow.classList.toggle('active-info');
            },
        },
        mounted() {
            // this.$store.dispatch('comments/GET_COMMENTS');
            
        }
    }
</script>

<style lang="scss" scoped>

.info-panel{
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    position: relative;
    padding-top: 20px;
    background-color: white;
    &__social-icon{
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin-right: 20px;
    }
    &__facebook{
        display: flex;
        margin-bottom: 15px;
        width: 250px;
    }
    &__telegram{
        width: 180px;
        margin-bottom: 10px;
        display: flex;
    }
    &__user-info{
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 7px 7% 18px 7%;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        transition: 0.5s;
        position: absolute;
        left: 0;
        bottom: 105px;
        z-index: 100;
        background-color: white;
        overflow: hidden;
        margin-top: 30px;
    }
    .simulator-mobile-user-info.active-info{
        padding-top: 12px;
        height: 140px;
        top: -100px;
    }
    &__icon{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
    }
    .arrow-up{
        cursor: pointer;
        width: 18px;
        margin-bottom: 15px;
        transition: 0.5s;
    }
    .arrow-up.active-info{
        transform: rotate(180deg);
        transition: 0.5s;
    }
    &__container{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    &__item{
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 45px;
    }
    &__item-title{
        font-weight: 700;
        font-size: 16px;
        margin-top: 15px;
        color: #acabab;
    }
    &__social-title{
        font-weight: 400;
        font-size: 18px;
    }
}
    
.info-panel__social-title{
    font-size: 14px;
}
.info-panel__telegram{
    align-items: center;
}
.info-panel__facebook{
    align-items: center;
}
.info-panel__user-info{
    height: 30px;
    padding: 2px 4% 18px 4%;
}
.info-panel__user-info.active-info{
    height: 130px;
    padding-top: 7px;
}

</style>