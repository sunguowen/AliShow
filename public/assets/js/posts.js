// function artDateFormat (date, format) {
//     date = new Date(date);
//     var map = {
//         "M": date.getMonth() + 1, //月份
//         "d": date.getDate(), //日
//         "h": date.getHours(), //小时
//         "m": date.getMinutes(), //分
//         "s": date.getSeconds(), //秒
//         "q": Math.floor((date.getMonth() + 3) / 3), //季度
//         "S": date.getMilliseconds() //毫秒
//     };
//     format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
//         var v = map[t];
//         if (v !== undefined) {
//             if (all.length > 1) {
//                 v = '0' + v;
//                 v = v.substr(v.length - 2);
//             }
//             return v;
//         } else if (t === 'y') {
//             return (date.getFullYear() + '').substr(4 - all.length);
//         }
//         return all;
//     });
//     return format;
// };



//分页
function changePage (page) {
    // alert(page)
    $.ajax({
        type: 'GET',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            // template.defaults.artDateFormat = artDateFormat();
            var html = template('postListTpl', {
                data: response
            })
            $('#postListBox').html(html)

            var page = template('pageTpl', {
                data: response
            })

            $('#page').html(page)
            // console.log(response)

        }
    })
}

$.ajax({
    type: 'GET',
    url: '/posts',
    success: function (response) {
        // template.defaults.artDateFormat = artDateFormat();
        var html = template('postListTpl', {
            data: response
        })
        $('#postListBox').html(html)

        var page = template('pageTpl', {
            data: response
        })

        $('#page').html(page)

    }
})

//向服务器端发送请求索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categorySelectTpl', {
            data: response
        })

        $('#categorySelectBox').html(html)
        console.log(response)
    }
})


//根据分类筛选条件进行筛选
$('#filterForm').on('submit', function () {
    var formData = $(this).serialize();

    $.ajax({
        type: 'GET',
        url: '/posts',
        data: formData,
        success: function (response) {
            // template.defaults.artDateFormat = artDateFormat();
            var html = template('postListTpl', {
                data: response
            })
            $('#postListBox').html(html)

            var page = template('pageTpl', {
                data: response
            })

            $('#page').html(page)

        }
    })
    // alert(1)
    return false
})


$('#postListBox').on('click', '.delete', function () {

    if (confirm('确认删除这篇文章吗？')) {

        var id = $(this).attr('data-id')
        $.ajax({
            type: 'DELETE',
            url: '/posts/' + id,
            success: function (response) {
                location.reload()
            }
        })
    }
})