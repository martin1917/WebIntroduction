class Game{
    constructor(){
        this.figures = [];  //массив jquery объктов
        this.size = 0;
    }

    pushFigure(figure){
        this.figures.push(figure);
        this.size++;
    }

    /*проверка(в лоб) на соударение*/
    check(){
        for(let i = 0; i < this.size - 1; i++){
            for(let j = i + 1; j < this.size; j++){
                if(!this.figures[i].collapse && !this.figures[j].collapse &&
                  (this.figures[i].left1() >= this.figures[j].left1() &&
                   this.figures[i].top1() >= this.figures[j].top1() &&
                   this.figures[i].left1() <= this.figures[j].left2() &&
                   this.figures[i].top1() <= this.figures[j].top2() ||

                   this.figures[i].left2() >= this.figures[j].left1() &&
                   this.figures[i].top1() >= this.figures[j].top1() &&
                   this.figures[i].left2() <= this.figures[j].left2() &&
                   this.figures[i].top1() <= this.figures[j].top2() || 

                   this.figures[i].left2() >= this.figures[j].left1() &&
                   this.figures[i].top2() >= this.figures[j].top1() &&
                   this.figures[i].left2() <= this.figures[j].left2() &&
                   this.figures[i].top2() <= this.figures[j].top2() ||
                   
                   this.figures[i].left1() >= this.figures[j].left1() &&
                   this.figures[i].top2() >= this.figures[j].top1() &&
                   this.figures[i].left1() <= this.figures[j].left2() &&
                   this.figures[i].top2() <= this.figures[j].top2()))
                   {
                    

                       this.figures[i].object.stop();                
                       this.figures[j].object.stop();

                       this.figures[i].collapse = true;                
                       this.figures[j].collapse = true;

                       this.figures[i].toDecay();                
                       this.figures[j].toDecay();

                       this.figures[i].object.remove();              
                       this.figures[j].object.remove();
                   }
            }
        }
    }
}