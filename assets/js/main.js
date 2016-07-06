/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

/* Here, you can define how fast the window should be animated */
var settings = {

        // Speed to resize panel.
                resizeSpeed: 600,

        // Speed to fade in/out.
                fadeSpeed: 300,

        // Size factor.
                sizeFactor: 17,

        // Minimum point size.
                sizeMin: 12,

        // Maximum point size.
                sizeMax: 18
    };


var $window = $(window),
    $body = $('body');

var isMobile = false,
    $body,
    $window = $(window),
    $main,
    $hbw,
    $footer,
    $wrapper,
    $nav,
    $form,
    hash,
    isLocked = false,
    activePanelId = null,
    firstPanelId = 'homeScreen',
    baseDomain = "",

    loggedInUserData,
    storedStoreData,
    storedUserData,
    currentGroup,
    pageRefreshed = true;


(function($) {
    // ********* Page Load Functions *************
	$window.on('load', function() {

		skel
			.breakpoints({
				desktop: '(min-width: 737px)',
				mobile: '(max-width: 736px)'
			})
			.viewport({
				breakpoints: {
					desktop: {
						width: 1080,
						scalable: false
					}
				}
			})


            $body = $('body');
            $main = $('#main');
            $hbw = $('html,body,window');
            $footer = $('#footer');
            $wrapper = $('#wrapper');
            $nav = $('#nav'), $nav_links = $nav.find('a');
            $form = $('form');
            hash = window.location.hash.substring(1);

            /* resize fonts and main-div*/
            function resizeElementsOfPage(){
                    var factor = ($window.width() * $window.height()) / (1440 * 900);
                    $body.css('font-size', Math.min(Math.max(Math.floor(factor * settings.sizeFactor), settings.sizeMin), settings.sizeMax) + 'pt');
                    $main.height($("article").first().outerHeight());
            }
    // Body.
            $body._resize = function() {
                    resizeElementsOfPage();
                    $body._reposition();
            };

            /* in case something loaded via ajax */
            setInterval(function() {
                    resizeElementsOfPage();
                    $body._reposition();
            }, 500);

            $body._reposition = function() {
                    if (skel.vars.touch && (window.orientation == 0 || window.orientation == 180)){
                            $wrapper.css('padding-top', Math.max((($window.height() - ($("article").first().outerHeight() + $footer.outerHeight())) / 2) - $nav.height(), 30) + 'px');
                    } else {
                            if(isMobile){
                                $wrapper.css('padding-top', ($("#titleBar").height()) + 'px')
                            } else {
                                $wrapper.css('padding-top', '40px')
                            }
                    }
            };



    // Nav Links.
            $nav_links.click(function(e) {
                    var href = $(this).attr('href'), id;

                    if (href.substring(0,1) == '#') {

                            e.preventDefault();
                            e.stopPropagation();

                            id = href.substring(1);
                            loadPage(href.substring(1))

                    }

            });

    // Window.
            $window
                    .resize(function() {
                            if (!isLocked)
                                $body._resize();
                    });

            $window
                    .on('orientationchange', function() {
                            if (!isLocked)
                                $body._reposition();

                    });

            if (skel.vars.IEVersion < 9)
                    $window
                            .on('resize', function() {
                                    $wrapper.css('min-height', $window.height());
                            });

    // Fix: Placeholder polyfill.
            $('form').placeholder();

    // Prioritize "important" elements on mobile.
            skel.on('+mobile -mobile', function() {
                    $.prioritize(
                            '.important\\28 mobile\\29',
                            skel.breakpoint('mobile').active
                    );
            });

            skel.on('+mobile', function() {
                    isMobile = true;
            });

    // CSS polyfills (IE<9).
            if (skel.vars.IEVersion < 9)
                    $(':last-child').addClass('last-child');

    // Init.
            $window
                    .trigger('resize');

            if (hash) {
                    loadPage(hash)
                } else {
                loadPage(firstPanelId)
            }

            $wrapper.fadeTo(400, 1.0);
	});

})(jQuery);

