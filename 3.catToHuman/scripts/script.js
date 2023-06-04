const k = 7; // коэффициент подобия
let count = 0;
let catToHuman = true; //true(Cat->Human); false(Human->Cat)
let convertSuccessful = false;

document.getElementById('change').addEventListener('click', changeMood);
document.getElementById('btm').addEventListener('click', convert);
document.getElementById('inputData').addEventListener('mousedown', clear);

function changeMood(){ //меняет местами кота и человека
    let tmp = "";
    let firstField = document.getElementById('firstField').textContent;
    let secondField = document.getElementById('secondField').textContent;
    let inputData = document.getElementById('inputData').value;
    let outputData = document.getElementById('outputData').value;
    
    tmp = firstField;
    document.getElementById('firstField').textContent = secondField;
    document.getElementById('secondField').textContent = tmp;
    
    if(inputData !== '' && outputData !== ''){
        tmp = inputData;
        document.getElementById('inputData').value = outputData;
        document.getElementById('outputData').value = tmp;
    }
    
    catToHuman = !catToHuman;
}

function alreadyExist(inputData){ //проверяет таблицу на наличие данных
    let records = document.getElementById("records");
    
    for (let i = 1; i < records.rows.length; i++){
        for (let j = 0; j < 1; j++){
            let k = catToHuman ? 1 : 2;
            if(Number(inputData) === Number(records.rows[i].cells[k].innerHTML)){
                return true;
            }
        }   
    }
    return false;
}

function addRecord(inputData, outputData){ //записывает в таблицу
    let str = '<tr><td></td><td></td><td></td></tr>';
    document.getElementById('records').innerHTML += str;
    let i = document.getElementById('records').rows.length - 1;
    
    document.getElementById('records').rows[i].cells[0].innerHTML = count;
    if(catToHuman){
        document.getElementById('records').rows[i].cells[1].innerHTML = inputData;
        document.getElementById('records').rows[i].cells[2].innerHTML = outputData;
    }
    else{
        document.getElementById('records').rows[i].cells[1].innerHTML = outputData;
        document.getElementById('records').rows[i].cells[2].innerHTML = inputData;
    }
}

function clear(){ //очищаем поля
    
    if(convertSuccessful || document.getElementById('warning').innerHTML !== ''){
        document.getElementById('inputData').value = '';
        document.getElementById('outputData').value = '';
        convertSuccessful = false;
    }
    document.getElementById('warning').innerHTML = '';
}

function convert(){ //конвертирует возраст
    let inputData = document.getElementById('inputData').value.trim();
    let regexp = /^\d+\.?\d*$/; //регулярка, проверяющая строку на число
    let outputData = ""; 
    
    if (regexp.test(inputData)){
        inputData = Math.floor(inputData * 100) / 100;
        
        if(catToHuman){
            document.getElementById('outputData').value = Math.floor(inputData * k * 100) / 100;
        }
        else{
            document.getElementById('outputData').value = Math.floor(inputData * 1/k * 100) / 100;
        }
        outputData = document.getElementById('outputData').value;
        convertSuccessful = true;
        
        
        if(!alreadyExist(inputData)){
            count++;
            addRecord(inputData, outputData);
        }
        else{
            let str = "Warning: Эти данные уже есть в таблице";
            document.getElementById('warning').style.color = 'orange';
            document.getElementById('warning').innerHTML = str;
        }
    }
    else{
        let str = "ERROR: Введите неотрицательное число!";
        document.getElementById('warning').style.color = 'red';
        document.getElementById('warning').innerHTML = str;
    }
}