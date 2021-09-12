<template>
  <div class="container px-md-5 pt-5" v-if="notifications.user_comments">
    <div class="notifications__content row px-lg-5">
      <div class="col-12">
        <div class="notifications__page-title">Уведомления</div>
        <div class="back-button" @click="$router.go(-1)" v-if="isMobile">
          <div class="mr-3">
            <svg
              width="14"
              height="24"
              viewBox="0 0 14 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22L2 12L12 2"
                :stroke="simInfo.color"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="back-button__text font-weight-bold">Вернуться</div>
        </div>
        <div class="notifications__items">
          <h3 v-if="notifications.character_comments.length>0">Ответы от автора на запросы</h3>
          <div
            v-for="(notif, index) in notifications.character_comments"
            :key="'n_c_c'+index"
          >
            <div class="notifications__item">
              <ContentHeader
                :type="
                  notif.open_question.title && notif.open_question.title != ''
                    ? notif.open_question.title
                    : 'Открытый вопрос'
                "
                :text="notif.open_question.text"
                :description="notif.open_question.text_description"
              />

              <div class="mb-1">
                <Message
                  v-if="notif.parent_message&&notif.parent_message.is_author_message"
                  :object="notif.parent_message"
                />
                <CharMessage v-else :object="notif.parent_message" />
                <CharMessage :object="notif.open_answer" direction="right" :is_user='true' />
                <AuthorAnswer :text="notif.open_question.postreply_text" />
              </div>
              <CharMessage
                :object="notif"
                @score-comment="scoreCommentChar(notif.id)"
                :need_score="true"
                :is_char="true"
                :is_user='false'
              />
            </div>
          </div>
          <div
            v-for="(notif, index) in notifications.character_comments_expert"
            :key="index+'ch_c_e'"
          >
            <div class="notifications__item">
              <ContentHeader
                :type="
                  notif.open_question.title && notif.open_question.title != ''
                    ? notif.open_question.title
                    : 'Открытый вопрос'
                "
                :text="notif.open_question.text"
                :description="notif.open_question.text_description"
              />

              <div class="mb-1">
                <Message
                  v-if="notif.parent_message&&notif.parent_message.is_author_message"
                  :object="notif.parent_message"
                />
                <CharMessage v-else :object="notif.parent_message" />
                <CharMessage :object="notif.open_answer" direction="right" :is_user='true' />
                <AuthorAnswer :text="notif.open_question.postreply_text" />
              </div>
              <CharMessage
                :object="notif"
                @score-comment="scoreCommentCharExp(notif.id)"
                :need_score="true"
                :is_char="true"
                :is_user='false'
              />
            </div>
          </div>
        </div>

        <div class="notifications__items">
          <div
            v-for="(notif, index) in notifications.user_comments"
            :key="'n_u_c'+index"
          >
            <div class="notifications__item">
              <ContentHeader
                :type="
                  notif.open_question.title && notif.open_question.title != ''
                    ? notif.open_question.title
                    : 'Открытый вопрос'
                "
                :text="notif.open_question.text"
                :description="notif.open_question.text_description"
              />

              <div class="mb-1">
                <Message
                  v-if="notif.parent_message&&notif.parent_message.is_author_message"
                  :object="notif.parent_message"
                />
                <CharMessage v-else :object="notif.parent_message" />
                <CharMessage :object="notif.open_answer" direction="right" :is_user='true' />
                <AuthorAnswer :text="notif.open_question.postreply_text" />
              </div>
              <CharMessage
                :object="notif"
                @score-comment="(e) => scoreComment(e, notif.id)"
                :need_score="true"
                :is_user='true'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="notifications" v-else-if="!process">
    <div class="notifications__content">
      <div class="notifications__page-title">У вас нет уведомлений</div>
    </div>
  </div>
  <div
    v-else
    style="height: 100vh"
    class="w-100 d-flex align-items-center justify-content-center"
  >
    <b-spinner big></b-spinner>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import Message from "@/components/course/Message.vue";
import CharMessage from "@/components/course/CharMessage.vue";
import ContentHeader from '@/components/global/course/ContentHeader'
import AuthorAnswer from '@/components/global/course/AuthorAnswer';

import { isMobileOnly } from "mobile-device-detect";

// import MarkUserMessage from '@/components/course/question/MarkUserMessage.vue';
export default {
  name: "Notifications",
  components: {
    Message,
ContentHeader,
AuthorAnswer,
    // MarkUserMessage,
    CharMessage,
  },
  data() {
    return {
      process: false,
    };
  },
  mounted() {
    this.fetchNotifications();
  },
  computed: {
    ...mapGetters({
      notifications: "notifications/getNotifications",
      simInfo: "simulator/getSimInfo",
      isMobile: "utility/getIsMobile",
    }),
  },
  methods: {
    async fetchNotifications() {
      this.process = true;
      await this.$store.dispatch("notifications/GET_NOTIFICATIONS");
      this.process = false;
    },
    async scoreComment(ev, id) {
      await this.$store.dispatch("notifications/SEND_SCORE_NOTIFICATION", {
        rating: ev,
        id: id,
        type: 'comment'
      });
    },
    async scoreCommentChar(id) {
      await this.$store.dispatch("notifications/SEND_SCORE_NOTIFICATION", {
        id: id,
        type: 'character_comment'
      });
    },
    async scoreCommentCharExp(id) {
      await this.$store.dispatch("notifications/SEND_SCORE_NOTIFICATION", {
        id: id,
        type: 'character_comment_expert'
      });
    },
    ismobile() {
      return isMobileOnly;
    },
  },
};
</script>


<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';
.notifications {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  &__page-title {
    font-weight: 700;
    font-size: 44px;
    margin-bottom: 40px;
  }
  &__title {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 25px;
  }
  &__item {
    padding: 25px 30px 30px 30px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: $second_background_color;
    
    
    
  }
}
.back-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  &__text {
    font-size: 1.25rem;
  }
}
</style>