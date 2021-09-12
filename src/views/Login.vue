<template>
  
  <div id="Auth" class="auth" style="" v-if="simInfo">
    <div class="auth__container">
      <div class="auth_span" style="width:100%; margin-bottom:10px;">
        <img :src="'//newapi.mysimulator.ru'+simInfo.logo" alt="" class="img_logo" style="max-width:50%;">
      </div>
      <div class="auth__head">        
          <div class="auth__head__type">{{type === 1 ? 'Войти' : type === 2 ? 'Зарегистрироваться' : 'Восстановить пароль'}}</div>   
      </div>
      <form class="auth__body" @submit.prevent="submitForm">
        <div>
          <FormInput v-if="type < 3" v-model="formdata.email" :valid="validEmail" :error="errorMailMessage" title="E-mail" placeholder="Введите e-mail"/>
          <FormInput v-if="type < 3 || type===4" v-model="formdata.password" :valid="validPass" :error="errorPassMessage" type="password" title="Пароль" placeholder="Введите пароль"/>
          <FormInput v-if="type === 2 || type===4" v-model="formdata.rePassword" :valid="validRePass" :error="errorRePassMessage" type="password" title="Пароль" placeholder="Повторите пароль"/>
          <FormInput v-if="type === 3" v-model="formdata.email" placeholder="Введите почту" title="Email"/>
          <b-form-checkbox
            id="checkbox-1"
            v-model="status"
            name="checkbox-1"
            value="accepted"
            class="mb-3"
            v-if="type === 2 &&simInfo&& simInfo.agreement_url&& simInfo.data_processing_url && simInfo.agreement_url !=''&& simInfo.data_processing_url !=''"
          >
            Я принимаю <a :href="simInfo.agreement_url" target="_blank">правила пользования сервисом</a> и <a :href="simInfo.data_processing_url" target="_blank"> политику обработки персональных данных</a>
          </b-form-checkbox>
        </div>
        <div>
          <FormButton :inactive="isaccept" :loading="formLoading" :text="type === 1 ? 'Войти' : type === 2 ? 'Зарегистрироваться' : type === 3 ? 'Сменить пароль' : 'Изменить пароль'" size="full-width" type="submit" style="margin-bottom:10px;"/>
          <div class="auth__change">
            <div @click="type=2" v-if="type === 1">Зарегистрироваться</div>
            <div @click="type=1" v-if="type > 1">Войти</div>
            <div @click="type=3" v-if="type === 1">Забыли пароль?</div>
          </div>
          <div class="mt-2" v-if="simInfo.group_info && type < 3 && simInfo">
            <hr v-if="simInfo.group_info.auth_facebook_key || simInfo.group_info.auth_vk_key">
            <Facebook @click.native="socialInit('facebook')" style="cursor: pointer;" class="mr-2" v-if="simInfo.group_info.auth_facebook_key" />
            <VK @click.native="socialInit('vk')" style="cursor: pointer;" v-if="simInfo.group_info.auth_vk_key" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FormInput from '@/components/global/form/FormInput';
import FormButton from '@/components/global/form/FormButton';
import Facebook from '@/components/global/svg/Facebook';
import VK from '@/components/global/svg/VK';
import { mapGetters } from 'vuex';

export default {
  components: {
    FormInput,
    FormButton,
    Facebook,
    VK
  },
  data() {
    return {
      status: false,
      errorRePassMessage: 'Пароли не совпадают',
      errorPassMessage: 'Введите минимум 8 символов',
      errorMailMessage: 'Обязательное поле',
      type: 2,
      formdata: {
        password: '',
        email: '',
        rePassword: ''
      }
    }
  },
  mounted() {
    if (this.$route.name == 'Login')
      this.type = 1
    if (this.$route.name == 'Register')
      this.type = 2
    if (this.$route.name == 'Recover')
      this.type = 3
  },
  computed:{
    isaccept()
    {
      if (this.simInfo && this.simInfo.agreement_url && this.simInfo.data_processing_url)
        return (this.type == 2 && !this.status)
      return false
    },
    ...mapGetters({
      simInfo: 'simulator/getSimInfo',
      formLoading: 'utility/getLoginLoading'
    }),
    validEmail() {
      if (this.formdata.email.trim().length >= 5) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(this.formdata.email).toLowerCase())
      }
      return null
    },
    validPass() {
      if (this.formdata.password.trim().length === 0)
        return null
      return this.formdata.password.trim().length >= 8 ? true : false
    },
    validRePass() {
      if (this.formdata.rePassword.trim().length === 0)
        return null
      return this.formdata.rePassword === this.formdata.password
    },
    validLoginForm() {
      return this.validPass && this.validEmail
    },
    validSignUpForm() {
      return this.validPass && this.validEmail && this.validRePass
    }
  },
  methods:{
    async submitForm() {
      this.$store.dispatch('utility/ChangeLoading', true)
      this.$store.commit("utility/SET_LOGIN_LOADING", true)

      if (this.type === 1) {
        if (this.validLoginForm) {
          await this.$store.dispatch("user/LOGIN", {
            vm: this,
            username: `${this.formdata.email}+${this.simInfo.group}`,
            password: this.formdata.password
          })
        }
      } else if (this.type === 2) {
        if (this.validSignUpForm) {
          await this.$store.dispatch("user/SIGN_UP", {
            vm: this,
            email: `${this.formdata.email}`,
            username: `${this.formdata.email}+${this.simInfo.group}`,
            password: this.formdata.password,
            group: this.simInfo.group, 
            utm: this.$route.query
          })
        }
      } else if (this.type === 3) {
        if (this.validEmail) {
          await this.$store.dispatch('user/RECOVER_PASS', {
              vm: this,
              email: `${this.formdata.email}+${this.simInfo.group}`
          })
        }
      } else {
        if (this.validPass && this.validRePass) {
          await this.$store.dispatch("user/RESET_PASS", {
            vm: this,
            password: this.formdata.password,
            s: this.$route.query.s
          })
        }
      }

      this.$store.dispatch('utility/ChangeLoading', false)
      this.$store.commit("utility/SET_LOGIN_LOADING", false)
    },
    async socialInit(provider) {
      this.$store.dispatch('utility/ChangeLoading', true)
      this.$store.commit("utility/SET_LOGIN_LOADING", true)

      await this.$store.dispatch('user/SOCIAL_AUTH', [this, provider])

      this.$store.dispatch('utility/ChangeLoading', false)
      this.$store.commit("utility/SET_LOGIN_LOADING", false)
    }
  },
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.is-not-show{
    display: none;
}

.auth{
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  &__container{
    width: 440px;
    background-color: white;
    z-index: 30;
    box-shadow: 0 14px 14px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px 40px;
  }
  &__head{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
    &__type{
      font-weight: 700;
      font-size: $mediumTextSize;
    }
    &__close{
      cursor: pointer;
    }
  }
  &__body{
    width: 100%;
  }
  &__change{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: $smallestTextSize;
    color: $primary_color;
    div{
      cursor: pointer;
    }

  }
}
</style>