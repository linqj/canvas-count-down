var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var balls=[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload=function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    var EndTime= new Date('2017/07/07 00:00:00');
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var timer=setInterval(function(){
        var EndTime= new Date('2017/07/07 00:00:00');
        var NowTime = new Date();
        var h=0;
        var m=0;
        var s=0;
        var nh=0;
        var nm=0;
        var ns=0;
        var nt=EndTime.getTime() - NowTime.getTime();
        if(t>=0) {
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
            nh = Math.floor((nt) / 1000 / 60 / 60 % 24);
            nm = Math.floor((nt) / 1000 / 60 % 60);
            ns = Math.floor((nt) / 1000 % 60);
                 }
        if(ns!=s){
            if(parseInt(nh/10)!=parseInt(h/10)){
                addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(h/10));
            }
            if(parseInt(nh%10)!=parseInt(h%10)){
                addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(h/10));
            }
            if(parseInt(nm/10)!=parseInt(m/10)){
                addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(m/10));
            }
            if(parseInt(nm%10)!=parseInt(m%10)){
                addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(m/10));
            }
            if(parseInt(ns/10)!=parseInt(s/10)){
                addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(s/10));
            }
            if(parseInt(ns%10)!=parseInt(s%10)){
                addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(s/10));
            }
            t=nt;
        }

        render( h,m,s,context );


    },50);

};
function addBalls(x,y,num){
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                var aBall={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)],
                };
                balls.push(aBall);
            }

        }
    }
    update();
}
function update(){
    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;
        if( balls[i].y>=760){
            balls[i].y+=760;
            balls[i].vy+=-balls[i].g*0.75;
        }
    }

}
function render(hours,minutes,seconds,cxt){
    cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);
    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);
    for(var i=0;i<balls.length;i++){
        cxt.fillStyle= balls[i].color;
        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI,true );
        cxt.closePath();
        cxt.fill()
    }
}
function renderDigit(x,y,num,cxt){
    cxt.fillStyle= "rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            cxt.beginPath();
            cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , digit[num][i][j]*RADIUS , 0 , 2*Math.PI )
            cxt.closePath();
            cxt.fill()
        }
    }
}

