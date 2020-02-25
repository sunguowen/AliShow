//获取参数中传递过来的文章id
var id = getUrlParams('id')

var review
// console.log(id)

$.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function (response) {
        var html = template('articalTpl', response)
        $('#articleBox').html(html)
        console.log(response)
    }
})

$('#articleBox').on('click', '.like', function () {

    var artId = $(this).attr('data-id')
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + artId,
        success: function (response) {
            alert('点赞成功，感谢您的支持！')
        }
    })
})

$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        //判断管理员是否开启了评论功能
        review = response.review
        if (response.comment) {
            //渲染评论模板
            var html = template('commentTpl')
            $('#commentBox').html(html)
        }
    }
})

$('#commentBox').on('submit', "#commentForm", function () {
    var content = $(this).find('textarea').val()
    var state

    if (review) {
        //要经过人工审核
        state = 0
    } else {
        //不需要人工审核
        state = 1
    }

    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            post: id,
            state: state
        },
        success: function () {
            alert('评论成功！')
            location.reload()
        },
        error: function () {
            alert('评论失败!')
        }
    })
    return false
})