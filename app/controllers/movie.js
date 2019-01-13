let Movie = require('../models/movie')
let Comment = require('../models/comment')
let _ = require('underscore')

//电影详情页detail page(包括电影信息和评论信息评论人等)
exports.detail = (req, res)=>{
    let id = req.params.id
    Movie.findById(id, (err, movie)=>{//找到当前的movie
        Comment
            .find({movie: id})//找到当前movie的评论
            .populate('from', 'name')//对每一条评论数据populate方法找到from对应的id然后去User表里去查，查到的结果name返回
            .populate('reply.from reply.to', 'name')
            .exec((err, comments)=>{
                res.render('detail', {
                    title:`这是${movie.title}的详情页`,
                    movie: movie,
                    comments: comments
                })
            })
    })
}

//电影后台录入页admin page
exports.save = (req, res)=>{
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
}

//更新电影信息
exports.update = (req,res) => {
    var id =req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'后台更新页',
                movie: movie
            })
        })
    }
}
    
//电影后台录入页传过来的数据存到数据库中
exports.new = function(req,res){
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
}

//电影后台列表页list page
exports.list = (req, res)=>{
    Movie.fetch((err, movies)=>{
        if(err){
            console.log(err)
        }else{
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
        }
    })
}

//删除电影
exports.del = (req,res) => {
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
}