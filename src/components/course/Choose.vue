<template>
  <div>
    <div class="question__answers" v-if="object && !object.complete">
      <div
        class="question__answers__item"
        v-for="(answer, index) in object.answers"
        :key="index"
      >
        <AnswerButton
          @click="sendAnswer(answer, index)"
          :active="!process && !object.complete"
          :type='object.passed && answer.chosen?"success":""'
          :text="!answer.female_text?answer.text:user.male?answer.text:answer.female_text"
        />
      </div>
    </div> 

    <div class="message" v-if="object && object.complete" :id="'questionuserchoice-'+object.id" style="margin-top:40px">
      <div class="message-answer right">
        <div class="message__author d-none d-sm-flex">
          <div class="message__author__avatar right">
            <img
              :src="user.avatar.replace('http://', 'https://')"
              alt
            />
          </div>
        </div>

        <div class="message__content w-100 w-sm-80">
          <div class="message__content__char">
            <img
              :src="user.avatar.replace('http://', 'https://')"
              alt
              class="d-table d-sm-none char_img_mobile"
            />
            <div class="message__content__char__name">
              {{ user.first_name }} {{ user.last_name
              }}<span style="font-weight: 400"
                >, Это вы</span
              >
            </div>
          </div>
          <div
            class="message__content__text"
            v-html="
              !object.answers[object.user_answers].chosen_female_text?object.answers[object.user_answers].chosen_text:user.male?object.answers[object.user_answers].chosen_text:object.answers[object.user_answers].chosen_female_text
                .replace(/%name%/g, user.first_name)
                .replace(/%surname%/g, user.last_name)
            "
          ></div>

          <div
            class="message__content__triangle d-none d-sm-block right"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerButton from "@/components/global/course/AnswerButton";

import { mapGetters } from "vuex";

export default {
  props: ["object", "page", "sequence_no", "place_id"],
  components: {
    AnswerButton,
  },
  mounted() {
  },
  data() {
    return {
      process: false,
      answers_set: [],
      type: 1,
    };
  },
  computed: {
    ...mapGetters({
      loading: "utility/getCourseTaskLoading",
      user: "user/getMeInfo",
    }),
  },
  methods: {
    async sendAnswer(answer, index) {
      this.process = true;
      this.$store.commit("utility/SET_COURSE_TASK_LOADING", true);
      await this.$store.dispatch("course/SEND_CHOOSE", {
        index: index,
        page_id: this.page,
        seq_no: this.sequence_no,
        place: this.place_id,
      });
      this.$store.commit("utility/SET_COURSE_TASK_LOADING", false);
      this.process = false;
      
      if (this.object.need_notifications) {
        this.$store.dispatch("simulator/SEND_NOTIFICATION", {
          type: "userChoose",
          id: this.object.id,
          answer: answer.text,
        });
      }
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/vars.scss";

.question {
  margin-bottom: 40px;
  padding: 25px 30px 30px 30px;
  border: solid 1px $third_color;
  border-radius: 10px;
  &__answers {
    flex-wrap: wrap;
    display: flex;
    &__item {
      margin-right: 20px;
    }
  }
  &.answered {
    background-color: $second_background_color;
    border: none;
  }
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/vars.scss";
.message {
  // font-style: italic;
  .message-answer {
    display: flex;
    margin-bottom: 15px;
    &.right {
      flex-direction: row-reverse;
    }
  }
  &__author {
    display: flex;
    &__avatar {
      margin-right: 30px;
      &.right {
        margin-right: 0px;
        margin-left: 30px;
      }
      img {
        width: 70px;
        height: 70px;
        border-radius: 35px;
      }
    }
    &__info {
      &__name {
        font-weight: 700;
      }
      &__role {
        font-size: $smallestTextSize;
      }
    }
  }
  &__content {
    position: relative;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25));
    -webkit-filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25));

    width: 80%;
    padding: 15px;
    // color: $second_font_color;
    &__char {
      display: flex;
      margin-bottom: 15px;
      &__name {
        font-weight: 700;
      }
      &__score {
        margin-left: 0.35rem;
      }
    }
    &__text,
    &__char__role {
      // color: $second_font_color;
      // white-space: break-spaces;
      word-break: break-word;
    }
    &__text {
      font-size: 18px;
    }
    &__triangle {
      position: absolute;
      left: -19px;
      top: 20px;
      width: 0;
      height: 0;
      border-top: 12px solid transparent;
      border-right: 19px solid #fff;
      border-bottom: 12px solid transparent;

      &.right {
        right: -20px;
        left: auto;
        top: 20px;
        border-left: 20px solid #fff;
        border-right: none;
      }
    }
  }
}
@media (max-width: 575.8px) {
  .char_img_mobile
  {
    height: 35px;
    width: 35px;
    border-radius: 35px;
    margin-right: 10px;
  } 
  .message__content__char__name
  {
    margin-top:4px;
  }
}
</style>