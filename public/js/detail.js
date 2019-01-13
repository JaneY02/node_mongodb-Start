// 点击回复锚点

$(function(){
    $(".comment").click(function(e){
        var target = $(this)
        var toId =target.data('tid')
        var commentId =target.data('cid')
        
        if($('#toId').length){
            $('#toId').val(toId)
        }else {
            //当前这条评论是谁评的
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm')
        }

        if($('#commentId').length){
            $('#commentId').val(commentId)
        }else {
            //当前这条评论的id
            $('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo('#commentForm')
        }
    })
})