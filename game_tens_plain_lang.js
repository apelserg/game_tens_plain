﻿// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Получить текст на выбранном языке
//===
APELSERG.LANG.GetText = function (keyText) {

    if (APELSERG.CONFIG.SET.Lang == "EN") {
        if (keyText == "YES") return "Yes";
        if (keyText == "NO") return "No";
        if (keyText == "CANCEL") return "Cancel";
        if (keyText == "STOP") return "STOP";
        if (keyText == "PAUSE") return "PAUSE";
        if (keyText == "SAVE") return "Save";
        if (keyText == "RESET") return "Reset";
        if (keyText == "RELOAD_PAGE") return "Reload page";
        if (keyText == "NO_DATA") return "No data";
        if (keyText == "LABEL_NAME") return "Name";
        if (keyText == "LABEL_NAME_LEFT") return "Left gamer";
        if (keyText == "LABEL_NAME_RIGHT") return "Right gamer";
        if (keyText == "LABEL_LANG") return "Lang";
        if (keyText == "LABEL_COURT_WIDTH") return "Width";
        if (keyText == "LABEL_COURT_HEIGHT") return "Height";
        if (keyText == "LABEL_RACKET_HEIGHT") return "Racket";
        if (keyText == "LABEL_LEVEL") return "Level";
        if (keyText == "LABEL_BALL_SIZE") return "Ball";
        return "== ? EN ? ==";
    }

    if (APELSERG.CONFIG.SET.Lang == "RU") {
        if (keyText == "YES") return "Да";
        if (keyText == "NO") return "Нет";
        if (keyText == "CANCEL") return "Отмена";
        if (keyText == "STOP") return "СТОП";
        if (keyText == "PAUSE") return "ПАУЗА";
        if (keyText == "SAVE") return "Сохранить";
        if (keyText == "RESET") return "Сбросить";
        if (keyText == "RELOAD_PAGE") return "Перегрузите страницу";
        if (keyText == "NO_DATA") return "Нет данных";
        if (keyText == "LABEL_NAME") return "Имя";
        if (keyText == "LABEL_NAME_LEFT") return "Игрок слева";
        if (keyText == "LABEL_NAME_RIGHT") return "Игрок справа";
        if (keyText == "LABEL_LANG") return "Язык";
        if (keyText == "LABEL_COURT_WIDTH") return "Ширина";
        if (keyText == "LABEL_COURT_HEIGHT") return "Глубина";
        if (keyText == "LABEL_RACKET_HEIGHT") return "Ракетка";
        if (keyText == "LABEL_LEVEL") return "Уровень";
        if (keyText == "LABEL_BALL_SIZE") return "Мяч";
        return "== ? RU ? ==";
    }

    return "== ? No lang ? ==";
}


//===
// Получить помощь на выбранном языке
//===
APELSERG.LANG.GetHelp = function () {

    if (APELSERG.CONFIG.SET.Lang == "EN") {

        return "" +
            "<h3>Game</h3>" +
            "<pre>" +
            "Start - [space] <br/>" +
            "Stop - winning, page reload <br/>" +
            "Pause - [P] <br/>" +
            "Cancel pause - [P], [space] <br/>" +
            "Left gamer - [W], [X], [A], [D] <br/>" +
            "Right gamer - [arrows], [numeric pad] <br/>" +
            "One gamer mode - training without winning and results <br/>" +
            "Full screen mode on/off - [F11] for most browsers <br/>" +
            "</pre>" +
            "" +
            "<h3>Top buttons</h3>" +
            "<pre>" +
            "Settings, Best results, Help <br/>" +
            "Available when [Stop] <br/>" +
            "Press [space] - windows closed, game begins <br/>" +
            "</pre>" +
            "" +
            "<h3>Offline mode</h3>" +
            "<pre>" +
            "Load from web server - Offline mode must be already installed <br/>" +
            "Load from local disk - does not work save the settings and results <br/>" +
            "</pre>" +
            "" +
            "<h3>Problems</h3>" +
            "<pre>" +
            "1. Update your browser to the latest version <br/>" +
            "2. Try a different browser <br/>" +
            "</pre>";

    }

    if (APELSERG.CONFIG.SET.Lang == "RU") {
        return "" +
            "<h3>Игра</h3>" +
            "<pre>" +
            "Старт - [пробел] <br/>" +
            "Стоп - выигрыш, перезагрузка страницы <br/>" +
            "Пауза - [P] <br/>" +
            "Отменить паузу - [P], [пробел] <br/>" +
            "Левый игрок - [W], [X], [A], [D] <br/>" +
            "Правый игрок - [стрелки], [цифровая клавиатура] <br/>" +
            "Режим одного игрока - тренировка без победы и результата <br/>" +
            "Полноэкранный режим вкл/выкл - [F11] для большинства браузеров <br/>" +
            "</pre>" +
            "" +
            "<h3>Кнопки сверху</h3>" +
            "<pre>" +
            "Настройка, 100 последних результатов, Подсказка <br/>" +
            "Доступны в режиме [Стоп] <br/>" +
            "При нажатии [пробел] - окна закрываются, начинается игра <br/>" +
            "</pre>" +
            "" +
            "<h3>Автономная работа</h3>" +
            "<pre>" +
            "С веб-сервера - автономный режим должен быть уже установлен <br/>" +
            "С локального диска - не работает сохранение настроек и результатов <br/>" +
            "</pre>" +
            "" +
            "<h3>Проблемы</h3>" +
            "<pre>" +
            "1. Обновить браузер до последней версии <br/>" +
            "2. Попробовать другой браузер <br/>" +
            "</pre>";
    }

    return "== ? No help ? ==";
}
