// ==UserScript==
// @name         Workflowy-sleek
// @namespace    http://getsleek.co/
// @version      0.3.0
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

	
	
	
	function do_parseImg() {
		$(this).nextAll(".content-img").remove();
		var lines = $(this).text().split("\n");
		var img_re = /^\!\[.*\]\((.+)\)$/;

		for (var i = 0; i < lines.length; i++) {
			var line = lines[i].trim();
			var img = line.match(img_re);
			if (img === null) {
				continue;
			}
			console.log(i, img[1]);
			$(this).after('<div class="content-img"><img src="' + img[1] + '"/></div>')
		}
	}

	function parseImg() {
		$("div.notes div.content").live("click keyup", do_parseImg);
		$("div.notes div.content").each(do_parseImg);
		$("#expandButton").live("click", function() {
			$("div.notes div.content").each(do_parseImg);
		});
	};

	$(window).bind("load hashchange", parseImg);
	
})();