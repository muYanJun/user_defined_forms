<template>
    <div>
        <div class="forms-wrap">
                        <div class='forms-menu'>
                            <div v-for='item in inputList' :key='item.id' class='inputBox' @click='addInput(item)'>
                                {{item.name}}
                                <!-- <a-icon :type="item.icon" /> -->
                            </div>
                        </div>
                        <div class='forms-center'>
                            <div class="forms-cont">
                                <div class="forms-box" style="height:480px">
                                    <vue-scroll>
                                        <div v-for='(item,index) in components' :key='index' class="forms-cont-item" @click='changeComponent(index)'>
                                            <div :class="'form-item-code'+' '+'hover'+' '+[componentIndex==index?'choose':'']">
                                                <a-icon type="close" @click='deleteInput(item,index)' />
                                                <div @click='setInput(item,index)'>
                                                    <span class="name">{{item.title}}</span>
                                                    <span class="tips">
                                                        <em>{{item.hint}}</em>
                                                        <em v-if='item.required'>(必填)</em>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </vue-scroll>
                                </div>
                            </div>
                            <div class="forms-btns">
                                <a-button style='margin-right:10px;' type="primary" @click='handlerTop'>置顶</a-button>
                                <a-button style='margin-right:10px;' type="primary" @click='handlerUp'>向上</a-button>
                                <a-button style='margin-right:10px;' type="primary" @click='handlerDown'>向下</a-button>
                                <a-button style='margin-right:10px;' type="primary" @click='handlerBottom'>最后</a-button>
                            </div>
                            <!-- <div style='text-align:center;'>
                                <a-button type="primary" @click='sub'>
                                    保存
                                </a-button>
                            </div> -->
                        </div>
                        <div class='form-extra' v-if='content'>
                            <div class="form-titles" v-if='JSON.stringify(content)!=="{}"'>
                                <span>标题</span>
                                <!-- <span style='color:#708090;margin-left:5px;'>最多10个字</span> -->
                            </div>
                            <div v-if='JSON.stringify(content)!=="{}"'>
                                <a-input v-model='content.title' :disabled="content.type=='img'||content.type=='file'" />
                            </div>
                            <div class='form-titles' v-if='JSON.stringify(content)!=="{}"'>
                                <span>提示文字</span>
                                <!-- <span style='color:#708090;margin-left:5px;'>最多20个字</span> -->
                            </div>
                            <div v-if='JSON.stringify(content)!=="{}"'>
                                <a-input v-model='content.hint' />
                            </div>
                            <div class='form-titles' v-if='content.options'>
                                <span>选项</span>
                            </div>
                            <div style='display:flex;align-items:center;margin-top:5px;' v-for='(item,index) in content.options' :key='item.idx'>
                                <a-input v-model='item.title' />
                                <a-icon type="plus-circle" style='font-size:24px;margin-left:5px;' @click='addOption(index)'/>
                                <a-icon type="minus-circle" style='font-size:24px;margin-left:5px;' @click='deleteOption(index)' />
                            </div>
                            <div style='margin-top:10px;' v-if='content.title'>
                                <a-checkbox  :checked='content.required' @change='change_radio'>必填</a-checkbox >
                            </div>
                        </div>
                    </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            inputList:[
                {id:1,type:'input',name:'单行输入框',title:'单行输入框',hint:'请输入',required:false,icon:'font-colors'},
                {id:2,type:'text',name:'多行输入框',title:'多行输入框',hint:'请输入',required:false,icon:'unordered-list'},
                {id:3,type:'number',name:'数字输入框',title:'数字输入框',hint:'请输入',required:false,icon:'number'},
                {id:4,type:'radio',name:'单选框',title:'单选框',hint:'请选择',required:false,options:[{idx:1,title:'选项一'},{idx:2,title:'选项二'}],icon:'minus-circle'},
                {id:5,type:'checked',name:'多选框',title:'多选框',hint:'请选择',required:false,options:[{idx:1,title:'选项一'},{idx:2,title:'选项二'},{idx:3,title:'选项三'}],icon:'check-circle',value:[]},
                {id:6,type:'date',name:'日期',title:'日期',hint:'请选择',required:false,dateTypeList:[{code:1,title:'年-月-日'},{code:2,title:'年-月-日 时:分'}],dateType:1,icon:'calendar',createTime1:'',start_time:'',value:''},
                {id:7,type:'img',name:'图片',title:'图片',required:false,icon:'camera',imgList:[],value:[],url:[]},
                {id:8,type:'file',name:'附件',title:'附件',required:false,icon:'link',fileList:[],value:[],url:[]},
                {id:9,type:'address',name:'省市区',title:'省市区',hint:'请选择',required:false,icon:'environment',province:'',city:'',district:''},
                {id:10,type:'select',name:'部门',title:'部门',hint:'请选择',required:false,icon:'team',value:undefined}
            ],
            components:[
                {id:1,type:'input',name:'单行输入框',title:'单行输入框',hint:'请输入',required:false,icon:'font-colors'},
            ],
            content:{},
            componentIndex:'',
            idx:''
        }
    },
    methods:{
        //增加控件
        addInput(item){
            let val = JSON.parse(JSON.stringify(item))
            this.components.push(val)
            this.content = val
        },
        //选择控件
        changeComponent(index){
            this.componentIndex = index
        },
        //删除控件
        deleteInput(item,index){
            this.components.splice(index,1)
            this.content={}
            this.idx = -12
        },
        setInput(item,index){
            this.idx = index
            this.content = item
        },
        handlerTop(){
            if(this.componentIndex!=0){
                this.components.unshift(this.components.splice(this.componentIndex , 1)[0]);
                this.componentIndex=0
            }
        },
        handlerUp(){
            if(this.componentIndex!=0){
                this.components[this.componentIndex] = this.components.splice(this.componentIndex-1, 1, this.components[this.componentIndex])[0];
                this.componentIndex--
            }
        },
        handlerDown(){
            if(this.componentIndex!=this.components.length-1){
                this.components[this.componentIndex] = this.components.splice(this.componentIndex+1, 1, this.components[this.componentIndex])[0];
                this.componentIndex++
            }
        },
        handlerBottom(){
            if(this.componentIndex!=this.components.length-1){
                this.components.push(this.components.splice(this.componentIndex, 1)[0]) ;
                this.componentIndex = this.components.length-1
            }
        },
        //增加选项
        addOption(index){
            this.content.options.splice(index+1, 0, {idx:this.content.options.length+2,title:'选项'}); 
        },
        deleteOption(index){
            this.content.options.splice(index,1)
        },
        //是否必填
        change_radio(e){
            this.content.required = e.target.checked
        },
    }
}
</script>

