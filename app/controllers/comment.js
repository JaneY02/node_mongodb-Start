let Comment = require('../models/comment')

//评论存到数据库中
exports.save = (req,res)=>{
    let _comment = req.body.comment
    let movieId =  _comment.movie
    if(_comment.cid){
        //当前评论有cid说明是回复的评论,cid是主评论的id
        Comment.findById(_comment.cid, (err, comment)=>{
            let reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }
            comment.reply.push(reply)
            comment.save((err, comment)=>{
                if (err) {
                    console.log(err)
                }
                res.redirect('/movie/'+movieId)
            })
        })
    }else {
        //主评论
        let comment = new Comment(_comment)
        comment.save((err, comment)=>{
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/'+movieId)
        })
    }
}
