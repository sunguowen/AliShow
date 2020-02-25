$('#modifyPasswordForm').on('submit', function () {
    var formData = $(this).serialize()
    // console.log(formDate)
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function (response) {
            // console.log(response.message)
            location.href = 'login.html'
        }
    })

    //阻止表单默认的提交行为
    return false
})