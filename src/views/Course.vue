<template>
  <div
    style="display: flex; padding-bottom: 120px; position: relative"
    class="px-md-5 pt-5 container"
    
  >
    <vue-progress-bar></vue-progress-bar>
    <!-- <div v-if="!page || !page.place_set" class="spinner">
      <b-spinner big></b-spinner>
    </div> -->
    <!-- <div v-if="needTorelax">
      <div>
        <Logo
          :logo="simInfo.logo"
          v-if="simInfo.logo && isMobile"
          style="margin-bottom: 20px"
        />
        <Slide v-if="isMobile" right :width="getWidth">
          <Sidebar />
        </Slide>
      </div>
      <h1 class="course__title">
        {{page.name}}
      </h1>
      <div v-html="simInfo.pause_text"></div>
      <Countdown v-if="needTorelaxEnd" :end="needTorelaxEnd"></Countdown>
    </div>
    <div v-else-if="needTorelaxPage">
      <div>
        <Logo
          :logo="simInfo.logo"
          v-if="simInfo.logo && isMobile"
          style="margin-bottom: 20px"
        />
        <Slide v-if="isMobile" right :width="getWidth">
          <Sidebar />
        </Slide>
      </div>
      <h1 class="course__title">
        {{page.name }}
      </h1>
      <div v-html="thisLesson.pause_text"></div>
      <Countdown
        v-if="needTorelaxEndPage"
        :end="needTorelaxEndPage"
      ></Countdown>
    </div> -->
    <div class="course px-lg-5 w-100" v-if="page">
      <div>
        <Logo
          :logo="simInfo.logo"
          v-if="simInfo.logo && isMobile"
          style="margin-bottom: 20px"
        />
        <Slide v-if="isMobile" right :width="getWidth">
          <Sidebar />
        </Slide>
      </div>
      <h1 class="course__title">
        {{ page.name }}
      </h1>
      <div class="course__content" >
        <transition-group name="fade" v-if="page.user_progress">
          <template v-for="(item, index) in page.user_progress.places">
            <div class="course__item" :id="`story-${index}`" :key="index">
              <CharMessage
                :place_id="item.id"
                :direction="item.is_hero ? 'right' : 'left'"
                :button="
                  index == page.user_progress.places.length - 1 &&
                  !page.user_progress.completed
                "
                v-if="!item.is_author_message && item.type === 'message'"
                :object="item"
                :page="pageId"
                :sequence_no="item.sequence_no"
              />
              <Message
                :place_id="item.id"
                :button="
                  index == page.user_progress.places.length - 1 &&
                  !page.user_progress.completed
                "
                v-else-if="item.is_author_message && item.type === 'message'"
                :object="item"
                :page="pageId"
                :sequence_no="item.sequence_no"
              />
              <SafeText
                :place_id="item.id"
                :button="
                  index == page.user_progress.places.length - 1 &&
                  !page.user_progress.completed
                "
                v-else-if="item.type === 'safetext'"
                :object="item"
                :page="pageId"
                :sequence_no="item.sequence_no"
              />
              <Theory
                :place_id="item.id"
                :button="
                  index == page.user_progress.places.length - 1 &&
                  !page.user_progress.completed
                "
                v-else-if="item.type === 'theory'"
                :object="item"
                :page="pageId"
                :sequence_no="item.sequence_no"
              />
              <OpenQuestion
                :place_id="item.id"
                :complete="index != page.user_progress.places.length - 1"
                :button="
                  index == page.user_progress.places.length - 1 &&
                  !page.user_progress.completed
                "
                v-else-if="item.type === 'openquestion'"
                :page="pageId"
                :sequence_no="item.sequence_no"
                :object="item"
              />
              <OpenQuestionExpert
                :place_id="item.id"
                :complete="index != page.user_progress.places.length - 1"
                :button="
                  index == page.user_progress.places.length - 1 &&
                  !page.user_progress.completed
                "
                v-else-if="item.type === 'openquestionexpert'"
                :page="pageId"
                :sequence_no="item.sequence_no"
                :object="item"
              />
              <Question
                :place_id="item.id"
                :button="
                  index == page.user_progress.places.length - 1 &&
                  !page.user_progress.completed
                "
                v-else-if="item.type === 'question'"
                :page="pageId"
                :sequence_no="item.sequence_no"
                :object="item"
              />
              <QuestionCheck
                :place_id="item.id"
                :button="
                  index == page.user_progress.places.length - 1 &&
                  !page.user_progress.completed
                "
                v-else-if="item.type === 'questionanswercheck'"
                :page="pageId"
                :sequence_no="item.sequence_no"
                :object="item"
              />
              <Choose
                :place_id="item.id"
                :button="
                  index == page.user_progress.places.length - 1 &&
                  !page.user_progress.completed
                "
                v-else-if="item.type === 'questionuserchoice'"
                :page="pageId"
                :sequence_no="item.sequence_no"
                :object="item"
              />
            </div>
          </template>
        </transition-group>
        <div class="course__end" id="end">
         
          <EndCourse
            v-if="page.user_progress.completed && !page.user_progress.fun"
            :page="page.id"
            @endPage="nextPage"
            :show_mark="simInfo.show_page_mark"
          />
          <EndCourse
            v-else-if="page.user_progress.completed && page.user_progress.fun"
            :page="page.id"
            :fun="page.user_progress.fun"
            :utility="page.user_progress.utility"
            :show_mark="simInfo.show_page_mark"
            @endPage="nextPage"
          />
        </div>
      </div>
    </div>
    <!-- <CourseSidebar /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Message from "@/components/course/Message.vue";
