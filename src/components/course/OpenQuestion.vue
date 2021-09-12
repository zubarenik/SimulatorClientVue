<template>
  <div class="question">
    <div class="question__content" :class="{ answered: object.user_answer }">
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
          v-if="object && object.parent_message && object.parent_message.author"
        />
        <textarea rows="4" placeholder="Ваш ответ" v-model="answer"> </textarea>
        <transition name="fade">
          <div class="question__content__error" v-if="process && !validAnswer">
            Поле ответа не может быть пустым
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
          v-if="object && object.parent_message && object.parent_message.author"
        />
        <AnswerCharMessage
          :object="object.user_answer"
          :is_user="true"
        />
        <AuthorAnswer
          :text="object.postreply_text"
          :id="'answer-' + object.id"
          v-if="user.male || !object.postreply_female_text"
        />
        <AuthorAnswer
          :text="object.postreply_female_text"
          :id="'answer-' + object.id"
          v-else
        />
        <AfterTaskMessage />
      </div>
    </div>
    <!-- <div
      class="question__comments"
      v-if="
        (object.user_answer &&
          !object.answer_to_comment &&
          object.comment_number > 0) ||
        (complete && object.comment_number > 0 && object.user_answer.text)
      "
    >
      <div class="question__comment">
        <div
          class="question__comment-type"
          @click="type = 1"
          :class="{ active: type === 1 }"
        >
          Оценка моего решения
        </div>
        <div
          class="question__comment-type"
          @click="type = 2"
          :class="{ active: type === 2 }"
        >
          Мои комментарии
        </div>
        <div
          class="question__comment-type"
          v-if="
            object.user_answer.comment_requested ||
            (object.user_answer.character_comment_set &&
              object.user_answer.character_comment_set.length > 0)
          "
          @click="type = 3"
          :class="{ active: type === 3 }"
        >
          Комментарий автора курса
        </div>
      </div>
      <Mark
        v-if="type === 1"
        :id_question="object.user_answer.id"
        :comment="object.user_answer"
        :adminreq="
          object.user_answer.comment_requested ||
          (object.user_answer.character_comment_set &&
            object.user_answer.character_comment_set.length > 0)
        "
      ></Mark>
      <MyComments
        v-if="type === 2"
        :author_comment="false"
        :comments="object.answer_set"
      ></MyComments>
      <CharMessage
        v-if="
          type == 3 &&
          object.user_answer.character_comment_set &&
          object.user_answer.character_comment_set.length > 0
        "
        :object="object.user_answer.character_comment_set[0]"
        :need_score="false"
        :is_char="true"
        :is_user="false"
      />
      <div
        v-if="
          type == 3 &&
          (!object.user_answer.character_comment_set ||
            object.user_answer.character_comment_set.length == 0)
        "
      >
        Здесь будет комментарий от авторов курса
      </div>
    </div>
    <div
      class="question__answer-comment"
      v-else-if="object.comment_number > 0 && object.user_answer.text"
    >
      <div class="question__answer-comment__title">
        Оцените ответы других
        <span
          class="main_font_color"
          style="font-size: 12px; font-weight: normal; cursor: pointer"
          v-b-tooltip.hover
          title="Мы не специально усложняем Вам жизнь.
Комментируя других, Вы помогаете в первую очередь себе. Чем глубже Вы анализируете каждую ситуацию, чем больше вариантов решений перебираете — тем лучше Вы запоминаете материал."
          >(зачем мне это делать?)</span
        >
      </div>
      <div class="question__answer-comment__answer">
        <CharMessage
          :object="object.answer_to_comment"
          direction="left"
          :is_user="true"
        />
      </div>

      <div class="comments_left">
        {{ object.answer_set.length + 1 }} из {{ object.comment_number }}
      </div>
      <textarea rows="4" placeholder="Ваш комментарий" v-model="answer_comment">
      </textarea>
      <transition name="fade">
        <div
          class="question__content__error"
          v-if="process && !validAnswerComment"
        >
          Введите не менее 10 символов
        </div>
      </transition>
      <div class="question__answer-comment__button">
        <FormButton
          :loading="loading"
          text="Отправить"
          :inactive="process"
          size="medium-large"
          color="primary"
          @click="sendCommentAnswer"
        />
      </div>
    </div> -->
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
// import Mark from "./question/Mark";
// import MyComments from "./question/MyComments";
export default {
  components: {
    FormButton,
    // FileUploader,
    AuthorAnswer,
    ContentHeader,
    AfterTaskMessage,
    AnswerCharMessage,
    // MyComments,
    // Mark,
    CharMessage,
  },
  props: ["object", "page", "sequence_no", "place_id", "complete"],
  data() {
    return {
      answer: "",
      answer_comment: "",
      process: false,
      type: 1,
      files: [],
    };
  },
  computed: {
    ...mapGetters({
      loading: "utility/getCourseTaskLoading",
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
            type: "open",
            id: this.object.id,
            text: this.object.text,
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
    async sendCommentAnswer() {
      this.process = true;
      this.$store.commit("utility/SET_COURSE_TASK_LOADING", true);

      if (this.validAnswerComment) {
        await this.$store.dispatch("course/SEND_OPEN_QUESTION_COMMENT", {
          page_id: this.page,
          seq_no: this.sequence_no,
          place: this.place_id,
          text: this.answer_comment,
          id: this.object.answer_to_comment.id,
        });
        this.process = false;
        this.answer_comment = "";
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