<template>
    <section class="section" id="cert" style="padding:50px 0;">
        <loading :active.sync="isLoading" :is-full-page="true" :opacity="1" background-color='#fff'></loading>
        <div class="container">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <h1>
                        Ваш сертификат за прохождение симулятора
                    </h1>
                    <h5 style="font-weight:normal">
                        Вы можете поделиться своим сертификатом с друзьями и коллегами. Мы будем очень благодарны Вам за отзыв!
                    </h5>
                    <div id='certificate' v-if="show && simInfo.settings && simInfo.certificate" :style="`background-image: url(${backgroundImage})`" >
                        <div class="text" :style="firstNameStyles">
                            {{user.first_name}}
                        </div>
                        <div class="text" :style="lastNameStyles">
                            {{user.last_name}}
                        </div>
                        <div class="link" :style="linkStyles">Код сертификата: {{currCert.slug}}</div>
                    </div>
                    <div id='cert_img' style="margin-top:20px; max-width: 750px">
                        <img :src="img" alt="">
                        <div class="d-flex justify-content-between" style="margin-top:15px;">
                            <b-btn variant="primary" style="display:block;" @click="$router.go(-1)">Назад</b-btn>
                            <b-btn variant="primary" style="display:block;" @click="download">Скачать</b-btn>
                        </div>
                    </div>
                </div>
                
                
            </div>
            
        </div>
        
    </section>
</template>
<script>
import API from '@/api'
import * as htmlToImage from 'html-to-image';
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters } from 'vuex';
export default {
  name: "Simulator",
  data() {
    return {
        show:true,
        id: null, 
        isLoading: true, 
        img: null
    };
  },
  computed:{
      ...mapGetters({
          simInfo: "simulator/getSimInfo",
          user: 'user/getMeInfo',
          currCert: 'simulator/getCurrCert'
      }),
      backgroundImage(){

          return `//newapi.mysimulator.ru${this.simInfo.certificate.background_image}`
      },
      firstNameStyles(){
          return `top: ${this.simInfo.certificate.first_name_y}px; 
                left: ${this.simInfo.certificate.first_name_x}px; 
                font-size: ${this.simInfo.certificate.font_weight}px; 
                color: ${this.simInfo.certificate.color}`
      },
      lastNameStyles(){
          return `top: ${this.simInfo.certificate.last_name_y}px; 
                left: ${this.simInfo.certificate.last_name_x}px; 
                font-size: ${this.simInfo.certificate.font_weight}px; 
                color: ${this.simInfo.certificate.color}`
      },
      linkStyles(){
          return `top: ${this.simInfo.certificate.link_y}px; 
                left: ${this.simInfo.certificate.link_x}px;
                color: ${this.simInfo.certificate.color};
                font-size: 14px;
                position: absolute;`
      }
      
  },
  components: {
      Loading, 

  },
  mounted() {
    this.fetchCerts();



    
  },
  watch:{
      currCert(val){
          if (val && val.id){
              this.createCertImage(val)
          }
      }
  },
  methods: {
    forceFileDownload(response){
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Сертификат.png') //or any other extension
        document.body.appendChild(link)
        link.click()
    },
    async download(){
        const url = this.img
        await API.get(url,
        {
            responseType: "arraybuffer"
        }).then(response =>
            this.forceFileDownload(response)
        );
    },
    wait(){
        var start = new Date().getTime();
        var end = start;
        while(end < start + 'ms') {
            end = new Date().getTime();
        }
    },
    createCertImage(val){
        this.id = val.slug
        this.wait(5000)
        htmlToImage.toBlob(document.getElementById('certificate'), { quality: 1, pixelRatio: 1 })
        .then(async (dataUrl) =>{
            this.img = dataUrl
            this.img = this.img.slice(0, this.img.size, "image/png")
            this.img = new File([this.img], this.id+'.png', { type: this.img.type })
            this.show=false
            // this.update_cert()
            const response = await this.$store.dispatch("simulator/SET_CERT_IMAGE", {img:this.img, slug: this.id})
            this.img = response.data.image.replace(/^http:\/\//i, 'https://')
            this.isLoading = false


        })
      },
      async fetchCerts(){
          await this.$store.dispatch("simulator/FETCH_CERTS")
      },
      update_cert() {
        const data = new FormData();
        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };
        data.append("image", this.img);
        API.post("api/set_cert_image/"+this.id+"/", data, config).then(response => {
            this.img = response.data.image.replace(/^http:\/\//i, 'https://')
            this.isLoading = false
        })
    },
  },
};
</script>
<style>
.text
{
    line-height: 1.2;
    font-weight: 700;
    position: absolute;
}
#certificate
{
    position: relative;
    display: block;
    width: 1500px;
    height: 1000px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: left top;
    border: 3px #8cc9d6 solid;
    
}
#cert_img img{
    width: 100%;
    max-width: 750px;
}
.id
{
    position: absolute;
    font-size: 13px;
    bottom: 1%;
    left: 1%;
    opacity: .6;
}
</style>
