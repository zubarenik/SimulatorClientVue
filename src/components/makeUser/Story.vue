<template>
    <div>
        <b-row>
            <b-col cols="12" class="person">
                <img :src="img" alt />
                <div class="person__user">
                    <div class="person__user-name">{{name}}</div>
                    <div class="person__user-role">{{role}}</div>
                </div>
            </b-col>
            <b-col sm="10">
                <div class="story" v-html="story"></div>
            </b-col>
            <b-col sm="10">
                <b-button
                        @click="next"
                        v-if="button && process"
                        variant="primary"
                        style="margin-bottom: 30px; margin-top:20px; color:white; margin-left:80px; padding:10px 30px;"
                        :disabled='true'
                >
                    <b-spinner small  ></b-spinner> Далее
                </b-button>
                <b-button
                        @click="next"
                        v-if="button && !process"
                        variant="primary"
                        style="margin-bottom: 30px; margin-top:20px; color:white; margin-left:80px; padding:10px 30px;"
                        :disabled='false'

                >
                    Далее
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import API from "@/api";
    export default {
        name: 'Story',
        props: {
            story: String,
            role: String,
            name: String,
            img: String,
            button: Boolean,
            page: Number,
            data: Object
        },
        data() {
            return {
                process: false
            };
        },
        watch: {
            data: function () {
                this.process = false
            },
        },
        methods: {
            next() {
                this.process = true
                
                const data = new FormData();
                data.append("page", this.page);
                API.post("api/page_next/", data).then(() => {
                    // this.$emit("answered");
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .person img{
        width: 70px;
        height: 70px;
        border-radius: 35px;
        margin-right: 40px !important;
        float: left;
    }
    .person{
        &__user{
            margin-top: 20px;
            align-content: center;
            width: 70%
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
    @media (max-width: 767.98px) {
        .person img{
            margin-right: 20px !important;
            float: left;
        }
        .story {
            margin-left: 90px !important;

        }
        .person__user
        {
            width: 100%;
        }
    }
</style>