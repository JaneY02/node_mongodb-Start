let mongoose = require('mongoose')

let MovieSchema =new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createaAt:{
            type:Date,
            default:Date.now()
        },
        updataAt:{
            type:Date,
            default:Date.now()
        }
    }
    })
// schema的前置钩子：每次保存之前都会执行的方法
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createaAt = this.meta.updataAt =Date.now()
    }else{
        this.meta.updataAt =Date.now()
    }
    // next：存储流程才能继续走下去
    next()
})
// 静态方法不会直接执行，向由该 schema 编译生成的 Model 添加静态类方法
MovieSchema.statics = {
    //用于取出目前数据库所有数据
    //exec(cb)：执行回调方法
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    //用来查询单条数据
    fingdById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}

module.exports =MovieSchema
    