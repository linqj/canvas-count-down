var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var RADIUS;
var context=canvas.getContext("2d");
var MARGIN_TOP;
var MARGIN_LEFT;
var showtime=new Date();
var balls=[];
const colors=["#51F511","#66FAD5","#EF1C3E","#FFFA5F","#DE48CD","#310CF2"];
window.onload=function(){
    WINDOW_WIDTH=document.documentElement.clientWidth;
    WINDOW_HEIGHT=document.documentElement.clientHeight;
    MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
    MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
    RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
    var canvas=document.getElementById("canvas");
    showtime=new Date();
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;
    setInterval(function(){
        render(context);
        update();
    },50);
}
function render(cxt){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    var hours=parseInt(showtime.getHours());
    var minutes=parseInt(showtime.getMinutes());
    var seconds=parseInt(showtime.getSeconds());
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fill();
    }
}
function renderDigit(x,y,num,cxt){
    cxt.fillStyle="rgb(0,102,153)";
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j]==1){
                cxt.beginPath()
                cxt.arc(x+(RADIUS+1)+j*2*(RADIUS+1),y+(RADIUS+1)+i*2*(RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
}
function update(){
    var nextTime=new Date();
    var nexttimehours=parseInt(nextTime.getHours());
    var nexttimeminutes=parseInt(nextTime.getMinutes());
    var nexttimeseconds=parseInt(nextTime.getSeconds());
    var showtimehours=parseInt(showtime.getHours());
    var showtimeminutes=parseInt(showtime.getMinutes());
    var showtimeseconds=parseInt(showtime.getSeconds());
    if(nextTime!=showtime){
        if(parseInt(nexttimehours/10)!=parseInt(showtimehours/10)){
            addballs(MARGIN_LEFT,MARGIN_TOP,parseInt(nexttimehours/10));
        };
        if(parseInt(nexttimehours%10)!=parseInt(showtimehours%10)){
            addballs(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(nexttimehours%10));
        };
        if(parseInt(nexttimeminutes/10)!=parseInt(showtimeminutes/10)){
            addballs(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(nexttimeminutes/10));
        };
        if(parseInt(nexttimeminutes%10)!=parseInt(showtimeminutes%10)){
            addballs(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(nexttimeminutes%10));
        };
        if(parseInt(nexttimeseconds/10)!=parseInt(showtimeseconds/10)){
            addballs(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(nexttimeseconds/10));
        };
        if(parseInt(nexttimeseconds%10)!=parseInt(showtimeseconds%10)){
            addballs(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nexttimeseconds%10));
        };}
    showtime=nextTime;
    updateBalls();
}
function updateBalls(){
    for(var i=0;i<balls.length;i++){
        balls[i].x +=balls[i].vx;
        balls[i].y +=balls[i].vy;
        balls[i].vy +=balls[i].g;
        if(balls[i].y> WINDOW_HEIGHT - RADIUS){
            balls[i].y=WINDOW_HEIGHT -RADIUS;
            balls[i].vy=-balls[i].vy*0.6;
        }
    }
    var ballscontol=0;
    for(i=0;i<balls.length;i++)
        if (balls[i].x + RADIUS>0&&balls[i].x - RADIUS<WINDOW_WIDTH) {
            balls[ballscontol++]=balls[i]
        }
    while(balls.length>Math.min(ballscontol,300)){
        balls.pop();
    }
}
function addballs(x,y,num){
    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j]==1){
                var newball={
                    x : x+(RADIUS+1)+j*2*(RADIUS+1),
                    y : y+(RADIUS+1)+i*2*(RADIUS+1),
                    g : 1.5+Math.random(),
                    vx :Math.pow(-1,Math.floor(Math.random()*100))*5,
                    vy : -Math.ceil(Math.random()*10),
                    color :colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(newball);
            }
}