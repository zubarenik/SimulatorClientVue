<template>
  <div class="makeuser px-md-5">
    <div class="container">
      <Logo
        :logo="simInfo.logo"
        v-if="simInfo.logo && ismobile()"
        style="margin-bottom: 20px"
      />
      <div class="back-button" @click="$router.go(-1)">
          <div class="mr-3">
              <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22L2 12L12 2" :stroke="simInfo.color" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </div>
          <div class="back-button__text font-weight-bold">
              Вернуться
          </div>
      </div>
      <div class="makeuser__page-title">Магазин</div>
      
      <div class="makeuser__separate"></div>

      <b-row>

        <b-col md="4" class="mb-4" v-for="(x,index) in items" :key="x.id">
          <b-card :title="x.title" :img-src="x.image" img-top>
            <b-card-text>
              {{ x.description }}
            </b-card-text>
            <b-card-text>
              <b>Цена: {{ x.cost }} <StarsSVG :border_color="simInfo.color" style="height: 18px; margin-left: -4px; margin-top: -6px;"/></b>
            </b-card-text>
            <b-button variant="primary" @click="buy(index)"
            v-if='!x.is_buy'
              >Купить</b-button
            >
            <b-button variant="success" :disabled='true'
            v-else
              >Куплено</b-button
            >
          </b-card>
        </b-col>

      </b-row>
    </div>
  </div>
</template>

<script>

// import Certificate from "../components/global/svg/Certificate";
import { mapGetters } from "vuex";
import { isMobileOnly } from "mobile-device-detect";
import Logo from "@/components/makeUser/Logo";
import API from "@/api";
import StarsSVG from '@/components/global/svg/Star'

export default {
  name: "Shop",
  components: {
  
    // Certificate,
    Logo,
    StarsSVG,
  },
  data() {
    return {
      items:[]
    };
  },
  computed: {
    ...mapGetters({
      userData: "user/getMeInfo",
      simInfo: "simulator/getSimInfo",
    }),
  },
  methods: {
    
    ismobile() {
      return isMobileOnly;
    },
    async get_items()
    {
      
      const response = await API.get("api/product_list");
      this.items = response.data
    },
    async buy(index)
    {
      if(this.userData.balance < this.items[index].cost)
      {
        this.$bvToast.toast('Пройдите симулятор дальше и получите больше оценок', {
            title: 'Не хватает средств!',
            variant: 'danger',
            solid: true
          }) 
        return
      }

     this.$store.commit("user/CHANGE_BALANCE", -this.items[index].cost); 
      API.post("api/buy_product/"+this.items[index].id).then(response => {
          console.log(response.data)
          this.$bvToast.toast('На почту пришло подтверждение и информация, как получить товар', {
            title: 'Спасибо за покупку!',
            variant: 'success',
            solid: true
          }) 
          this.get_items()
          
          

        })
        .catch(function (error) {
          console.log(error)
         
        })
    }
    
  },
  mounted() {
    this.items = this.get_items()
    this.$store.dispatch("user/FETCH_BALANCE");
  },
};
</script>

<style lang="scss" scoped>
.profile
{
    &__logout{
        display: table;
        color: #ff7171;
        cursor: pointer;
        margin-top: 2rem;
    }
    &__logout-text{
        border-bottom: 1px dashed #ff7171;
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        font-size: 1rem;
        display: inline;
        margin-left:1rem;
    }
    &__logout-text:hover{
        border-bottom: 1px dashed #ff3030;
        color: #ff3030;
        display: inline;
    }
}
.croppa-container {
  font-size: 0 !important;
  line-height: 0 !important;
  border-radius: 200px !important;
  overflow: hidden;
  margin: 0 auto;
}
.makeuser .container {
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
    box-shadow: 0 2px 4px rgba(44, 39, 56, 0.08), 0 4px 8px rgba(44, 39, 56, 0.08);
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
.person {
  &__user {
    margin-top: 20px;
    align-content: center;
    width: 70%;
    float: left;
  }
  &__user-name {
    font-family: "Open Sans", sans-serif !important;
    font-style: italic !important;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 5px;
    line-height: 20px;
    color: #2e2e2e;
  }
  &__user-role {
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
  margin-bottom: 0 !important;
}
.back-button{
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-bottom: 2rem;
        &__text{
            font-size: 1.25rem;
        }
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
  .person__user {
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
