//向服务器端发送请求索要随机推荐数据
$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function (response) {
    var randomRecommendTpl = `
            {{each data}}
          <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}">
              </div>
            </a>
          </li>
            {{/each}}
            `
    var html = template.render(randomRecommendTpl, {
      data: response
    })

    $('#randomBox').html(html)

    // console.log(html)
  }
})


//向服务器索要最新评论数据

$.ajax({
  type: 'get',
  url: '/comments/lasted',
  success: function (response) {
    console.log(response)
    // if (response != []) {
    var lastedCommentsTpl = `
            {{each data}}
              <li>
                <a href="javascript:;">
                  <div class="avatar">
                    <img src="{{$value.author.avatar}}">
                  </div>
                  <div class="txt">
                    <p>
                      <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                    </p>
                    <p>{{$value.content}}</p>
                  </div>
                </a>
              </li>
            {{/each}}
            `
    var html = template.render(lastedCommentsTpl, { data: response })
    $('#lastedCommentBox').html(html)
    // console.log(response)
    // }
  }
})

//向服务器端发送请求索要文章分类信息
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    var navTpl = `
        {{each data}}
        <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `
    var html = template.render(navTpl, { data: response })
    $('#navBox').html(html)
    console.log(response)
  }
})

//获取地址栏中的categoryId参数
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

function formateDate (date) {
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

$('.search form').on('submit', function () {
  var keys = $(this).find('.keys').val()

  location.href = 'search.html?key=' + keys
  // alert(1)
  return false
})