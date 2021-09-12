<template>
    <div class="header">
        <div class="header__type main_font_color" v-html="type"></div>
        <h3 class="header__name" v-html="text"></h3>
        <div class="header__description" v-html="description" v-if="description && description != ''"></div>
    </div>
</template>

<script>
export default {
    props: {
        'type': {type: String}, 
        'text': {type: String},
        'description': {type: String, default: null}
    
    }
}
</script>


<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.header{
    margin-bottom: 30px;
    // font-style: italic;
    
    &__name{
        font-weight: 700;
        // font-size: $mediumTextSize;
        // line-height: 1.15;
    }
}
</style>