// ********* Off-Canvas Navigation. **************
function createNavbar(){

    // Title Bar.
        $(
            '<div id="titleBar">' +
                    '<a href="#navPanel" class="toggle"></a>' +
                    '<span class="title"> Yunity </span>' +
            '</div>'
        )
            .appendTo($body);

    // Navigation Panel.
        $(
            '<div id="navPanel">' +
                    '<nav>' +
                            $('#nav').navList() + //defined in util.js
                    '</nav>' +
            '</div>'
        )
            .appendTo($body)
            .panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    target: $body,
                    visibleClass: 'navPanel-visible'
            });

        // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
                if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
                        $('#titleBar, #navPanel, #page-wrapper')
                                .css('transition', 'none');

}

// ************** Functions for ajax Requests ***********************


    // when back / forward button is pressed
    $(window).bind("popstate", function(e) {
        var state = e.originalEvent.state;
        if(state) {
            location.reload();
        }
    });

   // when hash changed in URL
    $(window).bind('hashchange', function() {
        location.reload();
    });

// load new page with ajax
function loadPage(id){
        if(id == ""){
            return false;
        }

        var pageName = id.split("?")[0];

        instant = false;

    // Check lock state and determine whether we're already at the target.
        if (isLocked || activePanelId == pageName)
                return false;
    // Lock.
        isLocked = true;

    // Change nav link (if it exists).
        $nav_links.removeClass('active');
        $nav_links.filter('[href="#' + pageName + '"]').addClass('active');


        // Create new history object
        var pageURL = "#";
        if(id != firstPanelId){
            pageURL = "#" + id;
        }
        if(pageRefreshed){
            window.history.replaceState({"html":pageName, "pageTitle":pageName}, "", pageURL);
            pageRefreshed = false;
        } else {
            window.history.pushState({"html":pageName, "pageTitle":pageName}, "", pageURL);
        }

        setDocumentTitle(pageName.charAt(0).toUpperCase() + pageName.slice(1));
        $.ajax({
                url: "pages/" + pageName + ".html",
                method: 'GET',
                dataType: "html",
                success : function(data) {

            // Fade out active panel.
                    $footer.fadeTo(settings.fadeSpeed, 0.0001);
                    $("article").first().fadeOut(instant ? 0 : settings.fadeSpeed, function() {

                            // replace HTML of panel
                            $("#main").html(data.toString());
                            $("article").first().hide();

                            // Get Javascript for file
                            $.ajax({
                                    url: "pages/js/" + pageName + ".js",
                                    method: 'GET',
                                    dataType: "html",
                                    success : function(data) {
                                                // evaluate js code
                                                eval(data);

                                        }
                            });

                            // Set new active.
                            activePanelId = pageName;

                            // Force scroll to top.
                            $hbw.animate({
                                scrollTop: 0
                            }, settings.resizeSpeed, 'swing');

                            // Reposition.
                            $body._reposition();

                            // Resize main to height of new panel.
                            $main.animate({
                                    height: $("article").first().outerHeight()
                            }, instant ? 0 : settings.resizeSpeed, 'swing', function() {

                            // Fade in new active panel.
                                $footer.fadeTo(instant ? 0 : settings.fadeSpeed, 1.0);
                                $("article").first().fadeIn(instant ? 0 : settings.fadeSpeed, function() {

                                        // Unlock.
                                                isLocked = false;
                                                refreshJumplinks();
                                });
                            });

                    });
                }
        });
    }

// refresh the loadPage function of jumplinks, when they are added to the document later
function refreshJumplinks(){
    $('.jumplink').click(function(e) {
        var href = $(this).attr('href');

        if (href.substring(0,1) == '#') {
                e.preventDefault();
                e.stopPropagation();
                loadPage(href.substring(1));
        }
    });
}

