$(document).ready(function(){
    const W = $('.box').width();
    const H = $('.box').height();
    const count = 12;

    /*инициализация*/
    (()=>{
        for(let i = 0; i < count; i++){
            let w0 = Math.floor((Math.random() + 1) * 60);
            let h0 = Math.floor((Math.random() + 1) * 60);

            let x = Math.floor(Math.random() * (W - w0) + 1);
            let y = Math.floor(Math.random() * (H - h0) + 1);

            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);

            let style = Math.floor(Math.random()*2) === 0 ? "circle" : "square";
            if(style === "circle"){
                w0 = Math.min(w0, h0);
                h0 = w0;
            }

            $('<div/>',{
                "class" : "element " + style
            }).appendTo(".box").css({
                "height" : h0 + "px",
                "width" : w0 + "px",
                "left" : x + "px",
                "top" : y + "px",
                "backgroundColor" : "rgb(" + r + "," + g + "," + b + ")"
            });
        }
    })();

    /*начать движение*/
    let game = new Game();
    for(let i = 0; i < count; i++){
        game.pushFigure(new Figure($('.element').eq(i)));
        game.figures[i].move();
        setInterval(()=>{
            game.figures[i].move();
        }, 2000);
    }

    /*запустить проверку на соударение(но не сразу)*/
    setTimeout(()=>{
        setInterval(()=>{
            game.check();
         }, 20);
    }, 2000);
});