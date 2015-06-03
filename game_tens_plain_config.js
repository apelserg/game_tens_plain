"use strict";

APELSERG.CONFIG.SET.Version = "0-1-0"
APELSERG.CONFIG.SET.LocalStorageName = "APELSERG-TensPlain";

APELSERG.CONFIG.SET.BallSize = 20; //-- размер шарика (в пикселях)
APELSERG.CONFIG.SET.RacketHeight = 100; //-- 100, 150, 200
APELSERG.CONFIG.SET.RacketWidth = 20;

APELSERG.CONFIG.SET.CourtWidth = 600; //-- 600, 800, 1000 -- ширина корта (в пикселях)
APELSERG.CONFIG.SET.CourtHeight = 400; //-- 400, 500, 600 -- высота корта (в пикселях)

APELSERG.CONFIG.SET.StartSpeedX = 3;
APELSERG.CONFIG.SET.StartSpeedY = 1;

APELSERG.CONFIG.SET.UserName = ["Left", "Right"];
APELSERG.CONFIG.SET.UserInGame = [1, 1]; //-- 0 - нет, 1 - есть

APELSERG.CONFIG.SET.PointWin = 21; //-- должно быть 21 (меньше нужно для отладки)

APELSERG.CONFIG.SET.Lang = "EN"; //-- RU, EN

APELSERG.CONFIG.KEY.Space = 32;
APELSERG.CONFIG.KEY.Pause = 80;

APELSERG.CONFIG.KEY.LeftUp = 87; //-- W
APELSERG.CONFIG.KEY.LeftDown = 88; //-- X
APELSERG.CONFIG.KEY.LeftForward = 68; //-- D
APELSERG.CONFIG.KEY.LeftBack = 65; //-- A

APELSERG.CONFIG.KEY.RightUp = 38; //-- 8
APELSERG.CONFIG.KEY.RightDown = 40; //-- 2
APELSERG.CONFIG.KEY.RightForward = 37; //-- 4
APELSERG.CONFIG.KEY.RightBack = 39; //-- 6

APELSERG.CONFIG.KEY.RightUpNum = 104; //-- 8
APELSERG.CONFIG.KEY.RightDownNum = 98; //-- 2
APELSERG.CONFIG.KEY.RightForwardNum = 100; //-- 4
APELSERG.CONFIG.KEY.RightBackNum = 102; //-- 6


APELSERG.CONFIG.PROC.Ball;
APELSERG.CONFIG.PROC.Racket = [{}, {}];
APELSERG.CONFIG.PROC.Points = [0, 0];

APELSERG.CONFIG.PROC.GameStop = true;
APELSERG.CONFIG.PROC.GamePause = true;

APELSERG.CONFIG.PROC.GameStartDelay = 100; //-- задержка подачи (100 ~ 1 секунда)
APELSERG.CONFIG.PROC.GameStartCnt = 0;
APELSERG.CONFIG.PROC.RedCnt = [0, 0]; //-- число циклов красного корта

APELSERG.CONFIG.PROC.UiSettings = false; //-- для синхронизации интерфейса и режима игры
APELSERG.CONFIG.PROC.UiPoints = false; //-- для показа очков
APELSERG.CONFIG.PROC.UiHelp = false; //-- для показа помощи

APELSERG.CONFIG.PROC.LoadFromWeb = false; //-- HTML загружен с сети или локального диска (надо для сохранения результатов и конфигурации)

APELSERG.CONFIG.PROC.CanvaID;
APELSERG.CONFIG.PROC.Ctx;


APELSERG.CONFIG.RESULT.Best = [];


//===
// Получить имя хранения конфигурации
//===
APELSERG.CONFIG.GetLocalStorageConfigName = function () {
    return APELSERG.CONFIG.SET.LocalStorageName + "-Config-" + APELSERG.CONFIG.SET.Version;
}

//===
// Получить имя хранения результатов
//===
APELSERG.CONFIG.GetLocalStorageResultName = function () {
    return APELSERG.CONFIG.SET.LocalStorageName + "-Results";
}

//===
// Получить результаты
//===
APELSERG.CONFIG.GetResultOnLoad = function () {

    if (APELSERG.CONFIG.PROC.LoadFromWeb) {

        var resultName = APELSERG.CONFIG.GetLocalStorageResultName();

        //-- восстановить результаты из хранилища
        //--
        if (localStorage[resultName] !== undefined) {

            APELSERG.CONFIG.RESULT.Best = JSON.parse(localStorage[resultName]);
        }
    }
}

//===
// Получить конфигурацию
//===
APELSERG.CONFIG.GetConfigOnLoad = function () {

    if (APELSERG.CONFIG.PROC.LoadFromWeb) {

        var configName = APELSERG.CONFIG.GetLocalStorageConfigName();

        //-- восстановить конфигурацию из хранилища
        //--
        if (localStorage[configName] !== undefined) {
            APELSERG.CONFIG.SET = JSON.parse(localStorage[configName]);
        }
    }
}

//===
// Сохранить результат
//===
APELSERG.CONFIG.SetResult = function () {

    if (APELSERG.CONFIG.PROC.LoadFromWeb) {

        var resultName = APELSERG.CONFIG.GetLocalStorageResultName();

        var dateCurrent = new Date();
        var dateCurrentStr = dateCurrent.toJSON().substring(0, 10);

        var resultCurrent = {};

        if (APELSERG.CONFIG.PROC.Points[0] > APELSERG.CONFIG.PROC.Points[1]) {

            resultCurrent.NameWin = APELSERG.CONFIG.SET.UserName[0];
            resultCurrent.PointsWin = APELSERG.CONFIG.PROC.Points[0];
            resultCurrent.NameLost = APELSERG.CONFIG.SET.UserName[1];
            resultCurrent.PointsLost = APELSERG.CONFIG.PROC.Points[1];
        }
        else {
            resultCurrent.NameWin = APELSERG.CONFIG.SET.UserName[1];
            resultCurrent.PointsWin = APELSERG.CONFIG.PROC.Points[1];
            resultCurrent.NameLost = APELSERG.CONFIG.SET.UserName[0];
            resultCurrent.PointsLost = APELSERG.CONFIG.PROC.Points[0];
        }
        resultCurrent.Date = dateCurrentStr;

        APELSERG.CONFIG.RESULT.Best.unshift(resultCurrent); //-- вставить в начало
        if (APELSERG.CONFIG.RESULT.Best.length > 100) {
            APELSERG.CONFIG.RESULT.Best.pop(); //-- удалить с конца
        }

        localStorage[resultName] = JSON.stringify(APELSERG.CONFIG.RESULT.Best);
    }
}

//===
// Сброс результата
//===
APELSERG.CONFIG.ResetResult = function () {

    var resultName = APELSERG.CONFIG.GetLocalStorageResultName();

    localStorage.removeItem(resultName);

    APELSERG.CONFIG.RESULT.Best = [];

    if (APELSERG.CONFIG.PROC.UiPoints) {
        APELSERG.UI.ShowPoints();
    }
}

//===
// Сброс конфигурации
//===
APELSERG.CONFIG.ResetConfig = function () {

    var configName = APELSERG.CONFIG.GetLocalStorageConfigName();

    localStorage.removeItem(configName);

    if (APELSERG.CONFIG.PROC.UiSettings) {
        APELSERG.UI.ShowSettings();
    }

    document.getElementById('APELSERG_DivCanvas').innerHTML = APELSERG.LANG.GetText('RELOAD_PAGE');
}
