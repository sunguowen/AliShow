$('#addCategoriesForm').on('submit', function () {
    var formData = $(this).serialize()
    // alert(formData)
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload()
        },
        error: function () {
            alert('添加失败')
        }
    })
    return false
})


$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        console.log(response)

        var html = template('categoriesListTpl', {
            data: response
        })
        $('#categoriesList').html(html)
    }
})

$('#categoriesList').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            // console.log(response)
            var html = template('modifyCategoriesTpl', {
                data: response
            })
            $('#addCategoriesBox').html(html)
        }
    })
    // console.log($(this).attr('data-id'))
})

$('#addCategoriesBox').on('submit', '#modifyCategoriesForm', function () {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload()
        }
    })
    // alert(formData)
    return false
})


$('#categoriesList').on('click', '.delete', function () {

    if (confirm('确定删除分类数据吗?')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'DELETE',
            url: '/categories/' + id,
            success: function () {
                location.reload()
            }
        })
    }
})