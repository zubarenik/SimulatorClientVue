import api from '@/api/';

export default {
    namespaced: true,
    state () {
      return {
        currPage: undefined,
        pageInfo: {},
        pageLessons: null,
        showOnboarding: false,
      }
    },
    getters: {
      getcurrPage: (state) => {
        return state.currPage
      }, 
      getPageLessons: (state) => {
        return state.pageLessons
      }, 
      getPageInfo: (state) => {
        return state.pageInfo
      }, 
      getShowOnboarding: (state) => {
        return state.showOnboarding
      }
      
    },
    actions: {
      async GET_LESSONS(context, id)
      {
        context.commit('SET_LESSONS_PAGE',[])
        const response = await api.get('api/2/get_pages/'+id+'/').catch(error=>{
          if(error.response.status == 401)
          {
            // context.commit('user/SET_LOGOUT','', {root:true})
          }
        })
        if (response.status === 200){

          context.commit('SET_LESSONS_PAGE',response.data)

        }
      },
      async SET_PAGE(context, page){
        const data = new FormData()
        if(page.page)
        {
          data.append('page', page.page)
        }
        
        const response = await api.post('simulators/page.json', data).catch(error=>{

          if(error.response.status == 404)
          {
            page.vm.$router.push("/courses");
          }
          if(error.response.status == 401)
          {
            // context.commit('user/SET_LOGOUT','', {root:true})
          }
        })
        if (response.status === 200){
          context.commit('user/SET_CURRENT_PAGE',page.page, {root:true})

        }
      },
      async CLEAR_ALL_PAGE(context){
        context.commit('CLEAR_PAGE')
      },
      async TO_ONBOARDING(context, page){
        const data = new FormData()
        data.append('page', 0)
        const response = await api.post('api/set_current_page/', data).catch(error=>{
          if(error.response.status == 401)
          {
            // context.commit('user/SET_LOGOUT','', {root:true})
          }
        })
        if (response.status === 200){
          context.commit('user/SET_CURRENT_PAGE',page.page, {root:true})
          context.commit('SHOW_ONBOARDING', true)

        }
      },
      async SCORE_PAGE(context, score){
        const data = new FormData()
        data.append('utility', score.utility)
        data.append('fun', score.fun)
        await api.put(`pages/${score.page}/score.json`, data);
      },
      async FETCH_PAGE({commit}, page){
          const response = await api.get(`pages/${page}.json/`);
          
          commit('SET_PAGE_INFO', response.data)
          commit("utility/SET_COURSE_TASK_LOADING", false, {root:true})
      },
      async PAGE_NEXT({dispatch}, page){
        const response = await api.post(`places/${page.place}/complete.json`)
        if (response.status === 200){
          dispatch('FETCH_PAGE',page.page_id)
          
        }
      },
      async FETCH_PAGE_OFFSET({commit}, page){
        const response = await api.get(`api/page_offset/${page.page_id}/${page.seq_no}/`);
        commit('SET_PAGE_OFFSET_INFO', response.data)

      }
    },
    mutations: {
      CLEAR_PAGE(state){
        state.pageInfo = null;
      },
      SET_LESSONS_PAGE(state, value){
        state.pageLessons = value;
      },
      SHOW_ONBOARDING(state, value){
        state.showOnboarding = value;
      },
      CLEAR_PAGE_PLACE_SET(state){
        state.pageInfo.place_set = undefined;
      },
      SET_PAGE_OFFSET_INFO(state, info){
        state.pageInfo.place_set.pop();
        state.pageInfo = {...state.pageInfo, complete: info.complete, place_set: state.pageInfo.place_set.concat(info.place_set)}
        // state.pageInfo.complete = info.complete;
        // state.pageInfo.place_set = state.pageInfo.place_set.concat(info.place_set);
      },
      SET_PAGE_INFO(state, info){
        state.pageInfo = info;
      },
      ADD_PLACE_TO_PAGE(state, info){
        if (info.content_object === null){
        // if (complete){
          state.pageInfo = {...state.pageInfo, complete: true}
        }else{
          state.pageInfo = {...state.pageInfo, place_set: [...state.pageInfo.place_set, info]};
          // state.pageInfo.place_set.concat(info.place_set)
        }
        
      },
      SET_PAGE_OPEN_QUESTION_INFO(state, info){

        if(!Array.isArray(info)){
          state.pageInfo.place_set.pop();
          state.pageInfo.place_set.push(info);
          state.pageInfo = {...state.pageInfo, complete: true}
        }else if(info[0].id === info[1].id){
          state.pageInfo.place_set.pop();
          // state.pageInfo.place_set = state.pageInfo.place_set.concat([info])
          // state.pageInfo = {...state.pageInfo, place_set: [...state.pageInfo.place_set, info[0]]};
          state.pageInfo.place_set.push(info[0]);
        }else if(info[0].content_object.type==='question'){
          state.pageInfo.place_set.pop();
          state.pageInfo.place_set = state.pageInfo.place_set.concat(info);
        }else{
          state.pageInfo.place_set.pop();
          state.pageInfo = {...state.pageInfo, place_set: [...state.pageInfo.place_set, ...info]}
        }
        // if (info.id === state.pageInfo.place_set[state.pageInfo.place_set.length-1].id){
        //   console.log(1)
        //   state.pageInfo.place_set.pop();
        //   state.pageInfo.place_set = state.pageInfo.place_set.concat([info])
        // }else{
        //   console.log(3)
        //   state.pageInfo.place_set.push(info);
        // }
      },
      SET_CURR_PAGE (state, page) {
        state.currPage = page;
      }
    }
  }
  