import CharMessage from "@/components/course/CharMessage.vue";
// import CourseSidebar from '@/components/course/CourseSidebar.vue'
import SafeText from "@/components/course/SafeText.vue";
import Theory from "@/components/course/Theory.vue";
import OpenQuestion from "@/components/course/OpenQuestion.vue";
import OpenQuestionExpert from "@/components/course/OpenQuestionExpert.vue";
import QuestionCheck from "@/components/course/QuestionCheck.vue";
import Question from "@/components/course/Question.vue";
import Choose from "@/components/course/Choose.vue";
import EndCourse from "@/components/course/EndCourse.vue";
import Logo from "@/components/makeUser/Logo";
import { Slide } from "vue-burger-menu";
import Sidebar from "@/views/SideBar";
// import Countdown from "vuejs-countdown";

export default {
  name: "Course",
  components: {
    Message,
    Sidebar,
    EndCourse,
    Theory,
    OpenQuestionExpert,
    CharMessage,
    OpenQuestion,
    Slide,
    // CourseSidebar,
    Question,
    QuestionCheck,
    SafeText,
    Logo,
    // Countdown,
    Choose,
  },
  data() {
    return {
      loading: true,
      no_onboarding: false,
      CurrentDate: this.$moment(),
      first_load: true, 
      initComplete: false,
    };
  },
  created() {
    var self = this;
    setInterval(function () {
      self.CurrentDate = self.$moment();
    }, 1000);
  },
  mounted() {
    this.CurrentDate = this.$moment();

    // this.getNotifications();
    this.init()

    this.$store.dispatch("utility/ChangeLoading", false);
  },
  methods: {
    async getNotifications() {
      this.$store.dispatch("notifications/GET_NOTIFICATIONS");
    },
    init()
    {
      if(this.user)
      {
        if(this.user.sim_info.current_page)
        {
          this.getPage();
        }
        else{
          this.$router.push('/courses')
        }
      }
      
      
    },
    async getPage() {
      await this.$store.dispatch("page/CLEAR_ALL_PAGE")
      
        this.initComplete = true //чтобы не вышло двойной из-за watch
        await this.$store.dispatch(
          "page/FETCH_PAGE",
          this.user.sim_info.current_page
        );
      
    },
    async nextPage() {

      if(this.page.user_progress.next_page)
      {
        let next_page = this.page.user_progress.next_page
        this.$store.commit("page/CLEAR_PAGE");
        await this.$store.dispatch('page/SET_PAGE', {
            vm: this,
            page: next_page
        });
        this.getPage()
      }
      else{
        await this.$store.dispatch('page/SET_PAGE', {
            vm: this,
            page: null
        });
        this.$router.push('/courses')
      }
    },
  },
  computed: {
    ...mapGetters({
      simInfo: "simulator/getSimInfo",
      user: "user/getMeInfo",
      page: "page/getPageInfo",
      isMobile: "utility/getIsMobile",
      to_onboarding: "page/getShowOnboarding",
    }),
    getWidth() {
      return `${window.innerWidth}`;
    },
    pageId() {
      if (this.page.is_onboarding) {
        return 0;
      }
      return this.page.id;
    },
    thisLesson() {
      if(this.page)
        return this.page.lesson_info;
      return null
    },
    needTorelaxEndPage() {
      if (this.page.is_onboarding || this.simInfo.need_pause) {
        return false;
      }
      let seqno = this.simInfo.lesson_set.findIndex(
        (x) => x.id == this.page.lesson
      );
      if (seqno == 0) {
        return false;
      }
      if (!this.simInfo.lesson_set[seqno - 1].complete_time) {
        return this.$moment()
          .add(this.simInfo.lesson_set[seqno].pause_length, "hours")
          .format("YYYY/MM/DD HH:mm");
      }
      return this.$moment(this.simInfo.lesson_set[seqno - 1].complete_time)
        .add(this.simInfo.lesson_set[seqno].pause_length, "hours")
        .format("YYYY/MM/DD HH:mm");
    },
    needTorelaxPage() {
      if (!this.simInfo.order_lesson) {
        return false;
      }
      if (this.page.is_onboarding || this.simInfo.need_pause) {
        return false;
      }
      let seqno = this.simInfo.lesson_set.findIndex(
        (x) => x.id == this.page.lesson
      );
      if (seqno == 0) {
        return false;
      }
      var endOfWait = null;
      if (!this.simInfo.lesson_set[seqno - 1].complete_time) {
        endOfWait = this.$moment().add(
          this.simInfo.lesson_set[seqno].pause_length,
          "hours"
        );
      } else {
        endOfWait = this.$moment(
          this.simInfo.lesson_set[seqno - 1].complete_time
        ).add(this.simInfo.lesson_set[seqno].pause_length, "hours");
      }
      console.log(this.simInfo.lesson_set[seqno - 1].complete_time);
      return this.CurrentDate.isBefore(endOfWait);
    },
    needTorelax() {
      if (!this.simInfo.order_lesson) {
        return false;
      }
      if (this.page.is_onboarding) {
        return false;
      }
      if (!this.simInfo.need_pause) {
        return false;
      }
      let seqno = this.simInfo.lesson_set.findIndex(
        (x) => x.id == this.page.lesson
      );
      if (seqno == 0) {
        return false;
      }
      let endOfWait = this.$moment(
        this.simInfo.lesson_set[seqno - 1].complete_time
      ).add(this.simInfo.pause_length, "hours");
      return this.CurrentDate.isBefore(endOfWait);
    },
    needTorelaxEnd() {
      if (!this.simInfo.need_pause) {
        return false;
      }
      if (this.page.is_onboarding) {
        return false;
      }
      let seqno = this.simInfo.lesson_set.findIndex(
        (x) => x.id == this.page.lesson
      );
      if (seqno == 0) {
        return false;
      }
      if (!this.simInfo.lesson_set[seqno - 1].complete_time) {
        return this.$moment()
          .add(this.simInfo.pause_length, "hours")
          .format("YYYY/MM/DD HH:mm");
      }
      return this.$moment(this.simInfo.lesson_set[seqno - 1].complete_time)
        .add(this.simInfo.pause_length, "hours")
        .format("YYYY/MM/DD HH:mm");
    },
  },
  watch: {
    page(val) {
      if (val && val.user_progress && val.user_progress.places) {
        // this.$store.dispatch("user/FETCH_BALANCE");
        const no_scroll = [
          "question",
          "openquestion",
          "openquestion",
          "questionanswercheck",
          "questionuserchoice",
        ];
        if (val && val.user_progress && val.user_progress.places) {
          // this.$store.dispatch("user/FETCH_BALANCE");
          if (val.user_progress.completed) {
            if (this.first_load) {
              this.first_load = false;
              setTimeout(() => {
                this.$scrollTo(`#end`, 1200, { easing: "linear" });
              }, 100);
            } else {
              if (
                val.user_progress.places.length < 1 ||
                !no_scroll.includes(
                  val.user_progress.places[val.user_progress.places.length - 1]
                    .type
                )
              ) {
                setTimeout(() => {
                  this.$scrollTo(`#end`, 1200, { easing: "linear" });
                }, 100);
              } else {
                setTimeout(() => {
                  this.$scrollTo(
                    `#${
                      val.user_progress.places[
                        val.user_progress.places.length - 1
                      ].type
                    }-${
                      val.user_progress.places[
                        val.user_progress.places.length - 1
                      ].id
                    }`,
                    1200,
                    { easing: "linear" }
                  );
                }, 100);
              }
            }
          } else {
            if (this.first_load) {
              this.first_load = false;
              console.log(1);
              setTimeout(() => {
                this.$scrollTo(
                  `#story-${val.user_progress.places.length - 1}`,
                  900,
                  {
                    easing: "linear",
                  }
                );
              }, 100);
            } else {
              if (
                val.user_progress.places.length < 2 ||
                !no_scroll.includes(
                  val.user_progress.places[val.user_progress.places.length - 2]
                    .type
                )
              ) {
                console.log(2);
                setTimeout(() => {
                  this.$scrollTo(
                    `#story-${val.user_progress.places.length - 1}`,
                    900,
                    {
                      easing: "linear",
                    }
                  );
                }, 100);
              } else {
                console.log(3);
                setTimeout(() => {
                  this.$scrollTo(
                    `#${
                      val.user_progress.places[
                        val.user_progress.places.length - 2
                      ].type
                    }-${
                      val.user_progress.places[
                        val.user_progress.places.length - 2
                      ].id
                    }`,
                    1200,
                    { easing: "linear" }
                  );
                }, 100);
              }
            }
          }
        }
      }
    },
    user(){
      if(!this.initComplete)
      {
        this.init()
      }
    }
  },
  beforeDestroy() {
    this.$store.commit("page/CLEAR_PAGE");
  },
};
</script>

