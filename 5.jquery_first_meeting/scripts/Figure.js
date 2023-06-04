class Figure{
    constructor(figure){
        this.object = figure;  //jquery объект
        this.collapse = false;  //было ли соударение?
    }

    /*движение объектов*/
    move(){
        const W = $('.box').width();
        const H = $('.box').height();
        let x = Math.floor(Math.random() * (W - this.object.width()) + 1);
        let y = Math.floor(Math.random() * (H - this.object.height()) + 1);

        if(!this.collapse){
            this.object.animate({
                left : `${x}px`,
                top : `${y}px`
            }, 2000, 'linear');
        }
    }

    /*координаты вершин*/
    left1(){return this.object.position().left;}
    left2(){return this.object.position().left + this.object.width();}
    top1(){return this.object.position().top;}
    top2(){return this.object.position().top + this.object.height();}
    
    /*Анимация после соударение объектов*/
    toDecay(){
        if(this.collapse){ 
            let x = this.left1() + 1/2 * this.object.width();
            let y = this.top1() + 1/2 * this.object.height();
            let alf = Math.random() * 180;

            for(let i = 0; i < 3; i++){
                alf += 120;
                let div = $('<div class="result_box"></div>');
                div.css({
                    left: `${x}px`,
                    top: `${y}px`
                });
                $('.box').append(div);
                div.animate({
                    left: `${x + 200*Math.cos(Math.PI/180 * alf)}px`,
                    top: `${y + 200*Math.sin(Math.PI/180 * alf)}px`,
                    opacity: '0'
                }, 1000, 'linear', function(){
                    $(this).remove();
                });
            }
        }
    }
}