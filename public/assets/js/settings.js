$('#logoFile').on('change', function () {
    var file = this.files[0];

    var formData = new FormData()

    formData.append('logo', file)

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#logo').val(response[0].logo)
            var html = template('previewTpl', response[0])
            $('#previewBox').html(html)
        }
    })
})


$('#webSettingForm').on('submit', function () {
    var formData = $(this).serialize()

    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function (response) {
            // console.log(response)
            location.reload()
        }
    })
    return false
})

$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        console.log(response)
        if (response) {

            var html = template('settingsShowTpl', response)
            $('#settingsFormBox').html(html)
        }
        // console.log(html)
    }
})

$('#settingsFormBox').on('submit', '#modifySettingForm', function () {
    var formData = $(this).serialize()

    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function (response) {
            location.reload()
        }
    })
})

$('#settingsFormBox').on('change', '#logoFile_mod', function () {
    var file = this.files[0];

    var formData = new FormData()

    formData.append('logo', file)

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#logo_mod').val(response[0].logo)
            var html = template('previewTpl', response[0])
            $('#previewBox').html(html)
        }
    })
})