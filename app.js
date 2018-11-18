let express = require('express')
let path = require('path')
let port = process.env.PORT || 3000
let mongoose = require('mongoose')
let Movie = require('./models/movies')
let app = express()
let bodyParser = require('body-parser')
let _ = require('underscore')

//连接本地数据库
mongoose.connect('mongodb://localhost/imooc', {useNewUrlParser:true}, (err)=>{
    if(err){
        console.log('mongoose连接错误')
    }
    console.log('mongoose连接成功')
})

//设置视图的根目录
app.set('views', './views/pages')

//引用moment
app.locals.moment = require('moment')

//设置默认模版引擎
app.set('view engine', 'jade')

//查找静态资源的路径
app.use(express.static(path.join(__dirname, 'public')))

//对post请求体的解析，然后能通过req.body对请求参数进行获取
app.use(bodyParser.urlencoded({ extended: true }))  // parse application/x-www-form-urlencoded  
//  app.use(bodyParser.json()) // parse application/json 

//启动服务
app.listen(port)
console.log(`server started on port ${port}`)

//添加路由
//首页index page
app.get('/', (req, res)=>{
    Movie.fetch((err, movies)=>{
        if(err){
            console.log(err)
        }
        res.render('index', {
            title: '首页',
            movies: movies
            // movies:[{
            //     title:'Node.js指南',
            //     _id:1,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // },{
            //     title:'Node.js指南',
            //     _id:2,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // },{
            //     title:'Node.js指南',
            //     _id:3,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // },{
            //     title:'Node.js指南',
            //     _id:4,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // },{
            //     title:'Node.js指南',
            //     _id:5,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // },{
            //     title:'Node.js指南',
            //     _id:6,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // },{
            //     title:'Node.js指南',
            //     _id:7,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // },{
            //     title:'Node.js指南',
            //     _id:8,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // },{
            //     title:'Node.js指南',
            //     _id:9,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // },{
            //     title:'Node.js指南',
            //     _id:10,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg'
            // }]
        })
    })
})

//详情页detail page
app.get('/movie/:id', (req, res)=>{
    let id = req.params.id
    Movie.findById(id, (err, movie)=>{
        if(err){
            console.log(err)
        }
        res.render('detail', {
            title:`这是${movie.title}的详情页`,
            movie: movie
            // movie:{
            //     doctor:'六个周',
            //     counter:'China',
            //     title:'人生缘编程',
            //     year:2019,
            //     poster:'http://img4.imgtn.bdimg.com/it/u=1178625225,3686148785&fm=26&gp=0.jpg',
            //     language:'汉语',
            //     flash:'https://www.六个周.com/video/1226',
            //     summary:'1.，生命太短暂，不要去做一些根本没有人想要的东西。——Ash Maurya。2，如果你交给某人一个程序，你将折磨他一整天；如果你教某人如何编写程序，你将折磨他一辈子。——David Leinweber。3，软件设计有两种方式：一种方式是，使软件过于简单，明显没有缺陷；另一种方式是，使软件过于复杂，没有明显的缺陷。——C.A.R. Hoare。4，软件开发往往是这样：最开始的 90% 代码占用了开始的 90% 的开发时间；剩下 10% 代码同样需要 90% 的开发时间。——Tom Cargill'
            // }
        })
    })
})

//后台录入页admin page
app.get('/admin/movie', (req, res)=>{
    res.render('admin', {
        title:'后台录入页',
        movie:{
            title:'',
            doctor:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    })
})

//更新电影
app.get('/admin/update/:id',function(req,res){
    var id =req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'后台更新页',
                movie: movie
            })
        })
    }
})
    
//后台录入页传过来的数据存到数据库中
app.post('/admin/movie/new',function(req,res){
    let id = req.body.movie._id
    let movieObj =req.body.movie
    let _movie
    
    if(id!== 'undefined'){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err)
            }
    
            _movie =_.extend(movie,movieObj)
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
    
                res.redirect('/movie/'+movie.id)
            })
        })
    }else{
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        })
    _movie.save(function(err,movie){
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/'+movie._id)
        })
    }
})

//后台列表页list page
app.get('/admin/list', (req, res)=>{
    Movie.fetch((err, movies)=>{
        if(err){
            console.log(err)
        }
        res.render('list', {
            title:'后台电影的列表页',
            movies: movies
            // movies:[
            //     {
            //         title:'Node.js指南',
            //         _id:1,
            //         doctor:'六个周',
            //         country:'China',
            //         year:2019,
            //         language:'汉语',
            //         flash:'https://www.jianshu.com/u/5842abb77bd1',
            //         summary:'1.，生命太短暂，不要去做一些根本没有人想要的东西。——Ash Maurya。2，如果你交给某人一个程序，你将折磨他一整天；如果你教某人如何编写程序，你将折磨他一辈子。——David Leinweber。3，软件设计有两种方式：一种方式是，使软件过于简单，明显没有缺陷；另一种方式是，使软件过于复杂，没有明显的缺陷。——C.A.R. Hoare。4，软件开发往往是这样：最开始的 90% 代码占用了开始的 90% 的开发时间；剩下 10% 代码同样需要 90% 的开发时间。——Tom Cargill'
            //     }
            // ]
        })
    })
})

//删除
app.delete('/admin/list',function(req,res){
    var id= req.query.id
    if(id){
        Movie.remove({_id: id},function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.send({
                    code: '200',
                    message: success,
                    data: ''
                })
            }
        })
    }
})