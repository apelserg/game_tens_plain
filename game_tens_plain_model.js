// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Базовый объект - мяч
//===
APELSERG.MODEL.Ball = function (ballX, ballY, dirX, dirY, speedX, speedY) {
    this.X = ballX;
    this.Y = ballY;
    this.Radius = APELSERG.CONFIG.SET.BallSize / 2;
    this.DirX = speedX * dirX; //-- направление и скорость по X
    this.DirY = speedY * dirY; //-- направление и скорость по Y
    this.DirXSpeedUp = 0; //-- ускорение по X
    this.DirYSpeedUp = 0; //-- ускорение по Y
}

//===
// Базовый объект - ракетка
//===
APELSERG.MODEL.Racket = function (rX, rY) {
    this.X = rX;
    this.Y = rY;
    this.Height = APELSERG.CONFIG.SET.RacketHeight;
    this.Width = APELSERG.CONFIG.SET.RacketWidth;
    this.MoveX = APELSERG.CONFIG.SET.RacketWidth;  //20;
    this.MoveY = APELSERG.CONFIG.SET.RacketHeight - (APELSERG.CONFIG.SET.RacketHeight / 5); //40;
}

//===
// Новый мяч
//===
APELSERG.MODEL.GetBall = function () {

    var ballX = 0;
    var ballY = 0;
    var dirX = 1;
    var dirY = 1;

    if ((APELSERG.CONFIG.PROC.Points[0] < APELSERG.CONFIG.PROC.Points[1])
        || (APELSERG.CONFIG.PROC.Points[0] == 0 && APELSERG.CONFIG.PROC.Points[1] == 0)
        && (APELSERG.CONFIG.SET.UserInGame[1] != 0)) {

        ballX = APELSERG.CONFIG.PROC.Racket[1].X - 60;
        ballY = APELSERG.CONFIG.PROC.Racket[1].Y;
    }
    else if (APELSERG.CONFIG.SET.UserInGame[0] != 0) {

        ballX = (APELSERG.CONFIG.PROC.Racket[0].X + 60);
        ballY = APELSERG.CONFIG.PROC.Racket[0].Y;
        dirX = -1;
    }
    else {
        ballX = APELSERG.CONFIG.SET.CourtWidth / 2;
        ballY = APELSERG.CONFIG.SET.CourtHeight / 2;
    }

    return new APELSERG.MODEL.Ball(ballX, ballY, dirX, dirY, APELSERG.CONFIG.SET.StartSpeedX, APELSERG.CONFIG.SET.StartSpeedY);
}

//===
// Новая ракетка
//===
APELSERG.MODEL.GetRacket = function (rType) {

    var rX = 2 * APELSERG.CONFIG.SET.RacketWidth;
    var rY = (APELSERG.CONFIG.SET.CourtHeight / 2) - (APELSERG.CONFIG.SET.RacketHeight / 2);

    if (rType == 1) {
        rX = APELSERG.CONFIG.SET.CourtWidth - 2 * APELSERG.CONFIG.SET.RacketWidth;
    }
    return new APELSERG.MODEL.Racket(rX, rY);
}

//===
// Получить случайное число из диапазона
//===
APELSERG.MODEL.GetRandomNumber = function (max) {

    return Math.round(Math.random() * max * 100) % max;
}

