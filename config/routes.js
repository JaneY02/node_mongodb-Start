let Index = require('../app/controllers/index')
let User = require('../app/controllers/user')
let Movie = require('../app/controllers/movie')
let Comment = require('../app/controllers/comment')

module.exports = function(app){
    //预处理判断user
    app.use((req,res,next)=>{
        let _user = req.session.user
        app.locals.user = _user
        next()
    })
    //首页
    app.get('/', Index.index)

    //用户相关User
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/logout', User.logout)
    app.get('/signin', User.showSignin)
    app.get('/signup', User.showSignup)
    //使用中间件，当前用户必须登录且是admin才有权限查看userlist页面
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

    //电影相关Movie
    app.get('/movie/:id', Movie.detail)
    app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
    app.get('/admin/movie', User.signinRequired, User.adminRequired, Movie.save)
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)

    //评论相关Comment
    app.post('/user/comment', User.signinRequired, Comment.save)
}