import api from '@/api/';

export default {
    namespaced: true,
    state () {
      return {
      }
    },
    getters: {
      
    },
    actions: {
      async SEND_OPEN_QUESTION(context, open_question){
        const data = new FormData()
        let config = {}
        data.append('question', open_question.id)
        data.append('place', open_question.place)
        data.append('page', open_question.page_id);
        data.append('text', open_question.text)
        data.append('seq_no', open_question.seq_no)
        if (open_question.files){
          config = {
            headers: { 'Content-Type':'multipart/form-data'  }
          };
          open_question.files.forEach(el => {
            data.append("files[]", el)
          });
        }
        const response = await api.post('api/open_answer/', data, config);
        if (response.status === 201 || response.status === 200){
            // context.dispatch('page/FETCH_PAGE_OFFSET',open_question, {root:true})
            // context.commit('page/SET_PAGE_OFFSET_INFO', response.data, {root: true})
            context.commit('page/SET_PAGE_OPEN_QUESTION_INFO', response.data, {root: true})
            context.commit('utility/SET_COURSE_TASK_LOADING',false, {root:true})
        }
      },
      async SEND_OPEN_QUESTION_EXPERT(context, open_question){
        const data = new FormData()
        let config = {}
        data.append('question', open_question.id)
        data.append('place', open_question.place)
        data.append('page', open_question.page_id);
        data.append('text', open_question.text)
        data.append('seq_no', open_question.seq_no)
        if (open_question.files){
          config = {
            headers: { 'Content-Type':'multipart/form-data'  }
          };
          open_question.files.forEach(el => {
            data.append("files[]", el)
          });
        }
        const response = await api.post('api/open_answer_expert/', data, config);
        if (response.status === 201 || response.status === 200){
            // context.dispatch('page/FETCH_PAGE_OFFSET',open_question, {root:true})
            // context.commit('page/SET_PAGE_OFFSET_INFO', response.data, {root: true})
            context.commit('page/SET_PAGE_OPEN_QUESTION_INFO', response.data, {root: true})
            context.commit('utility/SET_COURSE_TASK_LOADING',false, {root:true})
        }
      },
      async _CHECK(context, open_question){
        const data = new FormData()
        data.append('question', open_question.id)
        data.append('place', open_question.place)
        data.append('page', open_question.page_id);
        data.append('answer', open_question.answer)
        data.append('seq_no', open_question.seq_no)
        data.append('simulator', open_question.simulator)
        const response = await api.post('api/answer_check/', data);
        if (response.status === 201 || response.status === 200){
            context.commit('page/SET_PAGE_OPEN_QUESTION_INFO', response.data, {root: true})
            context.commit('utility/SET_COURSE_TASK_LOADING',false, {root:true})
        }
      },
      async SEND_OPEN_QUESTION_COMMENT(context, open_question){
        const data = new FormData()
        data.append('open_answer', open_question.id)
        data.append('text', open_question.text)
        data.append('place', open_question.place)
        data.append('page', open_question.page_id);
        data.append('seq_no', open_question.seq_no)
        const response = await api.post('api/comment/', data);
        if (response.status === 201 || response.status === 200){
            // context.dispatch('page/FETCH_PAGE_OFFSET',open_question, {root:true})
            // context.commit('page/SET_PAGE_OFFSET_INFO', response.data, {root: true})
            context.commit('page/SET_PAGE_OPEN_QUESTION_INFO', response.data, {root: true})
            // context.commit('page/ADD_PLACE_TO_PAGE', response.data, {root: true})
            context.commit('utility/SET_COURSE_TASK_LOADING',false, {root:true})
        }
      },
      async SEND_QUESTION({dispatch}, question){
        // const data = new FormData()
        console.log(question.answers)
        const data = {
          answers: question.answers
        }
        const response = await api.post(`places/${question.place}/complete.json`, data);
        if (response.status === 201 || response.status === 200){
          dispatch('page/FETCH_PAGE',question.page_id, {root:true})
        }
      },
      async SEND_TEXT_QUESTION({dispatch}, question){
        // const data = new FormData()
        const data = {
          user_answer: question.answer
        }
        const response = await api.post(`places/${question.place}/complete.json`, data);
        if (response.status === 201 || response.status === 200){
          dispatch('page/FETCH_PAGE',question.page_id, {root:true})
        }
      },
      async SEND_CHOOSE({dispatch}, question){
        const data = {
          answers: question.index,
        }
        const response = await api.post(`places/${question.place}/complete.json`, data);
        if (response.status === 201 || response.status === 200){
          dispatch('page/FETCH_PAGE',question.page_id, {root:true})
        }
      },
      async REQUEST_AUTHOR_COMMENT(context, question){
        const data = new FormData();
        data.append("open_answer", question.id);
        try {
          await api.post("api/request_admin_comment/", data);
          question.vm.$bvToast.toast('В ближайшее время вы увидите ответ в уведомлениях', {
            title: 'Успешно',
            variant: 'success',
            solid: true
          })
          return true
        }catch(e){
          if (e.response.status === 401){
            question.vm.$bvToast.toast('Прокомментируйте чужие ответы чтоб получить звезды', {
              title: 'Не хватает звезд или вы уже запросили ответ',
              variant: 'danger',
              solid: true
            }) 
          }
          return false
        }
      }
    },
    mutations: {
    }
  }
  