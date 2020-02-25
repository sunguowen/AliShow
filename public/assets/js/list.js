//获取地址栏中的categoryId参数
var categoryId = getUrlParams('categoryId')

console.log(categoryId)
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function (response) {
        var html = template('listTpl', { data: response })
        $('#listBox').html(html)

        // console.log(response)
    }
})

//根据id查询分类的信息

$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function (response) {
        var title = template('categoryTitleTpl', response)
        $('#categoryTitleBox').html(title)
    }
})