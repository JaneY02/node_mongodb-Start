// 删除逻辑

$(function(){
    $(".del").click(function(e){
        var target = e.target
        var id =target.getAttribute('data_id')
        var tr =$('.item-id-'+id)
    
        $.ajax({
            type:"DELETE",
            url:'/admin/list?id='+id
        })
        .done(function(res){
            if(res.code*1 ===200){
                if(tr.length>0){
                    tr.remove()
                }
            }
        })
    })
})