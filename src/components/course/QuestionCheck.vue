<template>
  <div class="question">
    <div
      class="question__content"
      :class="{ answered: object.user_answer }"
    >
      <ContentHeader
        :type="
          object.title && object.title != '' ? object.title : 'Вопрос с проверкой значения'
        "
        :text="object.text"
        :description="object.description"
      />
      <div v-if="!object.user_answer">
        <CharMessage
          :object="object.parent_message"
          direction="left"
          class="mb-2"
          v-if="object.parent_message"
        />
        <textarea rows="4" placeholder="Ваш ответ" v-model="answer"> </textarea>
        <transition name="fade">
          <div class="question__content__error" v-if="process && !validAnswer">
            Введите хотя бы 1 символ
          </div>
        </transition>
        
        <div class="question__content__button">
          <FormButton
            :loading="loading"
            text="Отправить"
            :inactive="process"
            size="medium-large"
            color="primary"
            @click="sendAnswer"
          />
        </div>
      </div>
      <div v-else :id="'#questionanswercheck'+object.id">
        <CharMessage
          :object="object.parent_message"
          direction="left"
          class="mb-2"
          v-if="object && object.parent_message"
        />
        <AnswerCharMessage
          :object="object.user_answer"
          :is_user="true"
        />
        <AuthorAnswer :text="object.is_correct?object.postreply_text:object.postreply_error_text" v-if="user.male" />
        <AuthorAnswer :text="object.is_correct?object.postreply_female_text?object.postreply_female_text:object.postreply_text:object.postreply_error_female_text?object.postreply_error_female_text:object.postreply_error_text" v-else />
        <AfterTaskMessage />
      </div>
    </div>
  </div>
</template>

<script>
import FormButton from "@/components/global/form/FormButton";
import AuthorAnswer from "@/components/global/course/AuthorAnswer";
import CharMessage from "./CharMessage";
import AnswerCharMessage  from "./AnswerCharMessage";
import AfterTaskMessage from "@/components/global/course/AfterTaskMessage";
import ContentHeader from "@/components/global/course/ContentHeader";
import { mapGetters } from "vuex";
export default {
  components: {
    FormButton,
    AuthorAnswer,
    ContentHeader,
    AfterTaskMessage,
    CharMessage,
    AnswerCharMessage
  },
  props: ["object", "page", "sequence_no", "place_id", "complete"],
  data() {
    return {
      answer: "",
      answer_comment: "",
      process: false,
      type: 3,
      files: [],
    };
  },
  computed: {
    ...mapGetters({
      loading: "utility/getCourseTaskLoading",
      simInfo: "simulator/getSimInfo",
      user: "user/getMeInfo",
    }),
    validAnswer() {
      return this.answer.length > 0;
    },
    validAnswerComment() {
      return this.answer_comment.length >= 10;
    },
  },
  methods: {
    deleteFile(file, index) {
      this.files.splice(index, 1);
    },
    addFile(file) {
      this.files.push(file);
    },
    async sendAnswer() {
      this.process = true;
      if (this.validAnswer) {
        this.$store.commit("utility/SET_COURSE_TASK_LOADING", true);
        await this.$store.dispatch("course/SEND_TEXT_QUESTION", {
          page_id: this.page,
          answer: this.answer,
          place: this.place_id
        });
        this.process = false;

        if (this.object.need_notifications) {
          this.$store.dispatch("simulator/SEND_NOTIFICATION", {
            type: "questionCheck",
            id: this.object.id,
            text: this.object.title,
            answer: this.answer,
          });
        }
      } else {
        setTimeout(() => {
          this.process = false;
          this.$store.commit("utility/SET_COURSE_TASK_LOADING", false);
        }, 1500);
      }
    },
    
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vars.scss";

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
textarea {
  resize: none;
  width: 100%;
  border: 1px solid $third_color;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 6px;
  padding: 16px;
}
.question {
  // margin-bottom: 40px;
  &__content {
    padding: 25px 30px 30px 30px;
    border: solid 1px $third_color;
    border-radius: 10px;
    margin-bottom: 10px;

    &__error {
      color: $color_wrong;
      font-size: $smallestTextSize;
    }
    &__button {
      margin-top: 30px;
    }
    &.answered {
      background-color: $second_background_color;
      border: none;
      .question__title {
        &__type {
          color: $second_font_color;
        }
      }
    }
  }
  // &.answered{

  // }
  &__comment {
    width: 100%;
    display: table;
    cursor: pointer;
    margin-bottom: 1rem;
    &-type {
      transition: color 0.2s ease, border-bottom 0.2s ease;
      font-size: 1rem;
      float: left;
      margin-right: 2rem;
      color: $second_font_color;
      border-bottom: 1px dashed $second_font_color;
      margin-bottom: 1rem;
    }
    &-type:last-child {
      margin-right: 0;
    }
  }
  &__answer-comment {
    &__title {
      margin-bottom: 0.55rem;
    }
    &__answer {
      margin-bottom: 1.25rem;
    }
    &__button {
      margin-top: 0.55rem;
    }
  }
  .comments_left {
    font-size: 14px;
  }
}
</style>