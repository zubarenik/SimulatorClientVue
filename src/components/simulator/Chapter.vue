<template>
  <div class="chapter" @click="$emit('click')" :class="{ 'mb-3': isTablet }">
    <div class="chapter__content">
      <div
        :class="{ chapter__container: true, active: isActive || isTablet }"
        class="p-4"
      >
        <div
          :class="{ chapter__img: true, 'filter-img': filter }"
          class="mr-4"
          :style="`background-image: url(${ picture})`"
          v-if="!isMobile"
        ></div>
        <h5 class="chapter__text" v-if="chapter">
          <div class="chapter__title">{{ chapter.name }}</div>
          <!-- <div class="chapter__percentage" v-if="chapter.started && paid ">{{percent}}</div> -->
        </h5>
      </div>
    </div>
    <div class="chapter__arrow-frame" v-if="isActive || isTablet">
      <div class="chapter__arrow">
        <div class="cia-in"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["chapter", "picture", "paid", "index", "filter"],
  computed: {
    ...mapGetters({
      currChapter: "chapter/getCurrChapter",
      isTablet: "utility/getIsTablet",
      isMobile: "utility/getIsMobile",
    }),
    isActive() {
      if (this.currChapter) {
        return this.currChapter.id === this.chapter.id;
      } else {
        if (this.index === 0) {
          this.$store.commit("chapter/SET_CURR_CHAPTER", this.chapter);
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/vars.scss";

.chapter {
  display: flex;
  flex-direction: row;
  position: relative;

  &__content {
    width: calc(100% - 42px);
    height: 180px;
  }

  &__container.active {
    background-color: white;
    border-radius: 20px 13px 13px 20px;
    border-left: 1px solid #f2f1f1;
    border-top: 1px solid #f2f1f1;
    border-bottom: 1px solid #f2f1f1;
    box-shadow: 0 14px 14px rgba(239, 239, 242, 1);
  }

  &__container {
    height: 180px;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  &__img {
    // width: 200px;
    // height: 140px;
    min-width: 150px;
    height: 100%;
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    // margin-left: 20px;
    &.filter-img {
      filter: grayscale(1);
    }
  }

  &__text {
    width: 100%;
    margin-bottom: 0;
    padding-right: 13px;
  }

  &__title {
    // font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    // font-size: calc((100vw - 1150px) / (2500 - 1150) * (32 - 22) + 22px);
  }

  &__percentage {
    // font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    // font-size: calc((100vw - 1150px) / (2500 - 1150) * (26 - 20) + 20px);
    color: #08a2dc;
  }

  &__arrow-frame {
    height: 93px;
    width: 106px;
    transform: rotate(57.5deg);
    position: absolute;
    top: 42px;
    right: 0;
  }

  &__arrow {
    width: 117px;
    height: 93px;
    transform: skewX(25deg);
    background-color: transparent;
    border-radius: 6px 0;
    border-top-right-radius: 10px;
    overflow: hidden;
  }
}
.cia-in {
  background-color: white;
  width: 106px;
  height: 92px;
  position: relative;
  left: -2px;
  top: 4px;
  border-radius: 6px 0;
  border-top-right-radius: 10px;
  border-top: 1px solid #f2f1f1;
  border-right: 1px solid #f2f1f1;
  box-shadow: 5px 14px 14px rgba(239, 239, 242, 1);
}

@media (max-width: 1920px) {
  .chapter__content {
    height: 150px;
  }
  .chapter__container {
    height: 150px;
  }
  .chapter__text {
    // padding-left: 30px;
  }
  .chapter__title {
    // max-width: 160px;
  }
  .chapter__arrow-frame {
    height: 80px;
    width: 90px;
    top: 35px;
    // right: 47px;
  }
  .chapter__arrow {
    width: 105px;
    height: 80px;
  }
  .cia-in {
    width: 89px;
    height: 80px;
    left: -2px;
    top: 2px;
  }
}

@media (max-width: 1200px) {
  .chapter__container {
    height: 120px;
  }
  .chapter__content {
    height: 120px;
  }
  .chapter__arrow-frame {
    width: 85px;
    top: 30px;
    // right: 48px;
  }
  .chapter__arrow {
    width: 85px;
    height: 64px;
  }
  .chapter__img {
    height: 90px;
    width: 120px;
  }
  .cia-in {
    width: 71px;
    height: 64px;
    left: -7px;
    top: 5px;
  }
  .chapter__title {
    line-height: 1.2;
  }
}

@media (max-width: 1200px) {
  .cia-in {
    left: -7px;
    top: 6px;
  }
}
@media (max-width: 575.8px) {
  .chapter__title {
    font-size: 1rem;
  }
}
</style>