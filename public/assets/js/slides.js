$('#file').on('change', function () {
    //获取到用户选择的第一个文件
    var file = this.files[0];
    //创建formData 对象实现二进制文件上传
    var formData = new FormData()
    //将用户选择的文件添加到formData对象中
    formData.append('image', file)

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#image').val(response[0].image)
            console.log(response)
        }
    })
})

$('#slideForm').on('submit', function () {
    //获取表单数据
    var formData = $(this).serialize()

    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function (response) {
            location.reload()
        }
    })

    // alert(1)
    return false
})


$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        var html = template('slidesTpl', {
            data: response
        })

        $('#slidesBox').html(html)
        // console.log(response)
    }
})

$('#slidesBox').on('click', '.delete', function () {

    if (confirm('确定删除当前轮播图吗？')) {

        var id = $(this).attr('data-id')
        // alert(id)
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function (response) {
                location.reload()
            }
        })
    }

})
