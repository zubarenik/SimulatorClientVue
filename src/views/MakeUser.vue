<template>
  <div class="makeuser px-md-5" v-if="simInfo"> 
    <div class="container">
      <Logo :logo="simInfo.logo" v-if="simInfo.logo && ismobile()" style="margin-bottom:20px;"/>
      <div class="makeuser__page-title">Создание персонажа</div>
      <Story
        v-if="simInfo.welcome_message_author_img && simInfo.welcome_message_author_name && simInfo.welcome_message_author_img"
        :name="simInfo.welcome_message_author_name"
        :img="
          simInfo.welcome_message_author_img
                .toString()
                .replace(/^http:\/\//i, 'https://')
        "
        role="Автор"
        :story="simInfo.welcome_message_text"
      ></Story>
      <div class="makeuser__separate"></div>
      <div class="makeuser__text">Чтобы начать, создайте своего персонажа!</div>
      <b-row>
        <b-col cols="12" class="person">
          <croppa
            :image-border-radius="30"
            :quality="1"
            :prevent-white-space="true"
            v-model="myCroppa"
            :canvas-color="'#ddd'"
             placeholder='Выберите аватар'
             :placeholder-font-size='8'
            :width="70"
            :height="70"
            initial-size="cover"
            style="cursor: pointer; margin-right:40px; float:left;"
            v-b-tooltip.hover title="Нажмите, чтобы выбрать"
          >
          </croppa>
          <div class="person__user">
            <div class="makeuser__auth-group" v-if="userData.email == ''">  
              <label class="makeuser__auth-input-label">Почта</label>
              <b-form-input
                class="makeuser__input"
                v-model="user.email"
                placeholder="Введите почту"
              ></b-form-input>
            </div>
            <div class="makeuser__auth-group">  
              <label class="makeuser__auth-input-label">Имя</label>
              <b-form-input
                class="makeuser__input"
                v-model="user.name"
                placeholder="Введите имя"
              ></b-form-input>
            </div>
            <div class="makeuser__auth-group">
              <label class="makeuser__auth-input-label">Фамилия</label>
              <b-form-input
                class="makeuser__input"
                v-model="user.surname"
                placeholder="Введите фамилию"
              ></b-form-input>
            </div>
            <div class="makeuser__auth-group">
              <label class="makeuser__auth-input-label">Пол</label>
              <div class="makeuser__ismale">
                <div
                  :class="{
                    'makeuser__ismale-button': true,
                    'makeuser__active-button': user.gender == 'М',
                    'makeuser__unactive-button': user.gender != 'М',
                  }"
                  @click="user.gender = 'М'"
                >
                  {{man}}
                </div>
                <div
                  :class="{
                    'makeuser__ismale-button': true,
                    'makeuser__active-button': user.gender == 'Ж',
                    'makeuser__unactive-button': user.gender != 'Ж',
                  }"
                  @click="user.gender = 'Ж'"
                >
                  {{woman}}
                </div>    
              </div>
              <div class="makeuser__submit" @click="onSubmit">Готово</div>
            </div>
          </div>
        </b-col>
      </b-row>      
    </div>
  </div>
</template>

<script>
import Story from "../components/makeUser/Story";
import { mapGetters } from "vuex";
import { isMobileOnly } from 'mobile-device-detect';
import Logo from '@/components/makeUser/Logo';

// import Footer from "../components/global/userInfo/Footer";

