<template>
  <div class="question">
    <div
      class="question__content"
      :class="{ answered: object.user_answer }"
    >
      <ContentHeader
        :type="
          object.title && object.title != '' ? object.title : 'Открытый вопрос'
        "
        :text="object.text"
        :description="object.text_description"
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
            Введите не менее 10 символов
          </div>
        </transition>
        <!-- <div class="question__file_uploader">
          <FileUploader :files="files" @upload="addFile" @delete="deleteFile" />
        </div> -->
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
      <div v-else>
        <CharMessage
          :object="object.parent_message"
          direction="left"
          class="mb-2"
          v-if="object && object.parent_message"
        />
        <AnswerCharMessage
          :object="object.user_answer"
          direction="right"
          :is_user="true"
        />
        <AuthorAnswer :text="object.postreply_text" />
        <AfterTaskMessage />
      </div>
      <div
        class="question__comments"
        v-if="
          object.user_answer
        "
      >
        <div class="question__comment">
          <div class="font-weight-bold mt-2">Комментарий от автора курса</div>
          <p v-if="!object.user_answers" class="pb-0 mb-0">Вы получите уведомление об ответе</p>
        </div>
        <!-- <div class="my-comments">
          <CharMessage
            :object="object.user_answer.character_comment_set[0]"
            :need_score="false"
            :is_char="true"
            :is_user="false"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import FormButton from "@/components/global/form/FormButton";
import AuthorAnswer from "@/components/global/course/AuthorAnswer";
import CharMessage from "./CharMessage";
import AfterTaskMessage from "@/components/global/course/AfterTaskMessage";
import ContentHeader from "@/components/global/course/ContentHeader";
import AnswerCharMessage  from "./AnswerCharMessage";
// import FileUploader from "@/components/global/FileUploader";
import { mapGetters } from "vuex";
export default {
  components: {
    FormButton,
    // FileUploader,
    AuthorAnswer,
    ContentHeader,
    AnswerCharMessage,
    AfterTaskMessage,
    CharMessage,
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
            type: "openexpert",
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