import api from '@/api/';

export default {
    namespaced: true,
    state () {
        return {
            comments: [],
            token: localStorage.getItem("token"),
        }
    },
    getters: {
        getComments: stateFreezed => stateFreezed.comments,

    },
    actions: {
        async GET_COMMENTS ({ commit }) {
            const response = await api.get('/new_comments/')
            commit('SET_COMMENTS', response.data)
        }
    },
    mutations: {
        SET_COMMENTS (state, response) {
            state.comments = response
        }
    }
}