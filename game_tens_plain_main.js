// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//-- Глобальные переменные
//--

var APELSERG = {};

APELSERG.MAIN = {};
APELSERG.MODEL = {};
APELSERG.CANVA = {};
APELSERG.UI = {};
APELSERG.LANG = {};
APELSERG.CONFIG = {};
APELSERG.CONFIG.SET = {};
APELSERG.CONFIG.KEY = {};
APELSERG.CONFIG.PROC = {};
APELSERG.CONFIG.RESULT = {};

//===
// старт программы (начальная прорисовка)
//===
APELSERG.MAIN.OnLoad = function () {

    //-- определить место загрузки
    //--
    window.location.protocol == "file:" ? APELSERG.CONFIG.PROC.LoadFromWeb = false : APELSERG.CONFIG.PROC.LoadFromWeb = true;

    //-- инициализация
    //--
    APELSERG.CONFIG.GetConfigOnLoad();
    APELSERG.CONFIG.GetResultOnLoad();

    //-- сперва канва
    //--
    APELSERG.CONFIG.PROC.CanvaID = document.getElementById('APELSERG_CanvasTens');
    APELSERG.CONFIG.PROC.Ctx = APELSERG.CONFIG.PROC.CanvaID.getContext('2d');
    APELSERG.CONFIG.PROC.CanvaID.width = APELSERG.CONFIG.SET.CourtWidth;
    APELSERG.CONFIG.PROC.CanvaID.height = APELSERG.CONFIG.SET.CourtHeight;

    //-- потом ракетки
    //--
    APELSERG.CONFIG.PROC.Racket[0] = APELSERG.MODEL.GetRacket(0);
    APELSERG.CONFIG.PROC.Racket[1] = APELSERG.MODEL.GetRacket(1);

    //-- потом мяч (старт привязан к ракеткам)
    //--
    APELSERG.CONFIG.PROC.Ball = APELSERG.MODEL.GetBall();

    APELSERG.CANVA.CourtRewrite();
}

//===
// Обработка нажатий клавиш
//===
window.addEventListener('keydown', function (event) {

    //-- предотвратить срабатывание при "всплытии" клика
    //--
    document.getElementById("APELSERG_InputSettings").blur();
    document.getElementById("APELSERG_InputPoints").blur();
    document.getElementById("APELSERG_InputHelp").blur();

    if (event.keyCode == APELSERG.CONFIG.KEY.Pause) {
        APELSERG.MAIN.Pause();
    }    
    if (event.keyCode == APELSERG.CONFIG.KEY.Space) {
        APELSERG.MAIN.Start();
    }

    if (!APELSERG.CONFIG.PROC.GameStop && !APELSERG.CONFIG.PROC.GamePause) {

        //-- левые на левого, правые на правого
        //--
        if (APELSERG.CONFIG.SET.UserInGame[0] != 0 && APELSERG.CONFIG.SET.UserInGame[1] != 0) {
            
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftUp) {
                APELSERG.MODEL.RacketLeftShiftUp();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftDown) {
                APELSERG.MODEL.RacketLeftShiftDown();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftForward) {
                APELSERG.MODEL.RacketLeftShiftForward();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftBack) {
                APELSERG.MODEL.RacketLeftShiftBack();
            }

            if (event.keyCode == APELSERG.CONFIG.KEY.RightUp || event.keyCode == APELSERG.CONFIG.KEY.RightUpNum) {
                APELSERG.MODEL.RacketRightShiftUp();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.RightDown || event.keyCode == APELSERG.CONFIG.KEY.RightDownNum) {
                APELSERG.MODEL.RacketRightShiftDown();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.RightForward || event.keyCode == APELSERG.CONFIG.KEY.RightForwardNum) {
                APELSERG.MODEL.RacketRightShiftForward();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.RightBack || event.keyCode == APELSERG.CONFIG.KEY.RightBackNum) {
                APELSERG.MODEL.RacketRightShiftBack();
            }
        }
        //-- все на левого
        //--
        else if (APELSERG.CONFIG.SET.UserInGame[0] != 0 && APELSERG.CONFIG.SET.UserInGame[1] == 0) {

            if (event.keyCode == APELSERG.CONFIG.KEY.LeftUp || event.keyCode == APELSERG.CONFIG.KEY.RightUp || event.keyCode == APELSERG.CONFIG.KEY.RightUpNum) {
                APELSERG.MODEL.RacketLeftShiftUp();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftDown || event.keyCode == APELSERG.CONFIG.KEY.RightDown || event.keyCode == APELSERG.CONFIG.KEY.RightDownNum) {
                APELSERG.MODEL.RacketLeftShiftDown();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftForward || event.keyCode == APELSERG.CONFIG.KEY.RightBack || event.keyCode == APELSERG.CONFIG.KEY.RightBackNum) {
                APELSERG.MODEL.RacketLeftShiftForward();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftBack || event.keyCode == APELSERG.CONFIG.KEY.RightForward || event.keyCode == APELSERG.CONFIG.KEY.RightForwardNum) {
                APELSERG.MODEL.RacketLeftShiftBack();
            }
        }
        //-- все на правого
        //--
        else if (APELSERG.CONFIG.SET.UserInGame[0] == 0 && APELSERG.CONFIG.SET.UserInGame[1] != 0) {

            if (event.keyCode == APELSERG.CONFIG.KEY.LeftUp || event.keyCode == APELSERG.CONFIG.KEY.RightUp || event.keyCode == APELSERG.CONFIG.KEY.RightUpNum) {
                APELSERG.MODEL.RacketRightShiftUp();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftDown || event.keyCode == APELSERG.CONFIG.KEY.RightDown || event.keyCode == APELSERG.CONFIG.KEY.RightDownNum) {
                APELSERG.MODEL.RacketRightShiftDown();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftBack || event.keyCode == APELSERG.CONFIG.KEY.RightForward || event.keyCode == APELSERG.CONFIG.KEY.RightForwardNum) {
                APELSERG.MODEL.RacketRightShiftForward();
            }
            if (event.keyCode == APELSERG.CONFIG.KEY.LeftForward || event.keyCode == APELSERG.CONFIG.KEY.RightBack || event.keyCode == APELSERG.CONFIG.KEY.RightBackNum) {
                APELSERG.MODEL.RacketRightShiftBack();
            }
        }
    }
});

