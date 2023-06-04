/*Оформление книги*/
$(document).ready(function() {
    /*Включение блока с адресом*/
    $('input[type="checkbox"]').on('click', ()=> {
        if($('.addres').css('display') === "none"){
            $('.addres').css('display', 'block');
        } else{
            $('.addres').css('display', 'none');
        }
    });

    /*Выход из профиля и редирект на форму с авторизацией*/
    $('.logout').click(() => {
        let dataServer = {
            module: 'exit'
        };

        $.ajax({
            type: "POST",
            url: "/server/php/event.php",
            data: JSON.stringify(dataServer)
        });

        window.location.replace('index.php');
    })

    /*Зайти в свой профиль*/
    $('span').click(() => {
        window.location.replace('myProfile.php');
    });

    /*Очищение ошибок во время ввода*/
    $('input[type="text"]').each((i, e) => {
        $(e).on('input', () => {
            let id = $(e).attr('name');
            if ($('#' + id).css('display') === 'block'){
                $('#' + id).css('display', 'none');
            }
        });
    });
    $('select[name="book"]').change(() => {
        if ($('#book').css('display') === 'block'){
            $('#book').css('display', 'none');
        }
    });
    $('input[type="number"]').each((i, e) => {
        $(e).on('change', () => {
            let id = $(e).attr('name');
            if ($('#' + id).css('display') === 'block'){
                $('#' + id).css('display', 'none');
            }
        });
    })
    
    /*Оформление заказа*/
    $('#form').submit((e) => {
        e.preventDefault();

        let dataServer = {
            delivery: false,
            book: $('select[name="book"]').val(),
            count: $('input[name="count"]').val(),
        };
        if($('input[type="checkbox"]').is(':checked')){
            dataServer['delivery'] = true,
            dataServer['city'] = $('input[name="city"]').val(),
            dataServer['street'] = $('input[name="street"]').val(),
            dataServer['house'] = $('input[name="house"]').val(),
            dataServer['flat'] = $('input[name="flat"]').val()
        }

        $.ajax({
            type: 'POST',
            url: '/server/php/order.php',
            data: JSON.stringify(dataServer),
            success: function(errors){
                let isOrdered = true;
                for(let err in errors){
                    if(errors[err]){
                        isOrdered = false;
                        if($('#' + err).css('display') == 'none'){
                            $('#' + err).html(errors[err]);
                            $('#' + err).css('display', 'block');
                        }
                    }
                }

                if(isOrdered){
                    $('input[type="text"]').each((i, e) => {
                        $(e).val("");
                    });
                    $('input[type="number"]').each((i, e) => {
                        $(e).val("1");
                    });
                    $('select[name="book"]').val('0');

                    alert('Заказ оформлен');
                }
            }
        });
    })
});