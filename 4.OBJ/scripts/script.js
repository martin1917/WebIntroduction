document.addEventListener("DOMContentLoaded", ()=>{
    let test; //Тест
    let NumExercise = 0; //номер текущего вопроса

    let exercise = [
        new Exercise("Что нужно делать при пожаре",
        [
            'кричать',
            'плакать',
            'прыгнуть в огонь',
            'не паниковать'
        ],
        "не паниковать",
        TYPE.RadioButton),

        new Exercise("Какой номер у пажарных?",
        [''],
        "01",
        TYPE.TextArea),

        new Exercise("Какая опасность таится для людей при пожаре?",
        [
            'высокая температура воздуха и задымленность',
            'высокая концентрация окиси углерода и других вредных продуктов сгорания',
            'опасность испортить зрение',
            'возможное обрушение конструкций зданий и сооружений'
        ],
        [
            'высокая температура воздуха и задымленность',
            'высокая концентрация окиси углерода и других вредных продуктов сгорания',
            "возможное обрушение конструкций зданий и сооружений"
        ],
        TYPE.CheckBox),

        new Exercise("Где ты живешь?",
        [
            '',    
            'Пенза',
            'Москва',
            'Питер',
            'Мухосранск',
            'Саратов'
        ],
        'Пенза',
        TYPE.Select),
        
        new Exercise("Что такое пожар?",
        [
            'это организованный процесс горения',
            'это контролируемый процесс горения, сопровождающийся выделением большого количества тепла',
            'это неконтролируемый процесс горения, сопровождающийся уничтожением материальных ценностей и создающий опасность для жизни и здоровья людей',
            'это поддерживаемый процесс горения, сопровождающийся выделением большого количества энергии'
        ],
        'это неконтролируемый процесс горения, сопровождающийся уничтожением материальных ценностей и создающий опасность для жизни и здоровья людей',
        TYPE.RadioButton),

        new Exercise('Для оказания первой помощи при от­крытых повреждениях (раны, ожоги) в качестве асепти­ческой повязки удобнее всего использовать',
        [
            'нестерильный бинт',
            'перевязоч­ный пакет медицинский (ППМ)',
            'стерильный бинт, вату'
        ],
        [
            'перевязоч­ный пакет медицинский (ППМ)',
            'стерильный бинт, вату'
        ],
        TYPE.CheckBox),

        new Exercise("Вставьте пропущенное словосочетание:\nВо время пожара выделяется ...",
        [""],
        'углекислый газ',
        TYPE.TextArea)
    ];
    for(let i = 0; i < exercise.length - 1; i++){  //перемешка вопросов и ответов
        let j = Math.floor(Math.random() * exercise.length);
        let t = exercise[i];
        exercise[i] = exercise[j];
        exercise[j] = t;
    }

    test = new Test(exercise);

    for(let i = 0; i < exercise.length; i++){
        let div = document.createElement('div');
        div.classList.add('btns');
        div.innerHTML = `${i+1}`;
        div.addEventListener("click", ()=>{
            toSave();   
            NumExercise = i;
            test.exercises[NumExercise].display();
            changeBackground(NumExercise);
        });
        document.getElementsByClassName('list')[0].append(div);
    }
    
    document.getElementById('btnStart').addEventListener("click", () => {
        let m = document.querySelectorAll('.timer_block.f .timer_block_first')[0].innerHTML;
        let s = document.querySelectorAll('.timer_block.s .timer_block_first')[0].innerHTML;
        
        document.querySelectorAll('.main.start')[0].style.display = "none";
        document.querySelectorAll('.main.test')[0].style.display = "block";

        document.getElementById('time').innerHTML = `${m}:${s}`; 

        let time = [Number(m), Number(s)];
        timer = setInterval(() => {
            if(Number(time[0]) <= 0 && Number(time[1]) <= 0){
                document.getElementById('time').innerHTML = `00:00`; 
                clearInterval(timer);
                if(!test.isFinish) getResult();
            }
            else{
                let min = time[0] <= 9 ? `0${time[0]}` :`${time[0]}`;
                let sec = time[1] <= 9 ? `0${time[1]}` :`${time[1]}`;
                document.getElementById('time').innerHTML = `${min}:${sec}`;
            }

            if(--time[1] < 0){
                time[0]--;
                time[1] = 59;
            }
        }, 1000);
    });
    document.querySelectorAll('.changeTime').forEach((elem) => {
        elem.addEventListener("click", () => {
            const str = ' .timer_block_first';  //блок с временем (числа)
            let parrentClassName = '.' + elem.parentElement.parentElement.className.replace(/ /g, '.'); // блок минут/секунд
            let fieldClassName = parrentClassName + str;  //блок в котором будет меняться время
            let i = Number(document.querySelectorAll(fieldClassName)[0].innerHTML); //число перед изменением

            if(elem.classList.contains('up')){
                i++;
                if(i >= 60 && document.querySelectorAll(parrentClassName)[0].classList.contains('s')){
                    i = 0;
                    let prev = Number(document.querySelectorAll(`.timer_block.f ${str}`)[0].innerHTML);
                    document.querySelectorAll(`.timer_block.f ${str}`)[0].innerHTML = (++prev>=0 && prev<=9) ? `0${prev}` : `${prev}`;
                }
            }
            else if(elem.classList.contains('down')) {
                i--;
                if(i < 0 && document.querySelectorAll(parrentClassName)[0].classList.contains('s') && Number(document.querySelectorAll(`.timer_block.f ${str}`)[0].innerHTML) > 0){
                    i = 59;
                    let prev = Number(document.querySelectorAll(`.timer_block.f ${str}`)[0].innerHTML);
                    document.querySelectorAll(`.timer_block.f ${str}`)[0].innerHTML = (--prev>=0 && prev<=9) ? `0${prev}` : `${prev}`;
                }
            }

            document.querySelectorAll(fieldClassName)[0].innerHTML = ((i >= 0) && i <= 60)? ((i <= 9) ? `0${i}` : `${i}`) : `00`; //меняем значение
        });
    });

    document.querySelectorAll('.navigation_body .btns')[2].addEventListener("click", () => {  //<<
        toSave();
        if(NumExercise + 1 < test.exercises.length){
            NumExercise++;
            test.exercises[NumExercise].display();
            changeBackground(NumExercise);
        }
    });
    document.querySelectorAll('.navigation_body .btns')[1].addEventListener("click", () => { // <--
        toSave();
        if(NumExercise > 0){
            NumExercise--;
            test.exercises[NumExercise].display();
            changeBackground(NumExercise);
        }
    });
    document.querySelectorAll('.navigation_body .btns')[3].addEventListener("click", () => { // -->
        toSave();
        NumExercise = test.exercises.length - 1;
        test.exercises[NumExercise].display();
        changeBackground(NumExercise);
    });
    document.querySelectorAll('.navigation_body .btns')[0].addEventListener("click", () => { // >>
        toSave();
        NumExercise = 0; 
        test.exercises[NumExercise].display();
        changeBackground(NumExercise);   
    });
    document.getElementById('finish').addEventListener('click', getResult);

    function changeBackground(NumExercise){
        document.querySelectorAll('.list > div').forEach((elem) => {
            elem.classList.remove('active');
            if(elem.classList.contains('saveAndActive')){
                elem.classList.remove('saveAndActive');
                elem.classList.add('save');
            }
        });

        if(document.querySelectorAll('.list > div')[NumExercise].classList.contains('save')){
            document.querySelectorAll('.list > div')[NumExercise].classList.remove('save');
            document.querySelectorAll('.list > div')[NumExercise].classList.add('saveAndActive');
        }
        else if (!document.querySelectorAll('.list > div')[NumExercise].classList.contains('saveAndActive')){
            document.querySelectorAll('.list > div')[NumExercise].classList.add('active');
        }
    }

    function toSave(){
        switch(test.exercises[NumExercise].typeAnswer){
            case TYPE.CheckBox:
                let input = [];
                document.querySelectorAll('#answer > div input[type="checkbox"]').forEach((elem)=>{
                    if(elem.checked) 
                        input.push(elem.value);
                });

                if(input.length !== 0) 
                    test.exercises[NumExercise].isSave = true;
                else test.exercises[NumExercise].isSave = false;

                test.exercises[NumExercise].inputAnsewer = input;
            break;
        
            case TYPE.RadioButton:
                document.querySelectorAll('#answer > div input[type="radio"]').forEach((elem)=>{
                    if(elem.checked) 
                        test.exercises[NumExercise].inputAnsewer = elem.value;
                });

                if(test.exercises[NumExercise].inputAnsewer !== "") 
                    test.exercises[NumExercise].isSave = true;
                else test.exercises[NumExercise].isSave = false;
            break;
        
            case TYPE.Select:
                let n = document.getElementById('select').options.selectedIndex;
                test.exercises[NumExercise].inputAnsewer = document.getElementById('select').options[n].text;

                if(test.exercises[NumExercise].inputAnsewer != '') test.exercises[NumExercise].isSave = true;
				else test.exercises[NumExercise].isSave = false;
            break;
        
            case TYPE.TextArea:
                test.exercises[NumExercise].inputAnsewer = document.getElementById('textarea').value;

                if(document.getElementById('textarea').value !== "")
                    test.exercises[NumExercise].isSave = true;
                else test.exercises[NumExercise].isSave = false;
            break;
        }

        if(test.exercises[NumExercise].isSave){
            document.querySelectorAll('.list > div')[NumExercise].classList.remove('active');
            document.querySelectorAll('.list > div')[NumExercise].classList.add('saveAndActive');
        }
        else{
            document.querySelectorAll('.list > div')[NumExercise].classList.remove('saveAndActive');
            document.querySelectorAll('.list > div')[NumExercise].classList.add('active');
        }
    }

    function getResult(){
        test.isFinish = true;
        toSave();
        for(let i = 0; i < test.exercises.length; i++){
            let elem = test.exercises[i];
            let mark = elem.isCorrect();
            // let str = `<tr><td>${i+1}</td><td>${elem.getInfo('input')}</td><td>${elem.getInfo('correct')}</td><td>${mark ? `1/1` : `0/1`}</td></tr>`;
            // document.getElementById('table').innerHTML += str;
            let row = document.createElement('tr');
            let col_1 = document.createElement('td');   col_1.innerHTML = `${i+1}`;                      row.appendChild(col_1);
            let col_2 = document.createElement('td');   col_2.innerHTML = `${elem.getInfo('input')}`;    row.appendChild(col_2);
            let col_3 = document.createElement('td');   col_3.innerHTML = `${elem.getInfo('correct')}`;  row.appendChild(col_3);
            let col_4 = document.createElement('td');   col_4.innerHTML = `${mark ? `1/1` : `0/1`}`;     row.appendChild(col_4);
            document.getElementById('table').appendChild(row);
            let color = mark ? 'correct' : 'fail';
            document.querySelectorAll(`#table > tr:last-child`)[0].classList.add(color);
        }
        document.querySelectorAll('.main.test')[0].style.display = "none";
        document.querySelectorAll('.box')[0].style.display = "block";
        document.querySelectorAll('.info')[0].innerHTML = `Ваш результат: ${test.getMark()}/${test.exercises.length}`;
    }
    
    document.querySelectorAll('.list > div')[0].classList.add('active');
    test.exercises[0].display();
    console.log(exercises[0]);
});