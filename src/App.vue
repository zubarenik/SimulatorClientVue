<template>
  <div id="app" class="container-fluid px-0" :style="cssVars">
    <loading :active="isLoadingApp || isLoading" :is-full-page="true"></loading>
    <template v-if="simInfo">
    <div
      class="app-container row mr-0"
      :class="{ blur: !isLogin && showLogin }"
      v-if="isLogin"
    >
      <div v-if="!isMobile" class="col-xl-3 col-4">
        <div class="position-fixed" :class="{ tablet_width: isTablet }">
          <div class="scroll-position">
            <SideBar />
          </div>
        </div>
      </div>
      <div v-else-if="routeName === 'Courses'" class="col-12 px-0">
        <MobileHeader />
      </div>
      <div
        class="col-12 col-md-8 col-xl-9 px-md-0 pr-1"
        style="position: unset"
      >
        <router-view />
      </div>
    </div>
    <div class="col-md-9" v-if="!isLogin && showLogin">
      <router-view />
    </div>
    <my-scripts
      v-if="
        simInfo.simulator_script &&
        routeName != 'Login' &&
        routeName != 'Register' &&
        routeName != 'Recover' &&
        routeName != 'MakeUser' &&
        routeName != 'Profile'
      "
    >
    </my-scripts>
    </template>
  </div>
</template>

<script>
import SideBar from "./views/SideBar";
import MobileHeader from "./views/MobileHeader";
import Loading from "vue-loading-overlay";
import MyScripts from "./components/global/MyScripts";
import "vue-loading-overlay/dist/vue-loading.css";
// import Footer from "@/components/global/userInfo/Footer";
import { mapGetters } from "vuex";

export default {
  components: {
    SideBar,
    MobileHeader,
    // Footer,
    Loading,
    MyScripts,
  },
  data() {
    return {
      mainColor: null,
      isLoadingApp: true
    };
  },
  name:'app',
  async created() {
    if(this.token)
    {
      await this.$store.dispatch("user/FETCH")
    }
    
  },
  mounted() {
    this.setWidth();
    this.fetchSimInfo();


    window.addEventListener("resize", this.setWidth);

    
  },
  computed: {
    ...mapGetters({
      token: "user/getToken",
      isLogin: "user/getIsLogin",
      isMobile: "utility/getIsMobile",
      isTablet: "utility/getIsTablet",
      showLogin: "utility/getShowLogin",
      isLoading: "utility/getIsLoading",
      simInfo: "simulator/getSimInfo",
    }),
    routeName() {
      return this.$route.name;
    },
    cssVars() {
      return {
        "--mainColor": this.mainColor,
      };
    },
  },
  watch: {
    simInfo(val) {
      this.init(val)
    },
  },
  methods: {
    init(val){
       this.mainColor = this.simInfo.color ? this.simInfo.color : null;
        this.$nextTick(() => {  
          this.isLoadingApp = false
          let file = document.createElement('link');
          file.rel = 'stylesheet';
          file.href = this.simInfo.css
          document.head.appendChild(file)
          var link = document.querySelector("link[rel~='icon']");
          document.title = val.name;
          if (this.simInfo.favicon) {
            link = document.createElement("link");
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
            link.href = this.simInfo.favicon
            .toString()
            .replace(/^http:\/\//i, "https://");   
          }
            
        });  
    },
    setWidth() {
      if (window.innerWidth <= 767.8) {
        this.$store.commit("utility/SET_IS_TABLET", true);
        this.$store.commit("utility/SET_IS_MOBILE", true);
      } else if (window.innerWidth <= 1199.8) {
        this.$store.commit("utility/SET_IS_TABLET", true);
        this.$store.commit("utility/SET_IS_MOBILE", false);
      } else {
        this.$store.commit("utility/SET_IS_MOBILE", false);
        this.$store.commit("utility/SET_IS_TABLET", false);
      }
    },
    async fetchSimInfo() {
      await this.$store.dispatch("simulator/FETCH");
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/vars.scss";
*,
*::before,
*::after {
  box-sizing: border-box;
}
*:focus {
  outline: none;
}
.sidebar__container,
.sidebar {
  scrollbar-width: none;
}
button,
input {
  color: $main_font_color;
  font-family: Open Sans;
  // font-size: $mainTextSize;
  // line-height: 1.375;
  outline: none;
  border: none;
}
.bm-item-list {
  min-width: 100vw !important;
  color: unset !important;
  margin-left: 0px !important;
}

.bm-menu {
  height: 100% !important; /* 100% Full-height */
  // width: 100% !important; /* 0 width - change this with JavaScript */
  background-color: #fff !important;
  padding-top: 0px !important;
}

html {
  // color: $main_font_color;
  // font-family: 'Open Sans', sans-serif;
  // font-size: responsive $mainTextSizeMin $mainTextSizeMax;
  // font-range: $minScreenWidth $maxScreenWidth;
  // font-size: $mainTextSize;
  // line-height: 1.375;
  min-height: 100%;
  position: relative;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -webkit-overflow-scrolling: touch;
  -webkit-text-size-adjust: none;
}
body {
  font-family: Open Sans !important;
  // font-size: $mainTextSize !important;
  margin: 0px;
  padding: 0px;
  background-color: $main_background_color !important;
}
p {
  word-break: break-word;
}
.app-container {
  display: flex;
  &.blur {
    filter: blur(5px);
  }
}

@media (min-width: 1800px) {
  html {
    font-size: 20px;
  }
}
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b4b4b4;
}
.position-fixed {
  position: fixed;
  width: 23%;
  &.tablet_width {
    width: 31%;
  }
}
.sidebar__container::-webkit-scrollbar {
  display: none;
}
//перекрытие стилей scoped для v-html
.message__content img,
.message__content__text img {
  max-width: 100%;
}
.author-answer ul {
  list-style: none;
}
.author-answer ul li {
  position: relative;
}
.author-answer ul li:before {
  content: "•";
  padding-right: 10px;
  font-size: 2rem;
  line-height: 1;
  position: absolute;
  margin-left: -1em;
  width: 1em;
  top: -4px;
}
.btn-primary {
  color: white !important;
  background-color: var(--mainColor) !important;
  border-color: var(--mainColor) !important;
}
.onboarding_lesson:after,
.onboarding_lesson:before, .pages_list {
  border-color: var(--mainColor) !important;
}
.pay {
  color: var(--mainColor);
}
.pay__promocode {
  color: var(--mainColor);
  border-bottom: 1px dashed var(--mainColor);
}
.question__comment-type:hover,
.question__comment-type.active {
  color: var(--mainColor) !important;
  border-bottom: 1px dashed var(--mainColor) !important;
}
p a {
  color: var(--mainColor) !important;
}
.author-answer li:before {
  color: var(--mainColor);
}
.author-answer {
  border-left: solid 4px var(--mainColor);
}
.pages-preview__page__title.active {
  color: var(--mainColor);
}
.makeuser__active-button,
.makeuser__submit,
.auth {
  background-color: var(--mainColor) !important;
}
.main_font_color,
.comments_left,
.auth__change {
  color: var(--mainColor) !important;
}

//стили с сервака

//конец стилей с сервака
// стили для админки и костыли для клинетов
.illustration {
  float: left;
  margin-right: 10px;
  width: 240px;
  max-width: 100%;
  margin-top: 7px;
}
.inside_buy_button a {
  color: white;
  text-decoration: none;
}
.video {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 ratio */
  padding-top: 25px;
  height: 0;
}
.video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