//===
// Старт
//===
APELSERG.MAIN.Start = function () {

    //-- закрыть окна (если открыты - должны закрыться)
    //--
    if (APELSERG.CONFIG.PROC.UiSettings) {
        APELSERG.UI.ShowSettings();
    }
    if (APELSERG.CONFIG.PROC.UiPoints) {
        APELSERG.UI.ShowPoints();
    }
    if (APELSERG.CONFIG.PROC.UiHelp) {
        APELSERG.UI.ShowHelp();
    }

    //-- обработать "пробел"
    //--
    if (!APELSERG.CONFIG.PROC.UiSettings && !APELSERG.CONFIG.PROC.UiPoints && !APELSERG.CONFIG.PROC.UiHelp) {

        if (APELSERG.CONFIG.PROC.GameStop) {

            //-- новая игра - инициализация
            //--
            APELSERG.CONFIG.PROC.GameStop = false;
            APELSERG.CONFIG.PROC.GamePause = false;

            //-- сперва ракетки
            //--
            APELSERG.CONFIG.PROC.Racket[0] = APELSERG.MODEL.GetRacket(0);
            APELSERG.CONFIG.PROC.Racket[1] = APELSERG.MODEL.GetRacket(1);

            //-- потом мяч (старт привязан к ракеткам и к набранным очкам - старт у выигравшей ракетки)
            //--
            APELSERG.CONFIG.PROC.Ball = APELSERG.MODEL.GetBall(); //-- перед сбросом очков (очки влияют на позицию - у выигравшей ракетки)

            //-- сброс очков в последнюю очередь
            //--
            APELSERG.CONFIG.PROC.Points[0] = 0;
            APELSERG.CONFIG.PROC.Points[1] = 0;

            APELSERG.CONFIG.PROC.GameStartCnt = APELSERG.CONFIG.PROC.GameStartDelay; //-- установить задержку старта
            APELSERG.MAIN.Animation(); //-- запуск рабочего цикла
        }
        else {
            if (APELSERG.CONFIG.PROC.GamePause) {
                APELSERG.CONFIG.PROC.GamePause = false; //-- отмена паузы
                APELSERG.MAIN.Animation(); //-- запуск рабочего цикла
            }
        }
    }
}

//===
// Пауза
//===
APELSERG.MAIN.Pause = function () {
    if (!APELSERG.CONFIG.PROC.GameStop) {
        if (APELSERG.CONFIG.PROC.GamePause) {
            APELSERG.CONFIG.PROC.GamePause = false;
            APELSERG.MAIN.Animation(); //-- запуск рабочего цикла
        }
        else {
            APELSERG.CONFIG.PROC.GamePause = true;
            APELSERG.CANVA.CourtRewrite();
        }
    }
}

//===
// Рабочий цикл таймера
//===
APELSERG.MAIN.Animation = function () {
    APELSERG.MODEL.UpdateBall(); //-- !!! окончание игры срабатывает здесь - устанавливается флаг при начислении очков (21)
    APELSERG.CANVA.CourtRewrite();
    if (!APELSERG.CONFIG.PROC.GameStop && !APELSERG.CONFIG.PROC.GamePause) {
        window.requestAnimationFrame(function () {
            APELSERG.MAIN.Animation();
        });
    }
}