//===
// Переместить мяч
//===
APELSERG.MODEL.UpdateBall = function () {

    var ball = APELSERG.CONFIG.PROC.Ball;
    var racketL = APELSERG.CONFIG.PROC.Racket[0];
    var racketR = APELSERG.CONFIG.PROC.Racket[1];

    if(ball.X < APELSERG.CONFIG.SET.CourtWidth / 2) {

        //--  Отскок от левой ракетки
        //--
        if (APELSERG.CONFIG.SET.UserInGame[0] != 0) {
            if (((ball.X - ball.Radius) <= racketL.X)
              && ((ball.X - ball.Radius) >= (racketL.X - racketL.Width))
              && ((ball.Y + ball.Radius) >= racketL.Y)
              && ((ball.Y - ball.Radius) <= (racketL.Y + racketL.Height))
              && (ball.DirX < 0)) {

                APELSERG.MODEL.RacketBallKickback(ball, racketL);  //-- отскок от ракетки

                ball.X = racketL.X + ball.Radius;
                ball.DirX *= -1;
            }
        }

        //--  Отскок от левой стороны корта
        //--
        if (ball.X <= ball.Radius) {

            ball.X = ball.Radius;
            ball.DirX *= -1;

            APELSERG.CONFIG.PROC.Points[1]++; //-- очко другой стороне

            if (APELSERG.CONFIG.SET.UserInGame[0] != 0) { //-- красный
                APELSERG.CONFIG.PROC.RedCnt[0] = 30;
            }
        }
    }
    else {
        //--  Отскок от правой ракетки
        //--
        if (APELSERG.CONFIG.SET.UserInGame[1] != 0) {
            if (((ball.X + ball.Radius) >= racketR.X)
              && ((ball.X + ball.Radius) <= (racketR.X + racketR.Width))
              && ((ball.Y + ball.Radius) >= racketR.Y)
              && ((ball.Y - ball.Radius) <= (racketR.Y + racketR.Height))
              && (ball.DirX > 0)) {

                APELSERG.MODEL.RacketBallKickback(ball, racketR); //-- отскок от ракетки

                ball.X = racketR.X - ball.Radius;
                ball.DirX *= -1;
            }
        }

        //--  Отскок от правой стороны корта
        //--
        if (ball.X >= (APELSERG.CONFIG.SET.CourtWidth - ball.Radius)) {

            ball.X = APELSERG.CONFIG.SET.CourtWidth - ball.Radius;
            ball.DirX *= -1;

            APELSERG.CONFIG.PROC.Points[0]++; //-- очко другой стороне

            if(APELSERG.CONFIG.SET.UserInGame[1] != 0) { //-- красный
                APELSERG.CONFIG.PROC.RedCnt[1] = 30;
            }
        }
    }

    if (ball.Y < APELSERG.CONFIG.SET.CourtHeight / 2) {

        //--  Отскок от верха корта
        //--
        if (ball.Y <= ball.Radius) {
            ball.Y = ball.Radius;
            ball.DirY *= -1;
        }
    }
    else {
        //--  Отскок от низа корта
        //--
        if (ball.Y >= (APELSERG.CONFIG.SET.CourtHeight - ball.Radius)) {
            ball.Y = APELSERG.CONFIG.SET.CourtHeight - ball.Radius;
            ball.DirY *= -1;
        }
    }

    //-- игра завершена?
    //--
    if ((APELSERG.CONFIG.PROC.Points[0] >= APELSERG.CONFIG.SET.PointWin || APELSERG.CONFIG.PROC.Points[1] >= APELSERG.CONFIG.SET.PointWin)
        && (Math.abs(APELSERG.CONFIG.PROC.Points[0] - APELSERG.CONFIG.PROC.Points[1]) > 1)
        && (APELSERG.CONFIG.SET.UserInGame[0] != 0 && APELSERG.CONFIG.SET.UserInGame[1] != 0)) {

        APELSERG.CONFIG.PROC.GameStop = true;
        APELSERG.CONFIG.SetResult();
    }
    else {
        //-- движение мяча
        //--
        if (APELSERG.CONFIG.PROC.GameStartCnt == 0) {
            if (ball.DirX > 0) {
                ball.X += ball.DirX + ball.DirXSpeedUp;
            }
            else {
                ball.X += ball.DirX - ball.DirXSpeedUp;
            }

            if (ball.DirY > 0) {
                ball.Y += ball.DirY + ball.DirYSpeedUp;;
            }
            else {
                ball.Y += ball.DirY - ball.DirYSpeedUp;;
            }
        }
        else {
            APELSERG.CONFIG.PROC.GameStartCnt--;
        }
    }

}

