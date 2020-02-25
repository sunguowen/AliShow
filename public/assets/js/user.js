
$('#userForm').on('submit', function () {
    //获取到用户在表单中输入的内容，并格式化成参数字符串的形式。
    var formData = $(this).serialize()
    //请求服务器
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function () {
            location.reload()
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    //阻滞表单的默认提交行为
    return false
})

$('#modifyBox').on('change', '#avatar', function () {
    var formdata = new FormData()
    // console.log(this.files[0])
    formdata.append('avatar', this.files[0])
    // console.log(formdata)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response)
            //实现头像预览功能
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})


$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        var html = template('userTpl', {
            data: response
        })
        $('#userBox').html(html)
        // console.log(html)
    },
    error: function () {
        alert('用户列表获取出现了一些错误。。。')
    }
})

$('#userBox').on('click', '.edit', function () {
    //获取当前点击用户的id
    var id = $(this).attr('data-id')
    // alert(id)
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            var html = template('modifyTpl', {
                data: response
            })
            $('#modifyBox').html(html)
            // console.log(html)
        }
    })
})


$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            location.reload()
            // console.log(response)
        }
    })

    // console.log(formData)
    //阻止表单默认提交的行为
    return false

})

$('#userBox').on('click', '.delete', function () {
    var isDelete = confirm('确定删除用户吗？')
    var id = $(this).siblings('.edit').attr('data-id')
    // console.log(id)
    if (isDelete) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (response) {
                console.log('用户删除成功。')
            },
            error: function () {
                console.log('用户删除失败')
            }

        })
        location.reload()
    }
})

var selectAll = $('#selectAll')
var batchDelete = $('#batchDelete')
// console.log(selectAll)

selectAll.on('change', function () {
    //获取全选按钮的状态
    var status = $(this).prop('checked')

    if (status) {
        //显示批量删除按钮
        batchDelete.show()
    } else {
        //隐藏批量删除按钮
        batchDelete.hide()
    }
    // console.log(status)
    $('#userBox').find('input').prop('checked', status)
})

$('#userBox').on('change', '.userStatus', function () {
    var inputs = $('#userBox').find('input')
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)
    }

    if (inputs.filter(':checked').length > 0) {
        batchDelete.show()
    } else {
        batchDelete.hide()
    }
})


batchDelete.on('click', function () {
    var ids = []
    var checkedUser = $('#userBox').find('input').filter(':checked')

    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'))
        console.log(ids)
    })

    if (confirm('确认要删除选中的用户吗？')) {
        var id = ids.join('-')
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})