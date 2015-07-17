﻿// ============================
// Разработчик: apelserg ; https://github.com/apelserg/
// Лицензия: WTFPL
// ============================

"use strict";

//===
// Применить изменения
//===
APELSERG.UI.ApplySettings = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiSettings) {

            APELSERG.CONFIG.SET.BallSize = parseInt(document.getElementById('APELSERG_BallSize').value);

            APELSERG.CONFIG.SET.CourtWidth = parseInt(document.getElementById('APELSERG_CourtWidth').value);
            APELSERG.CONFIG.SET.CourtHeight = parseInt(document.getElementById('APELSERG_CourtHeight').value);
            APELSERG.CONFIG.SET.RacketHeight = parseInt(document.getElementById('APELSERG_RacketHeight').value);

            APELSERG.CONFIG.SET.StartSpeedY = parseInt(document.getElementById('APELSERG_Level').value);
            APELSERG.CONFIG.SET.StartSpeedX = APELSERG.CONFIG.SET.StartSpeedY * 3;

            APELSERG.CONFIG.SET.Lang = document.getElementById('APELSERG_Lang').value;

            APELSERG.CONFIG.SET.UserName[0] = document.getElementById('APELSERG_UserNameL').value;
            APELSERG.CONFIG.SET.UserName[1] = document.getElementById('APELSERG_UserNameR').value;

            if (document.getElementById('APELSERG_UserInGameL').checked) {
                APELSERG.CONFIG.SET.UserInGame[0] = 1;
            }
            else {
                APELSERG.CONFIG.SET.UserInGame[0] = 0;
            }
            if (document.getElementById('APELSERG_UserInGameR').checked) {
                APELSERG.CONFIG.SET.UserInGame[1] = 1;
            }
            else {
                APELSERG.CONFIG.SET.UserInGame[1] = 0;
            }

            //-- закрыть окно
            //--
            document.getElementById('APELSERG_DivSettings').innerHTML = "";
            APELSERG.CONFIG.PROC.UiSettings = false;

            //-- сохранить новую конфигурацию
            //--
            var configName = APELSERG.CONFIG.GetLocalStorageConfigName();
            localStorage[configName] = JSON.stringify(APELSERG.CONFIG.SET);

            //-- переинициализация
            //--
            APELSERG.MAIN.OnLoad();

        }
    }
}

//===
// Показать окно настроек
//===
APELSERG.UI.ShowSettings = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiSettings) {
            document.getElementById('APELSERG_DivSettings').innerHTML = "";
        }
        else {
            document.getElementById('APELSERG_DivSettings').innerHTML = APELSERG.UI.GetHtmlDivSettings();

            document.getElementById('APELSERG_BallSize').value = APELSERG.CONFIG.SET.BallSize;
            document.getElementById('APELSERG_CourtWidth').value = APELSERG.CONFIG.SET.CourtWidth;
            document.getElementById('APELSERG_CourtHeight').value = APELSERG.CONFIG.SET.CourtHeight;
            document.getElementById('APELSERG_RacketHeight').value = APELSERG.CONFIG.SET.RacketHeight;
            document.getElementById('APELSERG_Level').value = APELSERG.CONFIG.SET.StartSpeedY;
            document.getElementById('APELSERG_Lang').value = APELSERG.CONFIG.SET.Lang;
            document.getElementById('APELSERG_UserNameL').value = APELSERG.CONFIG.SET.UserName[0];
            document.getElementById('APELSERG_UserNameR').value = APELSERG.CONFIG.SET.UserName[1];

            if (APELSERG.CONFIG.SET.UserInGame[0] == 0) {
                document.getElementById('APELSERG_UserInGameL').checked = false;
            }
            else {
                document.getElementById('APELSERG_UserInGameL').checked = true;
            }
            if (APELSERG.CONFIG.SET.UserInGame[1] == 0) {
                document.getElementById('APELSERG_UserInGameR').checked = false;
            }
            else {
                document.getElementById('APELSERG_UserInGameR').checked = true;
            }
        }

        APELSERG.CONFIG.PROC.UiSettings = !APELSERG.CONFIG.PROC.UiSettings;
    }
}

//===
// Показать окно очков
//===
APELSERG.UI.ShowPoints = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiPoints) {
            document.getElementById('APELSERG_DivPoints').innerHTML = "";
        }
        else {
            document.getElementById('APELSERG_DivPoints').innerHTML = APELSERG.UI.GetHtmlDivPoints();
        }
    }

    APELSERG.CONFIG.PROC.UiPoints = !APELSERG.CONFIG.PROC.UiPoints;
}

//===
// Показать окно помощи
//===
APELSERG.UI.ShowHelp = function () {

    if (APELSERG.CONFIG.PROC.GameStop) {

        if (APELSERG.CONFIG.PROC.UiHelp) {
            document.getElementById('APELSERG_DivHelp').innerHTML = "";
        }
        else {
            document.getElementById('APELSERG_DivHelp').innerHTML = APELSERG.UI.GetHtmlDivHelp();
        }
    }

    APELSERG.CONFIG.PROC.UiHelp = !APELSERG.CONFIG.PROC.UiHelp;
}


