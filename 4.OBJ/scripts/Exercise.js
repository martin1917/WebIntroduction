class Exercise{
    constructor(question, answers, correctAnswer, typeAnswer){
        this.question = question; //вопрос
        this.answers = answers;  //массив вариантов ответов
        this.inputAnsewer = "";  //введенный пользователем ответ
        this.correctAnswer = correctAnswer;  //правильный ответ
        this.typeAnswer = typeAnswer;  //тип ответа (один или несколько)
        this.isSave = false;  //сохранен ли ответ на вопрос?
    }

    display(){
        document.getElementById('answer').innerHTML = "";
        let str = "";
        document.getElementById('question').innerHTML = `<div>${this.question}</div>`;
        switch(this.typeAnswer){
            case TYPE.CheckBox:
                for(let i = 0; i < this.answers.length; i++){
                    if(this.inputAnsewer.indexOf(this.answers[i]) !== -1){
                        str = `<div><input type="checkbox" value="${this.answers[i]}" checked>${this.answers[i]}</div>`;
                    }
                    else{
                        str = `<div><input type="checkbox" value="${this.answers[i]}">${this.answers[i]}</div>`;
                    }
                    
                    document.getElementById('answer').innerHTML += str;
                }
                break;
    
            case TYPE.RadioButton:
                for(let i = 0; i < this.answers.length; i++){
                    if(this.answers[i] === this.inputAnsewer){
                        str = `<div><input type="radio" name="a" value="${this.answers[i]}" checked>${this.answers[i]}</div>`;
                    }
                    else{
                        str = `<div><input type="radio" name="a" value="${this.answers[i]}">${this.answers[i]}</div>`;
                    }
                    document.getElementById('answer').innerHTML += str;
                }
                break;
    
            case TYPE.Select:
                for(let i = 0; i < this.answers.length; i++){
                    if(i === 0){
                        str = `<select id="select" name="select"></select>`;
                        document.getElementById('answer').innerHTML += str;
                    }

                    if(this.answers[i] === this.inputAnsewer){
                        str = `<div><option value="${this.answers[i]}" selected>${this.answers[i]}</div>`;
                    }
                    else{
                        str = `<div><option value="${this.answers[i]}">${this.answers[i]}</div>`;
                    }
                    document.getElementById('select').innerHTML += str;
                }
                break;
    
            case TYPE.TextArea:
                str = `<textarea id="textarea" cols="30" rows="5" placeholder="${'Напшите ваш ответ'}">${this.inputAnsewer}</textarea>`;
                document.getElementById('answer').innerHTML += str;
                break;
        }
    }

    getInfo(answer){
        let arr;
        if(answer === 'input') arr = this.inputAnsewer;
        else if (answer === 'correct') arr = this.correctAnswer;
        else return;

        let output = '';
        if(this.typeAnswer === TYPE.CheckBox){
            for(let i = 0; i < arr.length; i++){
                output += `•${arr[i]}<br>`;
            }
        }
        else{
            output = arr;
        }
        return output;
    }

    isCorrect(){
        let flag = true;
        if(this.typeAnswer === TYPE.CheckBox){
            console.log(this.inputAnsewer);
            console.log(this.correctAnswer);
            flag = this.inputAnsewer.length === 0 || this.inputAnsewer.length !== this.correctAnswer.length ? false : true;
            for(let i = 0; i < this.inputAnsewer.length; i++){
                if(this.correctAnswer.indexOf(this.inputAnsewer[i]) === -1) return false;
            }
        }
        else{
            flag = this.inputAnsewer === this.correctAnswer;
        }
        return flag;
    }
}