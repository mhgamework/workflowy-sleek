// ==UserScript==
// @name         Workflowy-sleek
// @namespace    http://getsleek.co/
// @version      0.2.1
// @description  Sleek customizations to workflowy
// @author       MHGameWork
// @match        https://*workflowy.com/*
// @grant GM_addStyle
// @grant GM_getResourceText
// @resource css workflowy.css
// ==/UserScript==

(function () {
    'use strict';
    GM_addStyle(GM_getResourceText("css"));
    $(".customMH").remove();

    function createButton(query){
        var theNew = $('<div class="customMH button"><div class="topBarButtonTextContainer">'+query+'</div></div>');

        theNew.insertAfter($("#savedViewHUDButton"));
        theNew.click(function () {
            var toSet = query;
            if ($("#searchBox").val() == toSet) {
                toSet = "";
                theNew.toggleClass("active", false);
            }
            else {
                theNew.toggleClass("active", true);
            }

            $("#searchBox").val(toSet);
            $("#searchBox").submit();
        });
    }

    createButton("@status OR #open-sprint");
    createButton("@status OR #open");

})();