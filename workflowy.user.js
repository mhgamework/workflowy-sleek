// ==UserScript==
// @name         Workflowy-sleek
// @namespace    http://getsleek.co/
// @version      0.3.4
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

	function createButtonToToolbar(text){
		 var theNew = $('<div class="customMH button"><div class="topBarButtonTextContainer">'+text+'</div></div>');

        theNew.insertAfter($("#savedViewHUDButton"));
		return theNew;
	}
	
    function createButton(query){
        var theNew = createButtonToToolbar(query);

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
	
	function createImageBar(){
			var $imagebar = $("<div>")
		.addClass("customMH")
		.addClass("imageBar")
		.css({
			"position":"fixed",
			"left": "850px",
			"top": "100px",
			"width": "200px",
			"height": "100px",
			//"background-color": "white"
		});
		$("body").append($imagebar);
		return $imagebar;
	}
	
	var $imagebar = createImageBar();
	

    var imagesbtn$ = createButtonToToolbar("Images: Shown");
	createButton("@status OR #open-sprint");
	var imageCount = 0;
	
	var imageEnabled = true;
	imagesbtn$.click(function () {
		imageEnabled = !imageEnabled;
		imagesbtn$.text(imageEnabled ? "Images: Shown": "Images: Hidden");
		imagesbtn$.toggleClass("active", imageEnabled);
		showBar(imageCount > 0);
		/*var toSet = query;
		if ($("#searchBox").val() == toSet) {
			toSet = "";
			theNew.toggleClass("active", false);
		}
		else {
			theNew.toggleClass("active", true);
		}

		$("#searchBox").val(toSet);
		$("#searchBox").submit();*/
	});
	
	function showBar(enabled){
		enabled = imageEnabled && enabled;
		$("div.page.active").toggleClass("fixPageLeft",enabled);
		$imagebar.toggle(enabled);
	}


	
	
	
		
		
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
		imageCount +=1;
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
		imageCount = 0;
	  $("div.name div.content, div.notes div.content").each(function(i, node) {
		generateImagesForContentNode(node);
	  });

	  $("div.name a.contentLink, div.notes a.contentLink").each(function(i, node) {
		generateImagesForLinkNode(node);
	  });
	  $(".mhImg").filter(".mhImg"+(magicCounterGlobal-1)).remove();

	  // TODO: These currently need to be in this order because otherwise when
	  // there is a raw link  in the notes, it will be overwritten
	  
	  showBar(imageCount > 0);
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
	$(document).click(function(e) {
	  setTimeout(function() {
		checkForChanges();
	  }, 250);
	});
	
})();