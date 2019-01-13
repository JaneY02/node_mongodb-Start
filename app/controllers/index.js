//负责和首页进行交互
let Movie = require('../models/movie')
//首页index page
exports.index = (req, res) => {
    //登录成功后跳转到这里,能拿到当前登录用户信息了
    // console.log(req.session.user)

    Movie.fetch((err, movies)=>{
        if(err){
            console.log(err)
        }else{
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
        }
    })
}