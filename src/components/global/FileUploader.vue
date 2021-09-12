<template>
    <div>
        <div class="upload" v-if="!uploaded">
            <input accept=".jpg, .png, .docx, .pdf, .mp4, .pptx, .mov" type="file" @change="upload" ref="uploadInput" style="display: none">
            <b-icon icon="paperclip" @click="$refs.uploadInput.click()" style="cursor: pointer"/>
            <div class="float-right" style="color:grey;">максимальный файл: 1мб</div>
        </div>
        <div class="files" v-if="files && files.length">
            <div class="file d-flex align-items-center mb-1" v-for="file in files" :key="file.name">
                <div class="mr-2" v-if="!uploaded">{{file.name}}</div>
                <div v-else>
                    <b-icon icon="paperclip"/><a :href="`//newapi.mysimulator.ru${file.file}`" target="_blank" style="word-break: break-word;" >{{file.name}}</a>
                </div>
                <b-icon v-if="!uploaded" icon="trash" style="cursor: pointer" @click="deleteFile(file, index)"/>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['files', 'uploaded'],
    methods:{
        upload(e){
            if(e.target.files[0].size>1000000)
            {
                this.$bvToast.toast('Обрежьте изображение и повторите попытку', {
                    title: 'Файл больше допустимого размера',
                    variant: 'danger',
                    solid: true
                }) 
                return
            }
            this.$emit('upload', e.target.files[0])
        },
        deleteFile(file, index){
            this.$emit('delete', file, index)
        }
    }
    
}
</script>