<style lang="scss">
.vuejs-countdown .text {
  display: none;
}
.bm-cross-button {
  right: 0 !important;
  top: 28px !important;
}
.bm-burger-button {
  top: 69px;
}
.bm-cross {
  background-color: #000000;
}

.course__item .message__author__avatar img {
  max-width: unset !important;
}
.course__item img {
  max-width: 100% !important;
  height: auto;
}
.course__item table td {
  vertical-align: unset;
}
</style>
<style lang="scss" scoped>
@import "@/assets/scss/vars.scss";

$spacer: 3rem;
.fade-enter-active {
  transition: opacity 1.2s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.spinner {
  position: fixed;
  width: calc(5 / 6 * 100vw);
  height: 100vh;
  top: 0;
  left: calc(1 / 6 * 100vw);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 930px) {
  .spinner {
    width: 98vw;
    left: 0;
  }
}
.course {
  // padding: 120px 100px 0px 100px;
  // width: calc(5 / 6 * 100vw);
  &__content {
    display: flex;
    flex-direction: column;
  }
  &__title {
    font-weight: 700;
    font-size: $bigTextSize;
    margin-bottom: 70px;
  }
  &__end {
    // padding: 0px 160px;
    width: 85%;
    align-self: center;
  }
  &__item {
    margin-bottom: 40px;
    display: table;
    width: 100%;
  }
}
@media (max-width: 575.8px) {
  .course__end {
    width: 100%;
  }
}
</style>