<style lang='scss' scoped>
    .forms-wrap{
        position: relative;
        .forms-menu{
            position: absolute;
            left: 0;
            top: 0;
            width: 320px;
            height: 300px;
            padding-top: 40px;
            display: flex;
            flex-wrap: wrap;
            .inputBox{
                height: 36px;
                line-height: 36px;
                position: relative;
                border: 1px solid #d9d9d9;
                padding: 0 8px 0 15px;
                font-size: 14px;
                color:#2c2c2c;
                width: 148px;
                margin-right: 9px;
                border-radius: 5px;
                .anticon{
                    position: absolute;
                    right: 10px;
                    top: 9px;
                    color:#a4a4a4;
                    font-size: 16px;
                }
                &:hover{
                    border-color:#2c2c2c;
                    cursor: pointer;
                }
            }
        }
        .forms-center{
            width: 500px;
            margin: 0 auto;
            .forms-cont{
                height: 480px;
                padding: 94px 100px 110px;
                box-sizing: content-box;
                background: url(~@/assets/image/phoneBg.png) no-repeat;
                background-size: 100% 100%;
                .forms-cont-item{
                    position: relative;
                    font-size: 15px;
                    height: 55px;
                    line-height: 55px;
                    background: #fff;
                    border-bottom: 5px solid #f6f6f6;
                    // margin-bottom: 15px;
                    .form-item-code{
                        position: relative;
                        padding: 0 10px;
                        height:50px;
                        line-height: 50px;
                        border:1px solid #f6f6f6;
                        .anticon{
                            position: absolute;
                            left: 0;
                            top: 0;
                            color: #fff;
                        }
                        .tips{
                            color:#a4a4a4;
                            position: absolute;
                            right: 10px;
                            em{
                                font-style: normal;
                            }
                        }
                        &:hover{
                            border: 1px dashed #486dda;
                            .anticon{
                                background: #486dda;
                            }
                        }
                    }
                }
            }
        }
        .form-extra{
            position: absolute;
            right: 0;
            top: 0;
            width: 320px;
            padding-top: 40px;
            .form-titles{
                height: 38px;
                line-height: 38px;
            }
        }
    }
    .choose{
      border: 1px dashed #486dda !important;  
    }
</style>