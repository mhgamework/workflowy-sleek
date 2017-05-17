// ==UserScript==
// @name         Workflowy-sleek
// @namespace    http://getsleek.co/
// @version      0.3.1
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

	var $imagebar = $("<div>")
	.addClass("customMH")
	.addClass("imageBar")
	.css({
		"position":"fixed",
		"left": "1050px",
		"top": "100px",
		"width": "200px",
		"height": "100px",
		//"background-color": "white"
	});
	$("body").append($imagebar);
	
	
	
		
		
	var IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".bmp"];
	//var magicCounter = 0;
	var magicCounterGlobal = 0;
	function createImageNodeAfterNode($node, imgSrc) {
		var id = $node.parents(".project").first().attr("projectid");
		var imgId = "mhImg"+id;
		$("#"+imgId).remove();
	  //if ($node.parent().find(".content-img").length === 0) {
		var $div = $("<div>")
					  .addClass("content-img")
					  .css({
						"display": "hidden"
					  });
		//$div.data("magic",magicCounter);
		//magicCounter +=1;
		
		var $img = $("<img>")
					  .addClass("mhImg"+magicCounterGlobal)
					  .addClass("mhImg")
					  .attr("src", imgSrc)
					  .attr("id", imgId)
					  .css({
						"max-width": "100%",
						"max-height": "350px",
						//"position":"absolute"
					  });
		
		
		var $a = $("<a>")
					//.attr("href","#img"+magicCounter);
					
		$a.append($img);
		$imagebar.append($a);
		
		var $aPreview = $("<a>")
					  //.attr("href", "#_")
					  //.attr("id", "img"+magicCounter)
					  .addClass("lightbox");
		var $imgPreview = $("<img>")
					  .attr("src", imgSrc);

		$aPreview.append($imgPreview);
		$("body").append($aPreview);

		
		$a.click(function(){$aPreview.show();});
		$aPreview.click(function(){$aPreview.hide();});
		
		//$node.after($div);
	  //}
	}

	function generateImagesForContentNode(node) {
	  var $node = $(node);

	  var text = $node.text();

	  var markdownImageRegex = /\!\[.*\]\((.+)\)/;
	  var matcher = text.match(markdownImageRegex);
	  if (matcher !== null) {
		var imgSrc = matcher[1];
		createImageNodeAfterNode($node, imgSrc);
	  }
	}

	function generateImagesForLinkNode(node) {
	  var $node = $(node);

	  var url = $node.text();
	  var curExtension = url.substr(-4);
	  if (_.contains(IMAGE_EXTENSIONS, curExtension) && $node.parent().text()[0] !== "!") {
		createImageNodeAfterNode($node.parent(), url);
	  }
	}

	function checkForChanges() {
		magicCounterGlobal += 1;
	  $("div.name div.content, div.notes div.content").each(function(i, node) {
		generateImagesForContentNode(node);
	  });

	  $("div.name a.contentLink, div.notes a.contentLink").each(function(i, node) {
		generateImagesForLinkNode(node);
	  });
	  console.log("Removing "+(magicCounterGlobal-1));
	  $(".mhImg").filter(".mhImg"+(magicCounterGlobal-1)).remove();

	  // TODO: These currently need to be in this order because otherwise when
	  // there is a raw link  in the notes, it will be overwritten
	};

	// When the page finishes loading
	$(window).load(function () {
		checkForChanges();
	});

	// When you change nodes
	//window.onhashchange = checkForChanges;

	// When you press any keyboard key
	$(document).keydown(function(e) {
	  setTimeout(function() {
		checkForChanges();
	  }, 250);
	});
	
})();