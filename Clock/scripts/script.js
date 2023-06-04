function displayCanvas(){
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let xc = 250, yc = 250;
    let R = 250, r = 230;

    ctx.fillStyle = "white";
    ctx.fillRect(0,0, 2*xc, 2*yc);

    ctx.beginPath();
        ctx.arc(xc, yc, R, 0, Math.PI * 2, true); 
        ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
        ctx.moveTo(xc + 3, yc);
        ctx.arc(xc, yc, 3, 0, Math.PI * 2, true); 
        ctx.fillStyle = "black";
        ctx.fill();
    ctx.closePath();

    for (let i = 0; i < 360; i += 6){
        let x0 = xc + r*Math.cos(Math.PI/180 * i);
        let y0 = yc + r*Math.sin(Math.PI/180 * i);
        let dr = 1;

        ctx.beginPath();    
            i % 90 === 0 ? dr = 8 : i % 30 === 0 ? 4 : 1;
            ctx.arc(x0, y0, dr, 0, Math.PI * 2, true);
            ctx.stroke();
        ctx.closePath();
    }

    let date = new Date();
    let t_sec = date.getSeconds();

    ctx.beginPath();
    ctx.moveTo(xc, yc);
    ctx.lineTo(xc + r*Math.cos(6*t_sec*Math.PI / 180), yc + r*Math.sin(6*t_sec*Math.PI / 180));
    ctx.stroke();
    ctx.closePath();
}

setInterval(() => {
    document.getElementById('clock').innerHTML = new Date().toLocaleTimeString();
    displayCanvas();
}, 1000);

