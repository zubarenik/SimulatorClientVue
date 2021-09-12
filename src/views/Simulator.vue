<template>
  <div :class="{container: !isMobile, 'container-fluid': isMobile, 'overflow-hidden': isMobile}" v-if="!isLoading">
    <Slide v-if="isMobile" right :width="getWidth">
        <Sidebar/>
    </Slide>
    <div class="simulator row pt-5" v-if="user">
      <div class="simulator__chapter-list col-12 col-xl-6 pr-0">
        <ChapterList @select_lesson="show_detail=true"/>
      </div>
      <div v-if="!isTablet" class="simulator__chapter-detail col-6">
        <div class="sticky-top" style="top: 20px !important">
          <ChapterDetail />
        </div>
      </div>
      <!-- <div > -->
        <ChapterCome @close="show_detail=false" :active="show_detail" v-else/>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import ChapterDetail from "@/components/simulator/ChapterDetail.vue";
import ChapterList from "@/components/simulator/ChapterList.vue";
import ChapterCome from "@/components/simulator/ChapterCome.vue";
import { mapGetters } from "vuex";

import { Slide } from 'vue-burger-menu'  // import the CSS transitions you wish to use, in this case we are using `Slide`
import Sidebar from '@/views/SideBar'
export default {
  mounted() {
    this.$store.dispatch("utility/ChangeLoading", true);
    this.init()
    
  },
  data(){
    return{
      show_detail: false,
    }
  },
  methods: {
    
    async init()
    {
      if(this.simInfo && this.user)
      {
        if(!this.userCreated)
        {
          this.$router.push('/make_user')
          return
        }
        if(!this.simInfo.onboarding_skip && !this.user.sim_info.onboarding_complete  )
        {
          this.$router.push("/onboarding");
        }
        else{
            await this.fetchLessons()
            if(this.chapter)
            {
              this.$store.commit("chapter/SET_CURR_CHAPTER", this.lessons[this.chapter.sequence_no-1]);
            }
        }
      }
    },
    async fetchLessons() {

        await this.$store.dispatch("simulator/LESSONS_FETCH");
        this.$store.dispatch("utility/ChangeLoading", false);
    },
    async to_onboarding()
    {  
      this.$router.push("/onboarding");
    }
  },
  watch: {
    simInfo() {
      this.init()
    },
    user()
    {
      this.init()
    }
  },
  components: {
    ChapterDetail,
    Slide,
    Sidebar,
    ChapterList,
    ChapterCome,
  },
  computed: {
    ...mapGetters({
      user: "user/getMeInfo",
      isMobile: 'utility/getIsMobile',
      isTablet: 'utility/getIsTablet',
      simInfo: "simulator/getSimInfo", 
      isLoading: "utility/getIsLoading",
      lessons: "simulator/getLessons",
      userCreated: "user/getUserCreated",
      chapter: 'chapter/getCurrChapter',
    }),
    getWidth(){
      return `${window.innerWidth}`
    },
  },
  name: "Simulator",
};
</script>

<style lang="scss" scoped>
.simulator__chapter-list {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none;
}
.simulator__chapter-list::-webkit-scrollbar {
  display: none;
}
</style>
<style lang="scss">

.bm-cross-button{
    right: 0 !important;
    top: 28px !important;
}
.bm-burger-button{
    top: 69px;
}
.bm-cross{
    background-color: #000000;
}
</style>