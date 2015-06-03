"use strict";

//===
// Полная отрисовка
//===
APELSERG.CANVA.CourtRewrite = function () {
    
    var ctx = APELSERG.CONFIG.PROC.Ctx;

    //-- Корт
    //--
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, APELSERG.CONFIG.SET.CourtWidth, APELSERG.CONFIG.SET.CourtHeight);

    //-- Разметка
    //--
    var lineWidth = 5;
    var lineOffset = lineWidth - 1;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "silver";
    ctx.rect(lineOffset, lineOffset, (APELSERG.CONFIG.SET.CourtWidth / 2) - lineOffset, APELSERG.CONFIG.SET.CourtHeight - (lineOffset * 2));
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "silver";
    ctx.rect(APELSERG.CONFIG.SET.CourtWidth / 2, lineOffset, (APELSERG.CONFIG.SET.CourtWidth / 2) - lineOffset, APELSERG.CONFIG.SET.CourtHeight - (lineOffset * 2));
    ctx.stroke();

    //-- Мяч
    //--
    APELSERG.CANVA.BallRewrite(ctx);
     
    //-- Ракетки
    //--
    APELSERG.CANVA.RacketRewrite(ctx);
    
    //-- Обратный отсчёт задаржки
    //--
    if (APELSERG.CONFIG.PROC.GameStartCnt > 0) {

        ctx.font = (40).toString() + "px Arial"; //ctx.font = "30px Arial";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.fillText(APELSERG.CONFIG.PROC.GameStartCnt.toString(), APELSERG.CONFIG.SET.CourtWidth / 2, APELSERG.CONFIG.SET.CourtHeight / 2);
    }

    //-- Пауза
    //--
    if (APELSERG.CONFIG.PROC.GamePause && !APELSERG.CONFIG.PROC.GameStop) {
        APELSERG.CANVA.TextRewrite(ctx, APELSERG.LANG.GetText("PAUSE"));
    }

    //-- Стоп
    //--
    if (APELSERG.CONFIG.PROC.GameStop) {
        APELSERG.CANVA.TextRewrite(ctx, APELSERG.LANG.GetText("STOP"));
    }

    //-- Инфо
    //--
    APELSERG.CANVA.InfoRewrite(ctx);
}

//===
// Мяч
//===
APELSERG.CANVA.BallRewrite = function (ctx) {

    var ball = APELSERG.CONFIG.PROC.Ball;

    ctx.beginPath();
    ctx.arc(ball.X, ball.Y, ball.Radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'yellow';
    ctx.fill();
}


//===
// Ракетки
//===
APELSERG.CANVA.RacketRewrite = function (ctx) {
    
    var racketL = APELSERG.CONFIG.PROC.Racket[0];
    var racketR = APELSERG.CONFIG.PROC.Racket[1];
    
    if (APELSERG.CONFIG.SET.UserInGame[0] != 0) {
        ctx.fillStyle = 'darkblue';
        if (APELSERG.CONFIG.PROC.RedCnt[0] > 0) { //-- красная ракетка
            APELSERG.CONFIG.PROC.RedCnt[0]--;
            ctx.fillStyle = "red";
        }
        ctx.fillRect(racketL.X, racketL.Y, -(racketL.Width), racketL.Height);
    }

    if (APELSERG.CONFIG.SET.UserInGame[1] != 0) {
        ctx.fillStyle = 'darkblue';
        if (APELSERG.CONFIG.PROC.RedCnt[1] > 0) { //-- красная ракетка
            APELSERG.CONFIG.PROC.RedCnt[1]--;
            ctx.fillStyle = "red";
        }
        ctx.fillRect(racketR.X, racketR.Y, racketR.Width, racketR.Height);
    }
}

//===
// Текст
//===
APELSERG.CANVA.TextRewrite = function (ctx, strText) {

    var fontHight = APELSERG.CONFIG.SET.BallSize;

    if (fontHight < 20) {
        fontHight = 20;
    }
    if (fontHight > 30) {
        fontHight = 30;
    }

    ctx.font = fontHight.toString() + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(strText, APELSERG.CONFIG.SET.CourtWidth / 2, APELSERG.CONFIG.SET.CourtHeight / 2);
}

//===
// Инфо
//===
APELSERG.CANVA.InfoRewrite = function (ctx) {

    var fontHight = APELSERG.CONFIG.SET.BallSize;

    if (fontHight < 20) {
        fontHight = 20;
    }
    if (fontHight > 30) {
        fontHight = 30;
    }

    var strText = APELSERG.CONFIG.SET.UserName[0] + " : " + APELSERG.CONFIG.PROC.Points[0];
    strText += "                        ";
    strText += APELSERG.CONFIG.SET.UserName[1] + " : " + APELSERG.CONFIG.PROC.Points[1];

    ctx.font = fontHight.toString() + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(strText, APELSERG.CONFIG.SET.CourtWidth / 2, APELSERG.CONFIG.SET.CourtHeight - 20);
}
