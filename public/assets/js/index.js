//获取文章的数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (response) {
        $('#posts').html(' <strong>' + response.postCount + '</strong>篇文章（<strong>' + response.draftCount + '</strong>篇草稿） ')
        console.log(response)
    }
})


//获取分类的数量
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function (response) {
        $('#category').html('<strong>' + response.categoryCount + '</strong>个分类')
    }
})


//获取评论的数量

$.ajax({
    type: 'GET',
    url: '/comments/count',
    success: function (response) {
        $('#comments').html('<strong>' + response.commentCount + '</strong>条评论')
    }
})

