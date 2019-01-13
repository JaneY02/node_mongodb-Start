let mongoose = require('mongoose')
//对密码处理
let bcrypt = require('bcrypt')
let SALT_WORK_FACTOR = 10

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    // 0: 普通用户
    // 1: 已验证用户
    // 2: 专业用户
    // >10: admin
    // >50: super admin
    role: {
        type: Number,
        default: 0
    },
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
UserSchema.pre('save',function(next){
    let user = this
    if(this.isNew){
        this.meta.createaAt = this.meta.updataAt =Date.now()
    }else{
        this.meta.updataAt =Date.now()
    }

    //用户存储时对密码进行加密和加盐
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=>{
        if(err) return next(err)
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err) return next(err)
            user.password = hash
            // next：存储流程才能继续走下去
            next()
        })
    })
})
// 静态方法不会直接执行，向由该 schema 编译生成的 Model 添加静态类方法
UserSchema.statics = {
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
//添加实例方法
UserSchema.methods = {
    comparePassword: function(_password, cb){
        bcrypt.compare(_password, this.password, (err, isMatch)=>{
            console.log(_password, this.password, isMatch)
            if(err) return cb(err)
            cb(null, isMatch)
        })
    }
}

module.exports = UserSchema
    