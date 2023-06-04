$(document).ready(function(){
    /*Очищение полей для ошибок*/
    $('input[name="login"]').on('input', clear);
    $('input[name="pas"]').on('input', clear);
    function clear(){
        if($('.error').css('display') === 'block'){
            $('.error').css('display', 'none');
        }
    }

    /*Отправка формы на сервер*/
    $('#form').submit((e) => {
        e.preventDefault();

        let dataForServer = {
            login: $('input[name="login"]').val(),
            pas: $('input[name="pas"]').val(),
        };

        $.ajax({
            type: 'POST',
            url: '/server/php/login.php',
            data: JSON.stringify(dataForServer),
            success: function(ans){
                if(ans){
                    $('.error').css('display', 'block');
                    $('.error').html(ans);
                } else{
                    window.location.replace('index.php');
                }
            }
        });
    });
});
