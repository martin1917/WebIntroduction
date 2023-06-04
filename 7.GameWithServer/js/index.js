let info = {};  //информация, получаемая с сервера

// запрос на получение информации
$.ajax({
    type: "POST",
    url: "/server/php/getInfo.php",
    async: false,
    success: function(_info){
        info = _info;
    }
});

$(document).ready(function(){
    let isStart = false;    //состояние игры
    let inWay = false;      //состояние ответа
    let dTime = 1;          //время, заданое юзером
    let dataServer = {};    //данные для сервера
    let currBtn = null;     //текущая цифра
    let btnInField = null;  //цифра установленная в поле с ответом

    /*вывод информации о нас и о всех юзерах в таблицу*/
    let showResult = (dates) => {
        let length0 = dates[0].length; 
        let length1 = dates[1].length; 
        for(let i = 0; i < length0; i++){   
            let row = $('<tr></tr>');
            let cell = $('<td>' + dates[0][i]["time"] + '</td><td>' + dates[0][i]["score"] + '</td><td>' + dates[0][i]["dTime"] + '</td>')
            row.append(cell);
            $('#yourScore').append(row);
        }
        for(let i = 0; i < length1; i++){   
            let row = $('<tr></tr>');
            let cell = $('<td>' + dates[1][i]["name"] + '</td><td>' + dates[1][i]["score"] + '</td><td>' + dates[1][i]["dTime"] + '</td>')
            row.append(cell);
            $('#generalScore').append(row);
        }
    }

    //получение данных из куки
    let getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    
    //вывод счета игроков
    showResult(info);

    /*выход из аккаунта*/
    $('.logout').click(() => {
        $.ajax({
            type: "POST",
            url: "/server/php/exit.php"
        });

        window.location.replace('login.php');
    })

    //вызывается при старте игры
    const start = function(){
        isStart = true;
        let prev = Math.floor($('input[type="number"]').val());

        //стилизация эл-тов (задний фон/удаление текста/и т.д.)
        $('.wrapper__body').addClass('ready');
        $('.task').html(".");
        $('.answer').html(""); 
        $('.message-score').html("");
        $('input[type="number"]').prop("disabled", true);
        $('input[type="button"]').prop("disabled", true);
        $(".btn").each((i, e) => { $(e).attr('draggable', true); });

        //Выводим на экран оркгленное время
        if (prev < 1) prev = 1;
        $('input[type="number"]').val(prev);

        // запоминаем введенное время
        dTime = prev;
        dataServer['dTime'] = dTime;

        //запускаем таймер
        let timer = setInterval(() => {
            prev = $('input[type="number"]').val();
            $('input[type="number"]').val(--prev);

            //по истечению времени останавливаем таймер
            if(prev == 0){
                //стилизация эл-тов (активность/задний фон/текст/ и т.д.)
                $('input[type="number"]').prop("disabled", false);
                $('input[type="button"]').prop("disabled", false);
                $(".btn").each((i, e) => { $(e).attr('draggable', false); });
                $('input[type="number"]').val(50);
                $('.task').html("[Пример]");
                $('.answer').html(""); 
                $('.wrapper__body').removeClass('ready');

                //запрос на запись резульата в файл
                $.ajax({
                    type: "POST",
                    url: "/server/php/writeResult.php",
                    data: JSON.stringify(dataServer)
                });

                //запрос на вывод результатов
                $.ajax({
                    type: "POST",
                    url: "/server/php/getInfo.php",
                    data: JSON.stringify(dataServer),
                    success: function(ans){
                        let prevBestScore = 0;
                        let currBestScore = 0;
                        let isUndefined = typeof($("#yourScore tr:nth-child(2) td:nth-child(2)")[0]) == "undefined";

                        if(!isUndefined)
                            prevBestScore = $("#yourScore tr:nth-child(2) td:nth-child(2)")[0].innerHTML - 0;

                        $("#yourScore tr:not(:first)").remove();
                        $("#generalScore tr:not(:first)").remove();
                        showResult(ans);

                        currBestScore = $("#yourScore tr:nth-child(2) td:nth-child(2)")[0].innerHTML - 0;

                        if(currBestScore > prevBestScore && !isUndefined)
                            $('.message-score').html(
                                "Вы побили свой прошлый рекорд." + 
                                "<br>Новый рекорд: " + currBestScore + 
                                "<br>Прошлый рекорд: " + prevBestScore
                            );
                        else if(currBestScore > prevBestScore && isUndefined)
                            $('.message-score').html(
                                "Новый рекорд: " + currBestScore
                            );
                    }
                });

                clearTimeout(timer);
                isStart = false;
                currBtn = null;
                btnInField = null;
            }
        }, 1000);
    }  

    //функции для drag & drop
    const dragstart = function(){
        setTimeout(() => {
            currBtn = this;
            $('.message').css('display', 'none');

            if(currBtn == btnInField){
                $('.answer').html('');
            }
        }, 0)
    }

    const dragend = function(){
        this.classList.remove('hide');
        currBtn = null;
    }

    const dragover = function(event){
        event.preventDefault();
    }

    const dragenter = function(){
        if(this.children.length == 0){
            this.classList.add("active");
        }
    }

    const dragleave = function(){
        if(this.children.length == 0){
            this.classList.remove("active");
        }
    }

    const dragdrop = function(){
        if(this.children.length == 0 && currBtn != btnInField){
            let w = currBtn.getBoundingClientRect().width;
            let h = currBtn.getBoundingClientRect().height;
            let text = currBtn.innerHTML;
        
            let btn = $(`<div class="btn" draggable="true">${text}</div>`);
            btn.css({
                "width" : `${w}px`,
                "height" : `${h}px`,
                "font-size": "1.8rem",
                "text-align": "center"
            });
            btn.on("dragstart", dragstart);
            btn.on("dragend", dragend);

            if(text > 1)
                btn.insertAfter(`.btn:nth-child(${text-1})`);
            else
                btn.insertBefore(`.btn:nth-child(${1})`);

            btnInField = currBtn;
            currBtn.style.width = "100%";
            this.append(currBtn);
            this.classList.remove("active");
        }
        else if(btnInField == currBtn && currBtn != null){
            btnInField.addEventListener('dragstart', dragstart);
            btnInField.addEventListener('dragend', dragend);
            this.append(btnInField);
            this.classList.remove("active");    
        }
        else
            $('.message').css('display', 'block');
    }

    //события для drag & drop
    $(".btn").each((i, e) => {
        $(e).on("dragstart", dragstart);
        $(e).on("dragend", dragend);
    });
    $('.answer').on("dragover", dragover);
    $('.answer').on("dragenter", dragenter);
    $('.answer').on("dragleave", dragleave);
    $('.answer').on("drop", dragdrop);


    //получение задания с сервера
    function getTask(){
        inWay = true;

        $.ajax({
            type: "POST",
            url: "/server/php/getExercise.php",
            data: JSON.stringify(dataServer),
            success: function(exercise){
                dataServer["param1"] = exercise["param1"];
                dataServer["param2"] = exercise["param2"];
                dataServer["operation"] = exercise["operation"];

                let text = exercise["param1"] + " "
                         + exercise["operation"].italics().bold() + " "
                         + exercise["param2"] + " = ";

                $('.task').html(text);
                $('.answer').html("");
                inWay = false;
            }
        });
    }

    //проверка задания на сервере
    function check(){
        dataServer['answer'] = $('.answer').children().html();
        $.ajax({
            type: "POST",
            url: "/server/php/checkExercise.php",
            data: JSON.stringify(dataServer),
            success: function(){
                let score = getCookie("score")
                switch(score){
                    case "2":
                        $('.score').css('color' , 'rgb(13, 95, 13)');
                    break;
                    case "5":
                        $('.score').css('color' , 'rgb(255, 165, 0)');
                    break;
                    case "9":
                        $('.score').css('color' , 'rgb(202, 82, 27)');
                    break;
                    case "16":
                        $('.score').css('color' , 'rgb(128, 0, 0)');
                    break;
                    case "21":
                        $('.score').css('color' , 'rgb(255, 0, 0)');
                    break;
                }
                $('#score').html(score);
            }
        });
    }

    //событие для кнопки START
    $('input[type="button"]').click(() => {
        $('#score').html('0');
        start();
        getTask();
    });

    //Enter - отправка ответа на сервер
    $(document).on("keydown", (e) => {
        if(isStart && !inWay){
            if(e.keyCode === 13 && $('.answer').children().length == 1){
                check();
                getTask();
            }
        }
    })
});