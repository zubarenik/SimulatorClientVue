<template>
    <div class=sim-description>
        <h5 class="sim-description__name" v-html="name">

        </h5>
        <div class="sim-description__description" v-html="description">

        </div>

    </div>
</template>

<script>
export default {
    props: ['description', 'name']
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.sim-description{
    &__name{
        font-weight: 600;
        margin-bottom: 1.5rem;
        // font-size: calc((100vw - 1150px)/(2500 - 1150) * (26 - 16) + 16px);
        width: 100%;
    }
    &__description{
        // font-weight: 400;
        width: 100%;
        // font-size: 18px;
        margin-bottom: 1.5rem;
    }
}

</style>