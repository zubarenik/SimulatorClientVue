<template>
<div class="button" @click="makeEvent">
    <!-- <button :type="type" :class="[color,size, {inactive: inactive || loading}]">
        <div v-if="!loading" >    
            {{text}}
        </div>
        <b-spinner small v-if="loading" ></b-spinner>

    </button> -->
    <b-button :variant="color" :type="type" :size='size' v-bind="{disabled: inactive, block: size==='full-width'}">
        <div v-if="!loading" >    
            {{text}}
        </div>
        <div class="spinner">
        <b-spinner small v-if="loading" ></b-spinner>
        </div>
    </b-button>
</div>    
</template>
<script>
export default {
    props: {
        type:{
            type: String,
            default: 'button'
        },
        size:{
            type: String,
            default: 'lg'
        },
        text: {
            type: String
        },
        loading: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'primary'
        },
        inactive: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        makeEvent(){
            if (!this.inactive && !this.loading)
                this.$emit('click');
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.btn{
    &-lg{
        padding: 1rem 2rem;
    }
    &-md{
        padding: 0.5rem 1rem;
    }
}
.button{
    .spinner{
        min-width: 60px;
    }
}
// .button{
//     button{
//         &:focus{
//             outline: none;
//         }
//         font-weight: 400;
//         // font-size: 16px;
//         cursor: pointer;

//         // display: flex;
//         // justify-content: center;
//         // align-items: center;
//         text-align: center;
//         padding: 20px calc(0.0225 * 100vw - 90px / 37);
//         font-size: $smallTextSize;

//         border-radius: 6px;
//         transition: background-color 0.2s ease, color 0.2s ease;
//         &.medium{
//             min-width: 100%;
//             &-large{
//                 padding: 15px 50px;
//             }
//         }
//         &.small-large{
//             padding: 10px 63px;
//             font-size: $smallTextSize;
//         }
//         &.full-width{
//             width: 100%;
//             font-weight: 600;
//         }
//         &.primary{
//             color: $light_color;
//             background-color: $primary_color;
//             &:hover{
//                 background-color: $primary_color_hover;
//             }
//             &-course{
//                 border: solid 1px $primary_color;
//                 color: $primary_color;
//                 background-color: transparent;
//                 font-weight: 600;
//                 &:hover{
//                     background-color: $primary_color;
//                     color: #fff;
//                 }   
//             }
//         }
//         &.inactive{
//             pointer-events: none;
//         }
//         &.success{
            
//             color: #fff;
//             background-color: $color_success;
//             border: solid 1px $color_success;
//             &:hover{
//                 background-color: $color_success_hover;
//                 color: #fff;
//             }   
//         }
//         &.disabled{
//             pointer-events: none;
//             color: $second_font_color;
//             background-color: transparent;
//             border: solid 1px $second_font_color;
//         }

//     }    
// }
// @media (max-width: 1200px){
//     .button{
//         button{
//             padding: 10px 10px;
//         }
//     }
// }
</style>