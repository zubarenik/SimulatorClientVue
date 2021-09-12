import api from '@/api/'
import router from '../../router'

export default {
    namespaced: true,
    state() {
      return {
        meInfo: undefined,
        token: localStorage.getItem("token"),
        isLogin: localStorage.getItem("token") ? true : false,
        onboarding: null,
        onboarding_complete: true,
        page: {
          notifications: null,
          content: null,
          theorys: null,
        },
      }
    },
    getters: {
      getMeInfo: stateFreezed => stateFreezed.meInfo,
      getToken: stateFreezed => stateFreezed.token,
      getIsLogin: stateFreezed => stateFreezed.isLogin,
      getOnboardingComplete: stateFreezed => stateFreezed.onboarding_complete,
      getUserCreated: (state) => {
        if (state.meInfo.first_name && state.meInfo.first_name != ''
            && state.meInfo.last_name && state.meInfo.last_name != ''
            && state.meInfo.avatar
            && state.meInfo.email && state.meInfo.email != '')
          return true
        else
          return false
      }
    },
    actions: {
      async FETCH ({ commit}, routerNext = undefined) {
        await api.get('users/details.json').then(response => {
          commit('SET_USER', response.data)
          // commit('SET_ONBOARDING_COMPLETE', response.data.sim_info.onboarding_complete)
        }).catch(error => {
          console.log(error.message)
          commit('SET_USER', undefined)
          router.push({ name: 'Login' })
        }).finally(() => {
          if (routerNext)
            routerNext()
        })
      },
      async FETCH_BALANCE ({ commit }) {
        await api.get('/balance/').then(response => {
          commit('SET_BALANCE', response.data.balance)
        }).catch(error => {
          console.log(error)
        })
      },
      async LOGIN (context, user) {
        const data = new FormData();
        data.append('username',user.username)
        data.append('password',user.password)

        await api.post("auth/", data)
        .then(async response => {
          context.commit('SET_TOKEN', response.data)
          await context.dispatch('FETCH')
          router.push({ name: 'Courses' })
        }).catch(error => {
          if (error.response.status === 401) {
            user.vm.$bvToast.toast('Проверьте и введите еще раз ', {
              title: 'Неверный логин или пароль',
              variant: 'danger',
              solid: true
            })
          }
        })
      },
      async TEMPLOGIN (context, user){
        const data = new FormData()
        data.append('code', user.code)
        
        await api.post("auth/v2/get_token/", data)
        .then(async response => {
          context.commit('SET_TOKEN', response.data);
          await context.dispatch('FETCH');
          router.push({ name: 'Courses' })
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push({ name: 'Register' })
          }
        })
      },
      async SOCIAL_AUTH (context, [vm, provider]) {
        const response = await api.get("auth/v2/oauth/init/", {
          params: {
            provider: provider
          }
        }).catch(error => {
          console.log('error :>> ', error.message);
        });

        if (response && response.status === 200) {
          const socialWindow = window.open("about:blank", "", "height=600,width=600");
          socialWindow.document.write("Перенаправляем на сайт провайдера...");
          socialWindow.location.replace(response.data.url)
          socialWindow.focus()

          let timer = setInterval(() => {
            api.get(`/auth/v2/${response.data.attemptID}.json`)
            .then(result => {
              if (socialWindow.closed || result.data.status > 0) {
                socialWindow.close()
                clearInterval(timer)
              }

              if (result.data.status === 1) {
                vm.$bvToast.toast('Ошибка на стороне приложения', {
                  title: 'Неизвестная ошибка',
                  variant: 'danger',
                  solid: true
                })
              }

              if (result.data.status === 3) {
                router.push({ path: `/tempkey/${result.data.code}` })
              }
            }).catch(error => {
              console.log('error :>> ', error.message);
              socialWindow.close()
              clearInterval(timer)
            })
          }, 2000)
        }
      },
      async SIGN_UP (context, user) {
        const data = new FormData();
        data.append('username',user.username)
        data.append('email',user.email)
        data.append('password',user.password)
        data.append('re_password',user.password)
        data.append("group", user.group)
        data.append("utm", JSON.stringify(user.utm))

        await api.post("users.json", data)
        .then(response => {
          context.dispatch('LOGIN', {username: response.data.username, password: user.password})
        })
        .catch(error => {
          if (error.response.status === 500) {
            user.vm.$bvToast.toast('Такая почта уже используется', {
              title: 'Почта уже есть в системе',
              variant: 'danger',
              solid: true
            })
          }
        })
      },
      async RECOVER_PASS(context, recover_pass){
        const data = new FormData();
        data.append("email", recover_pass.email);
        const response = await api.post("/request_password_change/", data);
        if (response){
          if (response.status === 201 || response.status === 200){
            recover_pass.vm.$bvToast.toast('Проверьте Вашу почту', {
              title: "Успешно",
              variant: "success",
              solid: true,
            })
          }
        }
      },
      async RESET_PASS(context, formdata){
        const data = new FormData();
        data.append("s", formdata.s);
        data.append("password", formdata.password);
        const response = await api.post("/change_password/", data);
        if (response){
          if (response.status === 201 || response.status === 200){
            formdata.vm.$bvToast.toast('Пароль изменен', {
              title: "Успешно",
              variant: "success",
              solid: true,
            })
          }
        }
      },
      async MAKE_USER({commit, dispatch}, authData){
        const data = new FormData();
        data.append('first_name', authData.first_name);
        data.append('last_name', authData.last_name);
        data.append('email', authData.email);

        if (authData.gender == 'Ж')
          data.append('male', false)
        else
          data.append('male', true)

        if (authData.icon)
          data.append('avatar', authData.icon)

        
          await api.put('users/edit.json', data)
          .then(response => {
            commit('SET_USER', response.data)

            if(authData.needtonotify && authData.needtonotify != '')
              dispatch('simulator/SEND_NOTIFICATION', {
                user_id: authData.id, 
                user_email: authData.email, 
                type: 'makeuser', 
                name:authData.name, 
                surname: authData.surname, 
                utm: authData.utm, 
                gender: authData.gender
              }, { root:true })
            if(authData.onboarding_skip)
            {
              router.push({ name: 'Courses' })
            }
            else
            {
              router.push({ name: 'Onboarding' })
            }
            
          }).catch(error => {
            if (error.response.status == 401) {
              router.push({ name: 'Login' })
            }
            else if (error.response.status == 400) {
              authData.vm.$bvToast.toast(error.response.data.email, {
                title: 'Ошибка почты',
                variant: 'danger',
                solid: true
              })
            }
            else {
              authData.vm.$bvToast.toast('Это обязательно', {
                title: 'Выберите аватар',
                variant: 'danger',
                solid: true
              }) 
            }
          })
        
      }, 
      async EDIT_USER({commit, getters}, authData) {
        const token = getters.getToken
        const data = new FormData();
        data.append('first_name', authData.first_name);
        data.append('last_name', authData.last_name);
        data.append('email', authData.email);
 
        if (authData.gender == 'Ж')
          data.append('male', false)
        else
          data.append('male', true)

        if (authData.icon)
          data.append('avatar', authData.icon)

        if (token) {
          await api.put('users/edit.json', data)
          .then(response => {
            commit('SET_USER', response.data)
          }).catch(error => {
            if (error.response.status == 401) {
              router.push({ name: 'Login' })
            }
          })
        }
      }
    },
    mutations: {
      SET_USER (state, response) {
        if (!response) {
          localStorage.removeItem('token');
          state.token = null;
          state.isLogin = false;
          delete api.defaults.headers['Authorization'];
        }
        console.log(response)
        state.meInfo = response
      },
      SET_CURRENT_PAGE(state, page){
        state.meInfo.sim_info.current_page = page;
      },
      CHANGE_BALANCE(state, value){
        state.meInfo.balance += value;
      },
      SET_BALANCE(state, value){
        state.meInfo.balance = value;
      },
      SET_TOKEN (state, response){
        state.token = response.token
        console.log(response.token)
        state.isLogin = true
        api.defaults.headers['Authorization'] = `Token ${response.token}`;
        localStorage.setItem("token", response.token)
      },
      SET_LOGOUT(state) {
        localStorage.removeItem('token');
        state.isLogin = false
        state.token = null,
        state.user = {
          first_name: null,
          last_name: null,
          icon: null,
          gender: null,
          email: null,
          coin: 0
        },
        state.meInfo = undefined,
        state.page = null,
        state.onboarding = null
      },
      SET_ONBOARDING_COMPLETE(state, complete){
        state.meInfo.sim_info.onboarding_complete = complete
      }
    }
  }