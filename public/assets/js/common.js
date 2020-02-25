

$("#logout").on('click', function () {
    $.ajax({
        type: 'post',
        url: '/logout',
        success: function (response) {
            location.href = 'login.html'
            // console.log(response.message)
        },
        error: function () {
            console.log('退出操作失败')
        }

    })
})

function formateDate (date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (response) {
        $('.profile .avatar').attr('src', response.avatar)
        $('.profile .name').html(response.nickName)
        console.log(response)
    }
})