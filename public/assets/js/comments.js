$.ajax({
    type: 'GET',
    url: '/comments',
    success: function (response) {
        var html = template('commentsListTpl', response)
        $('#commentsBox').html(html)
        var page = template('pageTpl', response)
        $('#pageBox').html(page)
        // console.log(html)
    }
})


function changePage (page) {
    $.ajax({
        type: 'GET',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            var html = template('commentsListTpl', response)
            $('#commentsBox').html(html)
            var page = template('pageTpl', response)
            $('#pageBox').html(page)
            // console.log(html)
        }
    })

}

$('#commentsBox').on('click', '.status', function () {
    //获取当前评论的状态
    var status = $(this).attr('data-status')
    var id = $(this).attr('data-id')

    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload()
        }
    })
})

$('#commentsBox').on('click', '.delete', function () {

    if (confirm('确认删除这条评论吗？')) {
        var id = $(this).attr('data-id')

        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function (response) {
                location.reload()
            }
        })
    }
})