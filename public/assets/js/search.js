var key = getUrlParams('key')

$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function (response) {
        var html = template('searchTpl', { data: response })
        $('#listBox').html(html)
        console.log(response)
        // console.log(response)
    }
})