/*Вывод инфы и заказов юзера*/

/*Данные отправляемые и получаемые с сервера*/
let info = {};  //info[0] - Данные о пользователе || info[1] - заказы пользователя
let dataServer = {
    module: "info"
}

/*Запрос данных о пользователе с сервера*/
$.ajax({
    type: "POST",
    url: "/server/php/event.php",
    data: JSON.stringify(dataServer),
    async: false, 
    success: function(_info){
        info = _info;
    }
});

$(document).ready(function(){
    /*вурнуться на форму оформления*/
    $('.back').click(() => {
        window.location.replace('form.php');
    });

    /*вывод данных на экран*/
    let count = info[1].length;

    for(let i = 0; i < count; i++){
        let row = $('<tr></tr>');

        for(let key in info[1][i]){
            let data = info[1][i][key];
            if(key == 'book'){
                data = NAME[data];
            }
            if(key == 'delivery'){
                data = STATUS[data];
            }
            let cell = $('<td>'+ data +'</td>');
            row.append(cell);
        }
        
        $('table').append(row);
    }

    $('.phone > div:last-child').html(`[${info[0]['phone']}]`);
    $('.email > div:last-child').html(`[${info[0]['email']}]`);
    $('.login > div:last-child').html(`[${info[0]['login']}]`);
});