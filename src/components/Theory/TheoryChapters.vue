<template>
    <div class="theory-chapters col-md-3 order-1 order-md-3 pt-md-5 pt-3 px-md-4">
        <div :class="{'theory-chapters__title': true, 'active': curr_chapter.sequence_no == chapter.sequence_no, 'main_font_color': curr_chapter.sequence_no == chapter.sequence_no}" v-for="(chapter, key) in chapters" :key="key" @click="setCurrChapter(chapter)">{{ chapter.name }}</div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: "TheoryChapters",
    computed: {
        ...mapGetters({
            chapters: 'theory/getTheoryChapters',
            curr_chapter: 'theory/getCurrChapter'
        })
    },
    methods: {
        setCurrChapter(chapter){
            this.$store.commit('theory/SET_CURR_CHAPTER', chapter);
        }
    },
}
</script>

<style lang="scss" scoped>
    .theory-chapters{
        // width: calc(1 / 6 * 100vw);
        border-left: 1px solid #c4c4c4;

        &__title{
            font-size: 1rem;
            margin: 15px 0;
            color: #c4c4c4;
            cursor: pointer;
        }
        
    }
    @media (max-width: 767.98px) {
        .theory-chapters{
        // width: calc(1 / 6 * 100vw);
        border-left: unset;
        padding: 0;
       
      }
    }
</style>