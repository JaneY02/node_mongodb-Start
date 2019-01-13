let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId    //用Schema.Types.ObjectId 来声明一个对象ID类型。

let CommentSchema =new Schema({
    movie: {type: ObjectId, ref: 'Movie'},//评论的电影,movie字段是引用Movie Schema中的值,ObjectId是引用字段类型，mongoose默认生成的主键类型id就是ObjectId
    from: {type: ObjectId, ref: 'User'},//评论人
    reply: [{
        from: {type: ObjectId, ref: 'User'},
        to: {type: ObjectId,ref: 'User'},//被评论的人
        content:String //评论内容
    }],
    content:String,//评论内容
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
CommentSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createaAt = this.meta.updataAt =Date.now()
    }else{
        this.meta.updataAt =Date.now()
    }
    // next：存储流程才能继续走下去
    next()
})
// 静态方法不会直接执行，向由该 schema 编译生成的 Model 添加静态类方法
CommentSchema.statics = {
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

module.exports =CommentSchema
    