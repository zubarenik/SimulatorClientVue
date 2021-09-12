// import api from '@/api/';

import api from "../../api"

export default {
    namespaced: true,
    state () {
      return {
        isMobile: false,
        isTablet: false,
        ShowLogin: true,
        courseTaskLoading: false,
        loginLoading: false, 
        isLoading: false
      }
    },
    getters: {
      getIsTablet: stateFreezed => stateFreezed.isTablet,
      getIsMobile: stateFreezed => stateFreezed.isMobile,
      getShowLogin: stateFreezed => stateFreezed.ShowLogin,
      getLoginLoading: stateFreezed => stateFreezed.loginLoading,
      getCourseTaskLoading: stateFreezed => stateFreezed.courseTaskLoading,
      getIsLoading: stateFreezed => stateFreezed.isLoading,
      
    },
    mutations: {
      SET_IS_MOBILE (state, isMobile) {
        state.isMobile = isMobile
      },
      SET_IS_TABLET (state, isMobile) {
        state.isTablet = isMobile
      },
      SET_SHOW_LOGIN (state, show) {
        state.ShowLogin = show
      },
      SET_LOGIN_LOADING (state, loading) {
        state.loginLoading = loading
      },
      SET_COURSE_TASK_LOADING(state, loading){
        state.courseTaskLoading = loading
      },
      SET_IS_LOADING(state, loading){
        state.isLoading = loading
      }
    }, 
    actions: {
      async uploadFile (context, payload){
        try{
          const response = await api.post("api/upload_file/", payload)
          return response
        }catch(e){
          console.log(e)
        }
          
      },  
      ChangeLoading ({commit}, loading) {
        commit('SET_IS_LOADING', loading)

      }
    }
  }
  