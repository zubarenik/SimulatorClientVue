<template>
    <div class="course-button" v-html="text" 
    :class="[type, {inactive: !active, selected: clicked, incorrect_nochosen, correct_nochosen}]" 

    @click="$emit('click'); clicked=!clicked">

    </div>
</template>

<script>
export default {
    props: {
        incorrect_nochosen:{
            type: Boolean,
            default: false
        },
        correct_nochosen:{
            type: Boolean,
            default: false
        },
        text: {
            type: String
        },
        type: {
            type: String,
            default: 'default'
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            clicked: false
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.course-button{
    cursor: pointer;
    border: 1px solid $second_font_color;
    padding: 13px 40px;
    font-size: 14px;
    margin-bottom: 15px;
    border-radius: 30px;
    color: $second_font_color;
    transition: background-color 0.2s ease, border 0.2s ease;
    &:hover{
        background-color: $second_hover_color;
        border: solid 1px $second_hover_color;
    }
    &.inactive{
        pointer-events: none;
    }
    &.selected{
        background-color: $second_hover_color;
        border: solid 1px $second_hover_color;
    }
    &.success{
        background-color: $color_success;
        color: #fff;
        border: solid 1px $color_success;
    }
    &.wrong{
        background-color: $color_wrong;
        color: #fff;
        border: solid 1px $color_wrong;
    }
    &.incorrect_nochosen{
        border: solid 2px $color_success;
    }
    // &.correct_nochosen{
    //     border: solid 2px $color_success;
    // }
}
</style>