//===
// HTML помощи
//===
APELSERG.UI.GetHtmlDivHelp = function () {

    return APELSERG.LANG.GetHelp() + "<hr />";
}


//===
// HTML очков
//===
APELSERG.UI.GetHtmlDivPoints = function () {

    var tableHtml = APELSERG.LANG.GetText('NO_DATA');

    if (APELSERG.CONFIG.RESULT.Best[0] !== undefined)
    {
        tableHtml = "<table>";

        for (var n = 0; APELSERG.CONFIG.RESULT.Best.length > n; n++) {
            tableHtml += "<tr>";
            tableHtml += "<td>";
            tableHtml += (n + 1).toString();
            tableHtml += "</td>";
            tableHtml += "<td>";
            tableHtml += APELSERG.CONFIG.RESULT.Best[n].NameWin + " : " + APELSERG.CONFIG.RESULT.Best[n].NameLost;
            tableHtml += "</td>";
            tableHtml += "<td>";
            tableHtml += APELSERG.CONFIG.RESULT.Best[n].PointsWin + " : " + APELSERG.CONFIG.RESULT.Best[n].PointsLost;
            tableHtml += "</td>";
            tableHtml += "<td>";
            tableHtml += APELSERG.CONFIG.RESULT.Best[n].Date;
            tableHtml += "</td>";
            tableHtml += "</tr>";
        }
        tableHtml += "</table>";
        tableHtml += "<br/>";
        tableHtml += "<input type='button' value='" + APELSERG.LANG.GetText("RESET") + "' onclick='APELSERG.CONFIG.ResetResult();' />";
    }

    return tableHtml  + "<hr/>";
}


//===
// HTML настроек
//===
APELSERG.UI.GetHtmlDivSettings = function () {

    return "" +
    APELSERG.LANG.GetText("LABEL_NAME_LEFT") +
    "<input type='checkbox' id='APELSERG_UserInGameL' />" +
    "<input type='text' id='APELSERG_UserNameL' maxlength='10' size='10' />" +
    "" +
    APELSERG.LANG.GetText("LABEL_NAME_RIGHT") +
    "<input type='checkbox' id='APELSERG_UserInGameR' />" +
    "<input type='text' id='APELSERG_UserNameR' value='Noname' maxlength='10' size='10' />" +
    "" +
    APELSERG.LANG.GetText("LABEL_LANG") +
    "<select id='APELSERG_Lang'>" +
    "  <option value='EN'>EN</option>" +
    "  <option value='RU'>RU</option>" +
    "</select>" +
    "" +
    "<br />" +
    "<br />" +
    "" +
    APELSERG.LANG.GetText("LABEL_COURT_WIDTH") +
    "<select id='APELSERG_CourtWidth'>" +
    "  <option value='600'>600</option>" +
    "  <option value='800'>800</option>" +
    "  <option value='1000'>1000</option>" +
    "  <option value='1200'>1200</option>" +
    "</select>" +
    "" +
    APELSERG.LANG.GetText("LABEL_COURT_HEIGHT") +
    "<select id='APELSERG_CourtHeight'>" +
    "  <option value='400'>400</option>" +
    "  <option value='500'>500</option>" +
    "  <option value='600'>600</option>" +
    "  <option value='800'>800</option>" +
    "</select>" +
    "" +
    APELSERG.LANG.GetText("LABEL_RACKET_HEIGHT") +
    "<select id='APELSERG_RacketHeight'>" +
    "  <option value='100'>100</option>" +
    "  <option value='140'>140</option>" +
    "  <option value='200'>200</option>" +
    "</select>" +
    "" +
    APELSERG.LANG.GetText("LABEL_BALL_SIZE") +
    "<select id='APELSERG_BallSize'>" +
    "  <option value='10'>10</option>" +
    "  <option value='20'>20</option>" +
    "  <option value='30'>30</option>" +
    "  <option value='40'>40</option>" +
    "</select>" +
    "" +
    APELSERG.LANG.GetText("LABEL_LEVEL") +
    "<select id='APELSERG_Level'>" +
    "  <option value='1'>1</option>" +
    "  <option value='2'>2</option>" +
    "  <option value='3'>3</option>" +
    "  <option value='4'>4</option>" +
    "  </select>" +
    "" +
    "<br />" +
    "<br />" +
    "" +
    "<input type='button' value='" + APELSERG.LANG.GetText("SAVE") + "' onclick='APELSERG.UI.ApplySettings();' />" +
    "<input type='button' value='" + APELSERG.LANG.GetText("RESET") + "' onclick='APELSERG.CONFIG.ResetConfig();' />" +
    "" +
    "<hr />";
}