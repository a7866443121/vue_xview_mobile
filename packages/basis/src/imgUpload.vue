<template>
    <div id="upload" :style="`width:100%;height:${height}`">
        <van-uploader 
            :after-read="afterRead"  
            v-model="fileList" 
            :multiple="multiple"
            :max-count="count"
            :upload-text="uploadText"
            @delete="deleteImg"
            ref="imgUpload"
        >
        </van-uploader>
    </div>
</template>

<script>
import { uploadMixin } from './mixin/ajaxUpload';
const base_url_img = CHH.IMG_URL_ZR;
export default {
    mixins:[uploadMixin],
    name:'BUpload',
    props:{
        //上传url地址
        action:{
            type:String,
            default:CHH.BASE_IMG_URL+'/uploadFile/'
        },
        //设置ajax请求头
        headers:{
            type:Object,
            default:()=>{
                return {key:'',salt:''}
            }
        },
        //设置图片上传数量
        count:{
            type:Number,
            default:1
        },
        //是否开启图片多选
        multiple:{
            type:Boolean,
            default:false
        },
        //容器宽
        width:{
            type:String,
            default:'50%'
        },
        //容器高
        height:{
            type:String,
            default:'100px'
        },
        //上传文字提示
        uploadText:{
            type:String,
            default:'上传照片'
        },
        // 当前标识符
        name:{
            type: [String, Number, Object],
            default: ''
        }
    },
    data() {
        return {
            fileList:[],
            chhUrlStr:[]
        }
    },
    methods: {
        initImg(){
            this.fileList = [];
            this.$emit('onSuccess',this.fileList);
        },
        afterRead(file){
            let binary = file.content
            if(binary){
                this.getUrlAddress(this.action,false,binary).then(
                    res=>{
                        //上传成功
                        this.chhUrlStr.push(res)
                        this.$emit('onSuccess',this.chhUrlStr,this.fileList);
                    }
                ).catch(res=>{
                    //上传失败
                    this.fileList.forEach((item,index)=>{
                        if(item.name = file.file.name){
                            this.fileList.splice(index,1)
                        }
                    });
                    this.$emit('onSuccess',this.fileList);
                })
            }
        },
        deleteImg(ev){
            this.$emit('onSuccess',this.fileList)
        }
    },
    mounted(){
   
    },
}
</script>
<style lang="scss">
@import "~@/assets/scss/variable.scss";
@import "~@/assets/scss/mixin.scss";
#upload {
    display: inline-block;
    vertical-align: middle;
    .upload-backimg{
        @include background-img();
        @include flex-center()
    }
    
    .van-uploader{
        height: 100%;
        width: 100%;
        .van-uploader__wrapper {
            height: 100%;
            .van-uploader__preview {
                // width: 100%;
                height: 100%;
            }
            .van-uploader__preview-image {
                width: 100%;
                height: 100%;
            }
        }
        .van-uploader__input-wrapper{
            // width: 100%;
            
        }
    }
}
</style>