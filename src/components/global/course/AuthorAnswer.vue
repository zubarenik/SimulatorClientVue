<template>
    <div class="author-answer" v-html="text">

    </div>
</template>

<script>
export default {
    props: ['text']
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.author-answer{
    margin-top: 30px;
    // border-left: solid 4px $primary_color;
    padding-left: 20px;
}

</style>