/*********** Login Functions **********/

function loginUserError(data, status){
	alert("Error!");
}

// Renew all Icons - display login status
function updateLoggedInNavigations(){
    if(loggedInUserData["display_name"] == ""){
            // not logged in
            console.log("nicht eingeloggt");


            // change Desktop Nav
            $("#logStatus").removeClass("fa-sign-out");
            $("#logStatus").addClass("fa-sign-in").attr("href", "#login");
            $("#logStatus span").html("Login");

            $(".hideWhenLoggedOut").hide();

            // change Mobile Nav
            $("#navbar_logStatus").html('<i class="icon fa-sign-in" style="margin-right: .5em"></i><span class="indent-0">Login</span>');
            $("#navbar_logStatus").attr("href", "#login");
            $("#navbar_logStatus").attr("onclick", "");
    } else  {
            // logged in
            console.log("eingeloggt")

            // change Desktop Nav
            $("#logStatus").removeClass("fa-sign-in");
            $("#logStatus").addClass("fa-sign-out").attr("href", "#");
            $("#logStatus span").html("Logout");

            $(".hideWhenLoggedOut").show();

            // change Mobile Nav
            $("#navbar_logStatus").html('<i class="icon fa-sign-out" style="margin-right: .5em"></i><span class="indent-0">Logout</span>');
            $("#navbar_logStatus").attr("href", "#");
            $("#navbar_logStatus").attr("onclick", "logOut()");
    }
}

// get loggedIn status from server

/*
 *
 * @returns {int}
 */
function updateLoggedInStatus(){
	$.ajax({
                cache: false,
                url: baseDomain + "/api/auth/status/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    loggedInUserData = data;
                    updateLoggedInNavigations();
		}
	});
}
function logOut(){
    var csrftoken = getCookie("csrftoken");
    $.ajax({
            url: baseDomain + "/api/auth/logout/",
            method: 'POST',
            data: {"csrfmiddlewaretoken": csrftoken, "email": "", "password": ""},
            success : function() {
                        loggedInUserData["display_name"] = "";
                        if(isMobile){
                            location.reload();
                        }
                        updateLoggedInNavigations();
                }
    });
}

$( "#logStatus" ).click(function(e) {
    if(loggedInUserData["display_name"] != ""){
            logOut();
    }
});

function signUp(){
	var username = document.getElementById("signUp-username-input").value;
	var firstname = document.getElementById("signUp-firstname-input").value;
	var lastname = document.getElementById("signUp-lastname-input").value;
	var pw = document.getElementById("signUp-pw-input").value;
	var pwRepeat = document.getElementById("signUp-pwRepeat-input").value;
	var email = document.getElementById("signUp-email-input").value;
	$.post(baseDomain + "/api/users/",
			{
				display_name: username,
				first_name: firstname,
				last_name: lastname,
				email: email,
				password: pw
			},
			function(data, status){
				if(status){
					alert("Account erstellt!")
                                        loadPage("login")
				}
			})  .fail(function() {
				alert( "Falsches Passwort oder Falsche E-Mail Adresse!" );
			});
}

/***************** Other Functions **********/
/**
 * Shows the Notification Bubble at the Chat icon
 *
 * @param {number} notifNumber - The number of Notifications
 */
function updateChatNotifNumber(notifNumber){
    if(notifNumber == 0){
        $("#navChat").html('<span>Chat</span>')
    } else {
        $("#navChat").html('<div class="circle notification">'+notifNumber+'</div><span>Chat</span>')
    }
}

function confirmPickupJoin(pickupID, pickupListID){
    var csrftoken = getCookie("csrftoken");
    $.post(baseDomain + "/api/pickup-dates/" + pickupID + "/add/",
                    {
                            name: "",
                            description: "",
                            csrfmiddlewaretoken: csrftoken
                    },
                    function(data, status){
                            if(status){
                                    $("#" + pickupListID).pickupList("update");
                            }
    })
    .fail(function() {
        alert( "Couldn't join!" );
    });
}


