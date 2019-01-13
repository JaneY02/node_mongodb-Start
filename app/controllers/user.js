let User = require('../models/user')
 
 //signup注册
 exports.signup = (req, res)=>{
    let _user = req.body.user
    //不能重复注册同一个用户名
    User.findOne({name: _user.name}, (err, user)=>{
        if(err){
            //注册异常
            console.log(err)
        }
        if(user){
            //注册时发现该用户已注册跳转登录页
            return res.redirect('/signin')
        } else {
            let user = new User(_user)
            user.save((err, user)=>{
                if(err){
                    console.log(err)
                }else {
                    res.redirect('/')
                }
            })
        }
    })
}
//signup注册页面
 exports.showSignup = (req, res)=>{
    res.render('signup', {
        title: '注册页面'
    })
}

//signin登录
exports.signin = (req, res)=>{
    let _user = req.body.user
    let name = _user.name
    let password = _user.password

    User.findOne({name: name}, (err, user)=>{
        if(err){
            console.log(err)
        }
        if(!user){
            //当前登录用户未找到跳转到注册页
            return res.redirect('/signup')
        }
        user.comparePassword(password, (err, isMatch)=>{
            if(err){
                console.log(err)
            }
            if(isMatch){
                //登录成功的话保存用户登录成功状态
                console.log('password is matched')
                req.session.user = user
                //成功后跳转到首页
                return res.redirect('/')
            }else {
                //密码匹配不对重新登录页
                return res.redirect('/signin')
                console.log('password is not matched')
            }
        })
    })
}

//signup注册页面
exports.showSignin = (req, res)=>{
    res.render('signin', {
        title: '登录页面'
    })
}

//登出
exports.logout = (req, res)=>{
    //删除存在session中的值
    delete req.session.user
    //删除存下的变量值
    // delete app.locals.user

    res.redirect('/')
}

//后台用户列表页userlist
exports.list = (req, res)=>{
    User.fetch((err, users)=>{
        if(err){
            console.log(err)
        }else{
            res.render('userlist', {
                title:'用户列表页',
                users: users
            })
        }
    })
}

//中间件：是否登录
exports.signinRequired = (req, res, next)=>{
    let user = req.session.user
    if(!user){
        return res.redirect('/signin')
    }
    next()
}

//中间件：是否admin
exports.adminRequired = (req, res, next)=>{
    let user = req.session.user
    // if(user.role<=10){
    //     return res.redirect('/signin')
    // }
    next()
}
