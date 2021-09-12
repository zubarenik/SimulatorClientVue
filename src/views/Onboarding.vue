<template>
  <div
    style="display: flex; padding-bottom: 120px; position: relative"
    class="px-md-5 pt-5 container"
  >
    <vue-progress-bar></vue-progress-bar>
    <div v-if="!page || !page.user_progress" class="spinner">
      <b-spinner big></b-spinner>
    </div>
    <div class="course px-lg-5 w-100" v-else>
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
        {{ page.is_onboarding ? simInfo.onboarding_name : page.name }}
      </h1>
      <div class="course__content" v-if="page && page.user_progress.places">
        <transition-group name="fade">
          <template v-for="(item, index) in page.user_progress.places">
            <div class="course__item" :id="`story-${index}`" :key="index">
              <CharMessage
                :place_id="item.id"
                :direction="item.is_hero ? 'right' : 'left'"
                :button="index == page.user_progress.places.length - 1 && !page.user_progress.completed" 
                v-if="
                  !item.is_author_message &&
                  item.type === 'message'
                "
                :object="item"
                :page="pageId"
                :sequence_no="item.sequence_no"
              />
              <Message
                :place_id="item.id"
                :button="index == page.user_progress.places.length - 1 && !page.user_progress.completed" 
                v-else-if="
                  item.is_author_message &&
                  item.type === 'message'
                "
                :object="item"
                :page="pageId"
                :sequence_no="item.sequence_no"
              />
              <SafeText
                :place_id="item.id"
                :button="index == page.user_progress.places.length - 1 && !page.user_progress.completed" 
                v-else-if="item.type === 'safetext'"
                :object="item"
                :page="pageId"
                :sequence_no="item.sequence_no"
              />
              <Theory
                :place_id="item.id"
                :button="index == page.user_progress.places.length - 1 && !page.user_progress.completed" 
                v-else-if="item.type === 'theory'"
                :object="item"
                :page="pageId"
                :sequence_no="item.sequence_no"
              />
              <OpenQuestion
                :place_id="item.id"
                :complete="index != page.user_progress.places.length - 1"
                :button="index == page.user_progress.places.length - 1 && !page.user_progress.completed" 
                v-else-if="item.type === 'openquestion'"
                :page="pageId"
                :sequence_no="item.sequence_no"
                :object="item"
              />
              <OpenQuestionExpert
                :place_id="item.id"
                :complete="index != page.user_progress.places.length - 1"
                :button="index == page.user_progress.places.length - 1 && !page.user_progress.completed" 
                v-else-if="item.type === 'openquestionexpert'"
                :page="pageId"
                :sequence_no="item.sequence_no"
                :object="item"
              />
              <Question
                :place_id="item.id"
                :button="index == page.user_progress.places.length - 1 && !page.user_progress.completed" 
                v-else-if="item.type === 'question'"
                :page="pageId"
                :sequence_no="item.sequence_no"
                :object="item"
              />
              <QuestionCheck
                :place_id="item.id"
                :button="index == page.user_progress.places.length - 1 && !page.user_progress.completed" 
                v-else-if="item.type === 'questionanswercheck'"
                :page="pageId"
                :sequence_no="item.sequence_no"
                :object="item"
              />
              <Choose
                :place_id="item.id"
                :button="index == page.user_progress.places.length - 1 && !page.user_progress.completed" 
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
            v-if="page.user_progress.completed"
            :is_onboarding="true"
            :page="page.id"
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
    Choose,
  },
  data() {
    return {
      loading: true,
      no_onboarding: false, 
      initComplete: false, //чтобы не делать двойную загрузку страницы
      CurrentDate: this.$moment(), 
      first_load: true
    };
  },
  created() {
    var self = this
    setInterval(function () {
         self.CurrentDate = self.$moment()
    }, 1000)
},
  mounted() {
    this.CurrentDate = this.$moment()
    // this.getNotifications()
    this.init()
    

    this.$store.dispatch("utility/ChangeLoading", false);
  },
  methods: {
    init()
    {
      if(this.simInfo && this.simInfo.onboarding_skip)
      {
        this.$router.push('/courses')
      }
      this.getPage();
    },
    // async getNotifications()
    // {
    //   this.$store.dispatch("notifications/GET_NOTIFICATIONS");
    // },
    async getPage() {
      
      if(this.simInfo && this.simInfo.onboarding_id)
      {
        this.initComplete = true //чтобы не вышло двойной из-за watch
        await this.$store.dispatch("page/CLEAR_ALL_PAGE");
        this.$store.dispatch(
          "page/FETCH_PAGE",
          this.simInfo.onboarding_id
        );
        
      }
    },
    async nextPage() {
      this.$store.dispatch("utility/ChangeLoading", true);
      this.$store.commit("user/SET_ONBOARDING_COMPLETE", true);
      this.$router.push('/courses')
    },
  },
  computed: {
    ...mapGetters({
      simInfo: "simulator/getSimInfo",
      user: "user/getMeInfo",
      userCreated: "user/getUserCreated",
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
    
  },
  watch: {
    page(val) {
      const no_scroll = ["question", "openquestion", "openquestion", "questionanswercheck", "questionuserchoice"]
      if (val && val.user_progress.places) {
        // this.$store.dispatch("user/FETCH_BALANCE");
        if (val.user_progress.completed) {
          if(this.first_load)
          {
            this.first_load=false
            setTimeout(() => {
              this.$scrollTo(`#end`, 1200, { easing: "linear" });
            }, 100);
          }
          else{
            if(val.user_progress.places.length<1 || !no_scroll.includes(val.user_progress.places[val.user_progress.places.length-1].type))
            {
              setTimeout(() => {
                this.$scrollTo(`#end`, 1200, { easing: "linear" });
              }, 100);
            }
            else{
              setTimeout(() => {
                this.$scrollTo(`#${val.user_progress.places[val.user_progress.places.length-1].type}-${val.user_progress.places[val.user_progress.places.length-1].id}`, 1200, { easing: "linear" });
              }, 100);
            }
          }
          

          
        } else {
          if(this.first_load)
          {
            this.first_load=false
            console.log(1)
            setTimeout(() => {
              
              this.$scrollTo(`#story-${val.user_progress.places.length - 1}`, 900, {
                easing: "linear",
              });
            }, 100);
          }
          else{
            if(val.user_progress.places.length<2 || !no_scroll.includes(val.user_progress.places[val.user_progress.places.length-2].type))
            {
              console.log(2)
              setTimeout(() => {
              
                this.$scrollTo(`#story-${val.user_progress.places.length - 1}`, 900, {
                  easing: "linear",
                });
              }, 100);
            }
            else{
              console.log(3)
              setTimeout(() => {
                this.$scrollTo(`#${val.user_progress.places[val.user_progress.places.length-2].type}-${val.user_progress.places[val.user_progress.places.length-2].id}`, 1200, { easing: "linear" });
              }, 100);
            }
          }



          
        }

      }
    },
    simInfo()
    {
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