
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categoryTpl', {
            data: response
        })
        $('#category').html(html)
    }
})

$('#feature').on('change', function () {
    var file = this.files[0]
    //创建formdata对象实现二进制文件上传
    var formData = new FormData();
    formData.append('cover', file);
    // console.log(file)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response)
            $('#thumbnail').val(response[0].cover)
        }
    })
})

$('#addPostForm').on('submit', function () {
    var formData = $(this).serialize()

    $.ajax({
        type: 'POST',
        url: '/posts',
        data: formData,
        success: function (response) {
            // console.log(response)
            location.href = 'posts.html'
        }
    })

    return false
})

var id = getUrlParams('id')

//修改文章
if (id != -1) {
    //根据id获取文章信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    response.categories = categories
                    var html = template('modifyPostTpl', response)
                    $('#parentBox').html(html)
                    console.log(html)
                }
            })
            // console.log(response)
        }
    })
}

//从浏览器的地址栏中获取查询参数
function getUrlParams (name) {
    var paramsAry = location.search.substr(1).split('&')
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}

$('#parentBox').on('submit', '#modifyPostForm', function () {
    //获取在表单中输入的内容
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'PUT',
        url: '/posts/' + id,
        data: formData,
        success: function (response) {
            location.href = 'posts.html'
        }
    })
    return false
})