export default {
  name: "MakeUser",
  components: {
    // Footer,
    Story,
    Logo
  },
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        gender: "",
      },
      myCroppa: null,
      man: isMobileOnly?'М':'Мужской',
      woman: isMobileOnly?'Ж':'Женский'
    };
  },
  computed: {
    ...mapGetters({
      simInfo: "simulator/getSimInfo",
      userData: "user/getMeInfo",
      userCreated: "user/getUserCreated",
    }),
  },
  watch: {
    userData() {
      this.checkRedirect()
    }
  },
  mounted() {
    this.checkRedirect()
    
  },
  methods: {
    checkRedirect()
    {
      if(this.userCreated)
      {
        if(this.userData.sim_info.onboarding_complete || this.simInfo.onboarding_skip)
        {
          this.$router.push('/courses')
        }
        else{
          this.$router.push('/onboarding')
        }
      }
      else{
        this.$store.dispatch('utility/ChangeLoading', false);
      }
    },
    ismobile()
    {
      return isMobileOnly
    },
    validEmail(email) {
      if (email.trim().length >= 5) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
      }
      return false
    },
    onSubmit() {
      if (this.user.email == '') {
        this.user.email = this.userData.email
      }

      if (this.user.name == '' 
        || this.user.surname == '' 
        || this.user.gender == ''
        || !this.validEmail(this.user.email)) {
        this.$bvToast.toast('Это обязательно', {
          title: 'Нужно заполнить все поля',
          variant: 'danger',
          solid: true
        }) 
        return
      }

      this.myCroppa.generateBlob(
        (blob) => {
          
          if(blob)
          {
            const upload = new File(
              [blob],
              this.user.email +
                "+" +
                this.user.name +
                "+" +
                this.user.surname +
                ".png"
            );

            this.$store.dispatch("user/MAKE_USER", {
              first_name: this.user.name,
              last_name: this.user.surname,
              gender: this.user.gender,
              icon: upload,
              email: this.user.email,
              needtonotify: this.simInfo.notifications_url, 
              utm: this.userData.utm, 
              id:this.userData.id, 
              onboarding_skip:this.simInfo.onboarding_skip, 
              vm: this
            });
          }
          else{
            fetch("https://ui-avatars.com/api/?name="+this.user.surname+' '+this.user.name+'&background='+this.simInfo.color.substring(1)+'&color=fff')
              .then(function (response) {

                return response.blob();
              })
              .then(function (blob1) {

                const upload = new File(
                [blob1],
                this.user.email +
                  "+" +
                  this.user.name +
                  "+" +
                  this.user.surname +
                  ".png"
                  
                );
              
              this.$store.dispatch("user/MAKE_USER", {
                first_name: this.user.name,
                last_name: this.user.surname,
                gender: this.user.gender,
                icon: upload,
                email: this.user.email,
                needtonotify: this.simInfo.notifications_url, 
                utm: this.userData.utm, 
                id:this.userData.id,
                onboarding_skip:this.simInfo.onboarding_skip, 
                vm: this
              });
            }.bind(this))
            .catch(error => {
              console.log(error)
                this.$bvToast.toast('Это обязательно', {
                  title: 'Выберите аватар',
                  variant: 'danger',
                  solid: true
                }) 
            })
          }
          
        },
        "image/png",
        1
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.croppa-container {
  font-size: 0 !important;
  line-height: 0 !important;
  border-radius: 200px !important;
  overflow: hidden;
  margin: 0 auto;
}
.makeuser .container{
  margin: 40px 0;
}
.makeuser {
  // height: 100vh;
  // overflow-y: scroll;
  display: flex;
  flex-direction: row;
  background-color: #fbfbfb;
  label {
    margin-bottom: 0.25rem;
  }
  &__auth-group {
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
  }
  &__container {
    height: auto;
    padding: 1rem 4rem;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &__page-title {
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    font-size: 44px;
    margin-bottom: 70px;
  }
  &__separate {
    width: 100%;
    border-top: 1px solid #acacab;
    margin: 36px 0;
  }
  &__text {
    font-family: "Open Sans", sans-serif;
    // font-weight: 700;
    font-size: 22px;
    margin-bottom: 30px;
    font-style: italic;

  }
  &__form-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    // padding-right: 5%;
  }
  &__input-container {
    display: flex;
    flex-direction: column;
    width: 75%;
    // height: 400px;
    justify-content: space-between;
  }
  &__auth-input-label {
    font-weight: 600;
    font-size: 20px;
  }
  &__input {
    width: 100%;
    height: 60px;
    font-size: 14px;
  }
  &__ismale {
    width: 100%;
    display: flex;
    justify-content: space-between;
    // margin-top: 15px;
  }
  &__ismale-button {
    width: 40%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
  &__unactive-button {
    border: 1px solid #747272;
    color: #747272;
  }
  &__unactive-button:hover {
    border: none;
    background-color: #c4c4c4;
  }
  &__active-button {
    background: #08a2dc;
    border: none;
    color: white;
  }
  &__submit {
    min-height: 56px !important;
    box-shadow: 0 2px 4px rgba(44, 39, 56, 0.08),
      0 4px 8px rgba(44, 39, 56, 0.08);
    border-radius: 6px;
    color: #ebf4f8;
    background-color: #08a2dc;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
  }
  &__submit:hover {
    background-color: #0087cb;
  }
}

@media (max-width: 1920px) {
  .makeuser__page-title {
    font-size: 40px;
    margin-bottom: 20px;
  }

  .makeuser__separate {
    margin: 15px 0;
  }

  .makeuser__text {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .makeuser__input-container {
    // height: 300px;
  }

  .makeuser__input {
    height: 38px;
  }

  .makeuser__auth-input-label {
    font-size: 16px;
  }

  .makeuser__ismale-button {
    font-size: 14px;
  }

  .makeuser__submit {
    font-size: 16px;
    // margin-top: 30px;
  }
}

@media (max-width: 1150px) {
  .makeuser {
    width: 100%;
    overflow-x: hidden;
    // height: 100vh;
    // overflow-y: scroll;

    &__container {
      padding: unset;
      margin: 40px 0;
      width: 100%;
      // height: 110vh;
    }

    &__page-title {
      font-size: 40px;
      margin-bottom: 20px;
    }

    &__separate {
      margin: 30px 0;
    }

    &__text {
      font-size: 18px;
      margin-bottom: 20px;
    }

    &__input-container {
      // height: 330px;
    }

    &__input {
      height: 45px;
    }

    &__ismale-button {
      font-size: 14px;
    }

    &__submit {
      font-size: 16px;
      // margin-top: 30px;
    }
  }
}
.person img{
        width: 70px;
        height: 70px;
        border-radius: 35px;
        margin-right: 40px !important;
      
    }
    .person{
        &__user{
            margin-top: 20px;
            align-content: center;
            width: 70%; 
            float:left;
        }
        &__user-name{
            font-family: "Open Sans", sans-serif !important;
            font-style: italic !important;
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 5px;
            line-height: 20px;
            color: #2e2e2e;
        }
        &__user-role{
            font-family: "Open Sans", sans-serif !important;
            font-style: italic !important;
            font-weight: 500;
            font-size: 12px;
            line-height: 12px;
            color: rgba(0, 0, 0, 0.8);
        }
    }
    .story {
        margin-left: 110px !important;
        font-family: "Open Sans", sans-serif !important;
        font-style: italic !important;
        font-weight: normal;
        font-size: 18px;
        line-height: 1.5;
        margin-top: 5px;
        color: black;
    }
    .story p:last-child {
        margin-bottom: 0!important;
    }

// @media (max-width: 850px) {
//     .makeuser {
//         background-color: white;

//         &__container {
//             width: 98vw;
//         }

//         &__page-title {
//             font-size: 36px;
//         }
//     }
// }

@media (max-width: 767.98px) {
  .makeuser {
    flex-direction: column;
    height: auto;

    &__container {
      margin: 20px 0 50px 0;
      height: auto;
      // padding: 0 5%;
    }

    &__text {
      margin-bottom: 30px;
    }
  }
  .person__user
  {
        width: calc(100% - 100px) !important;
  }
  .person .croppa-container {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    margin-right: 20px !important;
  }
}

@media (max-width: 630px) {
  .makeuser__form-container {
    flex-direction: column;
    padding-right: 0;
    align-items: flex-start;
    width: 70%;
    margin-left: 15%;
  }
  .makeuser__input-container {
    width: 100%;
    margin-bottom: 15px;
  }
  .makeuser__page-title {
    font-size: 30px;
  }
  .makeuser__submit {
    font-size: 14px;
    // width: 280px;
    height: 45px;
    // margin-left: calc(50% - 145px);
  }
}

@media (max-width: 450px) {
  .makeuser {
    width: 100%;
    // background-color: white;

    &__form-container {
      width: 89%;
      margin-left: 6%;
    }
    &__auth-input-label {
      font-size: 14px;
    }
    &__ismale-button {
      width: 45%;
    }
  }
}
</style>