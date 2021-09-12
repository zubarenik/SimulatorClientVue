import api from '@/api/';
import router from '../../router'
import axios from 'axios';
export default {
  namespaced: true,
  state() {
    return {
      simInfo: {},
      curr_pay: undefined,
      curr_win: undefined,
      currCert: {},
      promocode: {}, 
      appLoad: false, 
      lessons: null
    }
  },
  getters: {
    getSimInfo: stateFreezed => stateFreezed.simInfo,
    getCurrPay: stateFreezed => stateFreezed.curr_pay,
    getCurrWin: stateFreezed => stateFreezed.curr_win,
    getPromocode: stateFreezed => stateFreezed.promocode,
    getCurrCert: stateFreezed => stateFreezed.currCert,
    getLessons: stateFreezed => stateFreezed.lessons

  },
  actions: {
    async SEND_NOTIFICATION(context, value) {

      if (context.state.simInfo.notifications_url) {
        const data = new FormData();
        data.append("user_id", context.rootState.user.meInfo.id);
        data.append("user_email", context.rootState.user.meInfo.email);
        data.append("type", value.type);
        if (value.id)
          data.append("id", value.id);
        if (value.text)
          data.append("text", value.text);
        if (value.answer)
          data.append("answer", value.answer);
        if (value.name)
          data.append("name", value.name);
        if (value.surname)
          data.append("surname", value.surname);
        if (value.utm)
          data.append("utm", value.utm);
        if (value.gender)
          data.append("gender", value.gender);
        if (value.lesson_id)
          data.append("lesson_id", value.lesson_id);
        if (value.lesson_name)
          data.append("lesson_name", value.lesson_name);
        if (value.page_id)
          data.append("page_id", value.page_id)
        if (value.page_name)
          data.append("page_name", value.page_name)
        axios
          .post(context.state.simInfo.notifications_url, data)
          // eslint-disable-next-line no-unused-vars
          .then(response => {

          })
          // eslint-disable-next-line no-unused-vars
          .catch(error => {
          })
      }



    },
    async FETCH({ commit }) {


      await api.get('simulators/details.json').then(response => {
        commit('SET_SIM_INFO', response.data)
      })
        .catch(function (error) {
          if (error.response.status == 500) {
            commit("user/SET_LOGOUT", null, { root: true });
            router.push({ path: '/login' })
          }

        })

    },
    async LESSONS_FETCH({ commit }) {


      await api.get(`lessons.json`).then(response => {
        commit('SET_SIM_LESSONS', response.data)
      })
        .catch(function (error) {
          if (error.response.status == 500) {
            // commit("user/SET_LOGOUT", null, { root: true });
            // router.push({ path: '/login' })
          }

        })

    },
    async PAY(context) {
      const win = window.open("about:blank", "", "height=600,width=600");
      win.document.write("Перенаправляем в платежный сервис...");
      const data = new FormData();
      data.append("block", context.getters.getSimInfo.id);
      if (context.getters.getPromocode.promo_code) {
        data.append("promo_code", context.getters.getPromocode.promo_code)
      }


      const response = await api.post('api/pay/', data);
      if (response.status === 200) {
        win.location.replace(response.data.confirmation_url);
        win.focus();
        let timer = setInterval(async () => {
          const response_pay = await api.get(`api/payment/${response.data.id}`)
          if (response_pay.data.status === 2) {
            win.close();
            context.dispatch("FETCH");
            clearInterval(timer);
          }
        }, 10000);
      }
    },
    async ACTIVATE_PROMOCODE(context, promocode) {
      const data = new FormData()
      data.append('simulator', context.getters.getSimInfo.id)
      data.append('promo_code', promocode.slug)
      try {
        const response = await api.post("api/activate_promo_code/", data)
        if (response.data.success) {
          context.commit('SET_CURR_PROMOCODE', response.data);
          promocode.vm.$bvToast.toast('Цена на симулятор изменена', {
            title: 'Промокод применен!',
            variant: 'success',
            solid: true
          })
        } else {
          promocode.vm.$bvToast.toast('Попробуйте другой промокод', {
            title: 'Промокод больше неактивен',
            variant: 'danger',
            solid: true
          })
        }

      } catch (e) {
        if (e.response.status === 404) {
          promocode.vm.$bvToast.toast('Попробуйте другой промокод', {
            title: 'Такого промокода нет',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    async FETCH_CERTS(context) {
      try {
        const response = await api.get('api/my_certificates/')

        if (response.data.length === 1) {
          context.commit("SET_CURR_CERT", response.data[0]);
        }

      } catch (e) {
        console.log(e)
      }
    },
    async SET_CERT_IMAGE(context, cert) {
      try {
        const data = new FormData();
        data.append("image", cert.img);
        const response = await api.post(`api/set_cert_image/${cert.slug}/`, data)
        return response
      } catch (e) {
        console.log(e)
      }
    }


  },
  mutations: {
    SET_SIM_INFO(state, response) {
      state.simInfo = response
    },
    SET_SIM_LESSONS(state, response) {
      state.lessons = response
    },
    SET_CURR_CERT(state, response) {
      state.currCert = response
    },
    SET_CURR_PROMOCODE(state, response) {
      state.promocode = response;
    }
  }
}