//===
// Отскок от ракетки
//===
APELSERG.MODEL.RacketBallKickback = function (ball, racket) {

    var racketCenter = racket.MoveY / 4;
    var racketMiddle = racket.MoveY / 3;

    var speedUpX = APELSERG.MODEL.GetRandomNumber(5);
    var speedUpY = APELSERG.MODEL.GetRandomNumber(5);

    var dirMove = 1;

    if ((speedUpX - speedUpY) > 0) {
        dirMove *= -1;
    }

    ball.DirXSpeedUp = 0;
    ball.DirYSpeedUp = 0;

    //-- центр ракетки
    //--
    if (ball.Y > (racket.Y + racket.Height / 2 - racketCenter) && ball.Y < (racket.Y + racket.Height / 2 + racketCenter)) {
        ball.DirXSpeedUp += 2 * speedUpX;
        ball.DirYSpeedUp += 2 * speedUpY;
        ball.DirY *= dirMove;
    }
    else if (ball.Y > (racket.Y + racket.Height / 2 - racketMiddle) && ball.Y < (racket.Y + racket.Height / 2 + racketMiddle)) {
        ball.DirXSpeedUp += speedUpX;
        ball.DirYSpeedUp += speedUpY;
        ball.DirY *= dirMove;
    }

    //-- бок ракетки
    //-- при попадании в бок ракетки можно отбить или "проиграть" (закомментировано)
    //--
    if (ball.Y < racket.Y || ball.Y > (racket.Y + racket.Height)) {

        ball.DirXSpeedUp += speedUpX;
        ball.DirYSpeedUp += 2 * speedUpY;
        ball.DirY *= -1;
    }
}

//===
// Сместить левую ракетку по горизонтали вверх
//===
APELSERG.MODEL.RacketLeftShiftUp = function () {

    var racket = APELSERG.CONFIG.PROC.Racket[0];

    if(racket.Y > 0) {
         racket.Y -= racket.MoveY;
    }
}

//===
// Сместить левую ракетку по горизонтали вниз
//===
APELSERG.MODEL.RacketLeftShiftDown = function () {

    var racket = APELSERG.CONFIG.PROC.Racket[0];

    if((racket.Y + racket.Height) < APELSERG.CONFIG.SET.CourtHeight) {
         racket.Y += racket.MoveY;
    }
}

//===
// Сместить левую ракетку вперед
//===
APELSERG.MODEL.RacketLeftShiftForward = function () {

    var racket = APELSERG.CONFIG.PROC.Racket[0];

    if (racket.X < ((APELSERG.CONFIG.SET.CourtWidth / 2) - APELSERG.CONFIG.SET.RacketWidth)) {
         racket.X += racket.MoveX;
    }
}

//===
// Сместить левую ракетку назад
//===
APELSERG.MODEL.RacketLeftShiftBack = function () {

    var racket = APELSERG.CONFIG.PROC.Racket[0];

    if((racket.X - racket.Width) > 0) {
         racket.X -= racket.MoveX;
    }
}

//===
// Сместить правую ракетку по горизонтали вверх
//===
APELSERG.MODEL.RacketRightShiftUp = function () {

    var racket = APELSERG.CONFIG.PROC.Racket[1];

    if(racket.Y > 0) {
         racket.Y -= racket.MoveY;
    }
}

//===
// Сместить правую ракетку по горизонтали вниз
//===
APELSERG.MODEL.RacketRightShiftDown = function () {

    var racket = APELSERG.CONFIG.PROC.Racket[1];

    if((racket.Y + racket.Height) < APELSERG.CONFIG.SET.CourtHeight) {
         racket.Y += racket.MoveY;
    }
}

//===
// Сместить правую ракетку вперед
//===
APELSERG.MODEL.RacketRightShiftForward = function () {

    var racket = APELSERG.CONFIG.PROC.Racket[1];

    if (racket.X > ((APELSERG.CONFIG.SET.CourtWidth / 2) + APELSERG.CONFIG.SET.RacketWidth)) {
         racket.X -= racket.MoveX;
    }
}

//===
// Сместить правую ракетку назад
//===
APELSERG.MODEL.RacketRightShiftBack = function () {

    var racket = APELSERG.CONFIG.PROC.Racket[1];

    if((racket.X + racket.Width) < APELSERG.CONFIG.SET.CourtWidth) {
         racket.X += racket.MoveX;
    }
}

