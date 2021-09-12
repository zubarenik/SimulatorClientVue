<template>
  <div class="message" v-if="object">
    <div class="message-answer" :class="direction">
      <div class="message__author d-none d-sm-flex">
        <div class="message__author__avatar" :class="direction">
          <img :src="object.character.avatar?'//newapi.mysimulator.ru'+object.character.avatar:user.avatar.replace('http://','https://')" v-if="!object.is_current_user" alt />
          <img :src="user.avatar.replace('http://','https://')" v-else alt />
        </div>
      </div>

      <div class="message__content w-100 w-sm-80">
        <div class="message__content__char">
          <template v-if="!object.is_current_user">
          <img :src=" object.character.avatar?'//newapi.mysimulator.ru'+object.character.avatar:user.avatar.replace('http://','https://')" alt class='d-table d-sm-none char_img_mobile' />
          <div class="message__content__char__name">
            {{ object.character.first_name }} {{ object.character.last_name
            }}<span v-if="object.character.social_role" style="font-weight: 400">, {{object.character.social_role}}</span>
          </div>
          </template>
          <template v-else>
            <img :src=" user.avatar.replace('http://','https://')" alt class='d-table d-sm-none char_img_mobile' />
            <div class="message__content__char__name">
              {{ user.first_name }} {{ user.last_name
              }}<span style="font-weight: 400">, {{object.forced_role?object.forced_role:'Это вы'}}</span>
            </div>
          </template>
          <div
            v-if="object.type === 'open_comment'"
            class="message__content__char__score"
          >
            <StarRating
              :star-size="20"
              active-color="#FFCF5C"
              :show-rating="false"
              :rating="object.score ? object.score : 0"
              :read-only="true"
            />
          </div>
        </div>
        <div
          class="message__content__text"
          v-if="user.male || !object.female_text"
          :class="{'mb-3': object.files, 'pre-line': is_user}"
          v-html="
            (object.text?object.text:object.answer)
              .replace(/%name%/g, user.first_name)
              .replace(/%surname%/g, user.last_name)
              
          "
        ></div>
        <div
          class="message__content__text"
          v-else
          :class="{'mb-3': object.files, 'pre-line': is_user}"
          v-html="
            object.female_text
              .replace(/%name%/g, user.first_name)
              .replace(/%surname%/g, user.last_name)
              
          "
        ></div>
        <FileList v-if="object.files" :uploaded="true" :files="object.files"/>
        <div v-if="need_score && !is_char" class="mt-2">
          <StarRating
            :star-size="30"
            active-color="#FFCF5C"
            :show-rating="false"
            v-model="rating"
            @rating-selected="$emit('score-comment', rating)"
            :rating="object.score ? object.score : 0"
          />
        </div>
        <div v-else-if="need_score && is_char" class="mt-2">
          <b-btn variant="primary" size="sm" @click="$emit('score-comment')">Просмотрено</b-btn>
        </div>
        <div class="message__content__triangle d-none d-sm-block" :class="direction"></div>
        <FormButton
          :loading="loading"
          :inactive="loading "
          v-if="button && loaded"
          text="Далее"
          size="medium-large"
          color="primary"
          @click="nextStory"
          style="margin-bottom: 5px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { mapGetters } from "vuex";
import FormButton from "@/components/global/form/FormButton";
import postscribe from "postscribe";
import FileList from "../global/FileUploader";
export default {
  components: {
    FormButton,
    FileList,
    StarRating,
  },
  props: {
    object: {
      type: Object,
    },
    place_id: {
      type: Number,
    },
    direction: {
      type: String,
      default: "left",
    },
    page: {
      type: Number,
    },
    sequence_no: {
      type: Number,
    },
    need_score: {
      type: Boolean,
      default: false,
    },
    is_char: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Boolean,
    },
    is_user: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rating: 0,
      loaded: false
    };
  },
  computed: {
    ...mapGetters({
      loading: "utility/getCourseTaskLoading",
      user: "user/getMeInfo",
    }),
  },
  methods: {
    async nextStory() {
      this.$store.commit("utility/SET_COURSE_TASK_LOADING", true);
      await this.$store.dispatch("page/PAGE_NEXT", {
        place: this.place_id,
        page_id: this.page,
        seq_no: this.sequence_no,
      });
    },
  },
  mounted() {
    if (
      this.object.script_text &&
      this.object.script_id &&
      this.object.script_id != "" &&
      this.object.script_text != ""
    ) {
      let str = this.object.script_text;
      postscribe("#" + this.object.script_id, str);
    }
    this.$nextTick(() => {
        this.loaded = true
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vars.scss";

.pre-line {
  white-space: pre-line;
}
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
  .char_img_mobile {
    height: 35px;
    width: 35px;
    border-radius: 35px;
    margin-right: 10px;
  }
  .message__content__char__name {
    margin-top: 4px;
  }
}
</style>
