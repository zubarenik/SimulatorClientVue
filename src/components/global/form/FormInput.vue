<template>
    <div class="input">
        <b-form-group
        :label="title"
        :state="valid"
        :invalid-feedback="errorMessage">
            <b-form-input
            :placeholder="placeholder" v-model="val" :state="valid" :type="type" @input="handleInput"></b-form-input>
        </b-form-group>
        <!-- <div class="input__title">
            {{title}}
        </div>
        <input class="input__field" :class="{error: !valid}" :type="type" :value="value" :placeholder="placeholder" @input="handleInput"/>
        <div class="input__error" v-if="!valid">
            {{errorMessage}}
        </div> -->
    </div>
</template>

<script>
export default {
    props:{
        value:{
            type: String
        },
        placeholder:{
            type: String
        },
        title:{
            type: String
        },
        type:{
            type: String,
            default: 'text'
        },
        error:{
            type: String,
            default: 'Это поле обязательно'
        },
        valid:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            val: this.value
        }
        
    },
    computed: {
        errorMessage(){
            if (this.title == 'E-mail'){
                if (this.value.trim().length < 5 && this.value.trim().length != 0)
                    return 'Введите не менее 5 символов';
                return this.error
            }
            return this.error
        }
    },
    methods:{
        handleInput(){
            this.$emit('input', this.val)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.error{
    border: 1px solid red !important;
}
.input{
    width: 100%;
    margin-bottom: 1.25rem;
    &__title{
        font-size: $smallestTextSize;
        font-weight: 600;
        margin-bottom: 0.5em;
    }
    &__field{
        outline: none;
        width: 100%;
        padding: 10px 15px;
        border-radius: 6px;
        border: 1px solid $inactive_color;
        // color: $inactive_color;
        transition: border 0.2s ease;
        font-size: $smallestTextSize;
        &:focus{
            border: 1px solid $primary_color;
        }
    }
    &__error{
        color: red !important;
        font-size: 12px;
        margin-top: 3px;
    }
}

</style>