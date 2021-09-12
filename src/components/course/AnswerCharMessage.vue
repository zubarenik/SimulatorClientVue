<template>
  <div class="message" v-if="object">
    <div class="message-answer right" >
      <div class="message__author d-none d-sm-flex">
        <div class="message__author__avatar right" >
          <img :src="user.avatar.replace('http://','https://')" alt />
        </div>
      </div>

      <div class="message__content w-100 w-sm-80">
        <div class="message__content__char">
          
          <template>
            <img :src=" user.avatar.replace('http://','https://')" alt class='d-table d-sm-none char_img_mobile' />
            <div class="message__content__char__name">
              {{ user.first_name }} {{ user.last_name
              }}<span style="font-weight: 400">, {{object.forced_role?object.forced_role:'Это вы'}}</span>
            </div>
          </template>
          
        </div>
        <div
          class="message__content__text"
          :class="{'pre-line': 'is_user'}"
          v-html="object"
        ></div>
        
        
        <div class="message__content__triangle d-none d-sm-block right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import postscribe from "postscribe";
export default {
  components: {
  },
  props: {
    object: {
      type: String,
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
