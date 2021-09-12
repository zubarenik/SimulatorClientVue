// import api from '@/api/';

export default {
    namespaced: true,
    state () {
      return {
        currChapter: undefined,
      }
    },
    getters: {
      getCurrChapter: stateFreezed => stateFreezed.currChapter,
      
    },
    mutations: {
        SET_CURR_CHAPTER (state, chapter) {
        state.currChapter = chapter
      }
    }
  }
  