function confirmPickupLeave(pickupID, pickupListID){
    var csrftoken = getCookie("csrftoken");
    $.post(baseDomain + "/api/pickup-dates/" + pickupID + "/remove/",
                    {
                            name: "",
                            description: "",
                            csrfmiddlewaretoken: csrftoken
                    },
                    function(data, status){
                            if(status){
                                    $("#" + pickupListID).pickupList("update");
                            }
    })
    .fail(function() {
        alert( "Couldn't leave pickup :O" );
    });
}


/**
 * checks if number is in array
 * @param {number} curNum
 * @param {Array|numbers} curArr
 * @returns {Boolean}
 */
function isNumberInArray(curNum, curArr){
    if (jQuery.inArray(curNum, curArr) == -1){
        return false;
    } else {
    return true;
    }
}

/**
 * @param {storeID} storeID
 * @returns {store}
 */
function getStoreData(storeID){
    return $.grep(storedStoreData, function(e){ return e.id == storeID; })[0];
}

/**
 * map user-array to their infos
 * @param {Array|userID} userIDs to be mapped
 * @returns {Array|users}
 */
function mapUserArray(curUserArray){
    return curUserArray.map(function(id) {
                return $.grep(storedUserData, function(e){ return e.id == id; })[0];
            });
}

/**
 * gets value of a cookie
 * @param {String} cookie name
 * @returns {String} cookie value
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
}

/**
 * Returns array of all GET URL variables
 * @returns {Array|urlVar}
 */
function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
}

/**
 * gets GET URL variable
 * @param {String} name
 * @returns {urlVar}
 */
function getUrlVar(name){
    return getUrlVars()[name];
}

/**
 * Gets all store data and saves it to "storedUserData"
 * @returns {undefined}
 */
function getAllUserData(){
	$.ajax({
                cache: false,
                url: baseDomain + "/api/users/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    storedUserData = data;
		}
	});
}

/**
 * Gets all store data and saves it to "storedStoreData"
 * @returns {undefined}
 */
function getAllStoreData(){
	$.ajax({
                cache: false,
                url: baseDomain + "/api/stores/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    storedStoreData = data;
		}
	});
}

/**
 * @param {groupID}
 * @returns {undefined}
 */
function joinGroup(groupID){
    var csrftoken = getCookie("csrftoken");

    	$.post(baseDomain + "/api/groups/" + groupID + "/join/",
			{
				name: "",
				description: "",
                                csrfmiddlewaretoken: csrftoken
			},
			function(data, status){
				if(status){
					alert("Gruppe beigetreten!")
                                        loadPage("homeScreen?groupID=" + groupID)
				}
	})
            .fail(function() {
                alert( "Konnte nicht beitreten..." );
            });
}

/**
 * Lets current user leave a Group 
 * @param {groupID}
 * @returns {undefined}
 */
function leaveGroup(groupID){
    var csrftoken = getCookie("csrftoken");
    $.post(baseDomain + "/api/groups/" + groupID + "/leave/",
                    {
                            name: "",
                            description: "",
                            csrfmiddlewaretoken: csrftoken
                    },
                    function(data, status){
                            if(status){
                                    location.reload();
                            }
    })
        .fail(function() {
            alert( "Gruppe verlassen nicht möglich..." );
        });
}

/**
 * Sets new Title for current page
 * @param {String} titleString
 * @returns {undefined}
 */
function setDocumentTitle(titleString){
    document.title = titleString + " | Yunity"
}

/************* Init Stuff ******/

$( document ).ready(function() {
        getAllUserData();
        getAllStoreData();


        createNavbar();
        $.ajaxSetup({
            xhrFields: {
		withCredentials: true
            }
        });
        updateLoggedInStatus();
});

