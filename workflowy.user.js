// ==UserScript==
// @name         Workflowy-sleek
// @namespace    http://getsleek.co/
// @version      0.1.7
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
    console.log("Loaded");
    $(".customMH").remove();

    var theNew = $('<div class="customMH button"><div class="topBarButtonTextContainer">@status OR #open</div></div>');

    theNew.insertAfter($("#savedViewHUDButton"));
    theNew.click(function () {
        var toSet = "@status OR #open";
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
    /*theNew.css("display","block");
     theNew.css("float","left");*/

    /*  margin-left: -1px;
     padding: 8px 0;
     font-size: 13px;
     text-align: center;
     float: right;
     border-bottom: none;
     border-left: 1px solid #111;
     border-right: 1px solid #111;
     border-radius: 0;
     background-color: #555;
     position: relative;*/
    /*
     theNew.css("border-bottom","none");
     theNew.css("border-left","1px solid #111");
     theNew.css("border-right","1px solid #111");
     theNew.css("position","relative");
     theNew.css("background-color","#555");
     theNew.css("text-align","center");
     theNew.css("padding","8px 10px");
     theNew.css("color","white");
     theNew.css("font-family","'Helvetica Neue',Arial,sans-serif");
     theNew.css("font-size","13px");*/


    // Your code here...
})();