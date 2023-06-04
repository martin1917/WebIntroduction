$(document).ready(function(){
    /*Очищение полей для ошибок*/
    $('input[type="text"]').each((i, e) => {
        $(e).on('input', () => {
            let id = $(e).attr('name');
            if ($('#' + id).css('display') === 'block'){
                $('#' + id).css('display', 'none');
            }
        });
    });
    $('input[type="password"]').each((i, e) => {
        $(e).on('input', () => {
            if(
                $('#pas').css('display') === 'block' ||
                $('#repas').css('display') === 'block'
            ){
                $('#pas').css('display', 'none');
                $('#repas').css('display', 'none');
            }
        });
    });

    /*Отправка формы на сервер*/
    $('#form').submit((e) => {
        e.preventDefault();

        let dataForServer = {
            login: $('input[name="login"]').val(),
            name: $('input[name="name"]').val(),
            pas: $('input[name="pas"]').val(),
            repas: $('input[name="repas"]').val(),
        };

        $.ajax({
            type: 'POST',
            url: '/server/php/signup.php',
            data: JSON.stringify(dataForServer),
            success: function(ans){
                let flag = false;
                for(let key in ans){
                    if(ans[key]){
                        flag = true;
                        $('#' + key).html(ans[key]);
                        $('#' + key).css('display', 'block');
                    }
                }
                if(!flag){
                    $('#repas').css('display', 'none');
                    window.location.replace('index.php');
                }
            }
        });
    });
});