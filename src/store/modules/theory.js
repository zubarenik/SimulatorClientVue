import api from '@/api/';

export default {
    namespaced: true,
    state () {
        return {
            chapters: [],
            curr_chapter: undefined,
        }
    },
    getters: {
        getTheoryChapters: stateFreezed => stateFreezed.chapters,
        getCurrChapter: stateFreezed => stateFreezed.curr_chapter
    },
    actions: {
        async GET_THEORY_CHAPTERS ({ commit }) {
            const response = await api.get('/api/user_theory_chapters/');
            commit('SET_THEORY_CHAPTERS', response.data)
        }
    },
    mutations: {
        SET_THEORY_CHAPTERS (state, response) {
            state.chapters = response;
            if (response.length > 0){
                state.curr_chapter = response[0];
            }
        },
        SET_CURR_CHAPTER(state, chapter){
            state.curr_chapter = chapter;
        }
    }
}