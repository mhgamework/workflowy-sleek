// ==UserScript==
// @name         Workflowy-sleek-dev
// @namespace    http://getsleek.co/
// @version      0.2
// @description  Dev script for local development of the workflowy customization
// @author       MHGameWork
// @match        https://*workflowy.com/*
// @grant GM_addStyle
// @grant GM_getResourceText
// @resource css workflowy.css
// @require file://C:\_Data\Repositories\workflowy-sleek\workflowy.user.js
// ==/UserScript==

(function () {
    'use strict';
    GM_addStyle(GM_getResourceText("css"));
    console.log("dev");
})();