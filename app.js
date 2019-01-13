let express = require('express')
let path = require('path')
let port = process.env.PORT || 3000
let mongoose = require('mongoose')
let session = require('express-session')
let mongoStore = require('connect-mongo')(session)
let app = express()
let bodyParser =  require('body-parser')
let cookieParser = require('cookie-parser')
let dbUrl = 'mongodb://localhost/imooc' 
let logger = require('morgan')

//连接本地数据库
mongoose.connect(dbUrl, {useNewUrlParser:true}, (err)=>{
    if(err){
        console.log('mongoose连接错误')
    }else{
        console.log('mongoose连接成功')
    }
})

//设置视图的根目录
app.set('views', './app/views/pages')

//引用moment
app.locals.moment = require('moment')

//设置默认模版引擎
app.set('view engine', 'jade')

//查找静态资源的路径
app.use(express.static(path.join(__dirname, 'public')))

//对post请求体的解析，然后能通过req.body对请求参数进行获取
app.use(bodyParser.urlencoded({ extended: true }))  // parse application/x-www-form-urlencoded  
//  app.use(bodyParser.json()) // parse application/json 

//和服务器的对话
app.use(cookieParser())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'imooc',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

//配置当前是开发环境还是生产环境
if('development'===app.get('env')){
    app.set('showStackError',true)
    app.use(logger(':method :url :status'))//控制台打印的内容
    app.locals.pretty = true
    mongoose.set('debug', true)
}

//引入路由文件
require('./config/routes')(app)

//启动服务
app.listen(port)
console.log(`server started on port ${port}`)