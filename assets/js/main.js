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
    $main,
    $hbw,
    $footer,
    $wrapper,
    $nav,
    $form,
    hash,
    isLocked = false,
    activePageName = null,
    firstPageName = 'homeScreen',
    baseDomain = "",

    loggedInUserData = {"isLoggedIn": false},
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
                loadPage(firstPageName)
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


// *************** History Changes ************

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

// ************** Functions for ajax Requests ***********************

// load new page with ajax
function loadPage(id){
        if(id == ""){
            return false;
        }

        var pageName = id.split("?")[0];

        instant = false;

    // Check lock state and determine whether we're already at the target.
        if (isLocked || activePageName == pageName)
                return false;
    // Lock.
        isLocked = true;

    // Change nav link (if it exists).
        $nav_links.removeClass('active');
        $nav_links.filter('[href="#' + pageName + '"]').addClass('active');


        // Create new history object
        var pageURL = "#";
        if(id != firstPageName){
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
                            activePageName = pageName;

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

/**
 * Stored Data - helpful to manage redundant ajax-requests
 * currently, all data is downloaded once, after it was required first.
 * Data can be refreshed with "storedData.refresh("whateverYouWantToRefresh")
 * 
 * @type functions
 */
var storedData = {
    getById: function(dataName, idValue){
        resultData = storedData.getByFunction(dataName, function(a){return a.id == idValue;});
        return resultData[0];
    },
    getByFunction: function(dataName, valueFunction){
        return $.grep(storedData.getAll(dataName), valueFunction);      
    },
    getAll: function(apiURL){
        var returnedData = storedData.getFromStorage(apiURL);
        if(returnedData != undefined){
            return returnedData;
        } else {
            var data =  $.ajax({
                    cache: true,
                    url: baseDomain + "/api/" + apiURL,
                    method: 'GET',
                    dataType: "json",
                    async: false
                }).responseJSON;
            storedData.updateStorageForItem(apiURL, data);
            return data;
        }
    },
    refresh: function(apiURL){
        api.get(apiURL, {
            success : function(data) {
                storedData.updateStorageForItem(apiURL, data);
            }
        });
    },    
    updateStorageForItem: function(itemName, data){
        console.log(data);
        storedData.storage[itemName] = data;
        console.log(storedData.storage);
    },
    getFromStorage: function(itemName){
        return storedData.storage[itemName];
    },
    storage: {}
};


/**
 * All API functions are defined here, so its easier to track and change according to backend changes
 * @type functions
 */
var api = {
    users: {
                updateLoggedInStatus: function(){
                api.get("auth/status/", {
                          success : function(data) {
                              loggedInUserData = data;
                              loggedInUserData.isLoggedIn = (loggedInUserData["display_name"] !== "");
                              console.log(loggedInUserData);
                              updateLoggedInNavigations();
                          }
                      });  
                },
                login: function(data){
                    console.log(data);
                    api.post("auth/", data, {
                            success: function(response) {
                                loggedInUserData = response;
                                loggedInUserData.isLoggedIn = true;
                                console.log(loggedInUserData);
                                updateLoggedInNavigations();
                                loadPage("homeScreen");
                            },
                            error: function (request, error) {
                                alert("Login failed!")
                            }
                    });        
                },
                logout: function(){
                    api.post("auth/logout/", {"email": "", "password": ""}, {           
                        success : function() {
                            loggedInUserData.isLoggedIn = false;
                            if(isMobile){
                                location.reload();
                            }
                            updateLoggedInNavigations();
                        }
                    });    
                },
                signUp: function(data){
                    api.post("users/", data, {           
                        success : function(){
                            alert("Account erstellt!");
                            loadPage("login");
                        },
                        error: function (request, error) {
                            alert("Couldn't create account!")
                        }
                    });    
                }  
    },
    pickups: {
                join: function(pickupID, pickupListID){
                    api.post("pickup-dates/" + pickupID + "/add/", {}, {
                        success: function(data, status){
                            if(status){
                                $("#" + pickupListID).pickupList("update");
                            }
                        }
                    });
                },
                leave: function(pickupID, pickupListID){
                    api.post("pickup-dates/" + pickupID + "/remove/", {}, {
                        success: function(data, status){
                            if(status){
                                $("#" + pickupListID).pickupList("update");
                            }
                        }
                    });
                }
    },
    groups: {
                join: function(groupID){
                    alert(groupID);
                    api.post("groups/" + groupID + "/join/", {}, {
                        success: function(data, status){
                            if(status){
                                    alert("Gruppe beigetreten!")
                                    storedData.refresh("groups");
                                    loadPage("homeScreen?groupID=" + groupID)
                            }
                        } 
                    });
                },
                leave: function(groupID){
                    api.post("groups/" + groupID + "/leave/", {}, {
                        success: function(data, status){
                            if(status){
                                    location.reload();
                            }
                        } 
                    });
                }
    },
    get: function(pathToGetFromApi, options){
        var defaultAjaxOptions = {
                url: baseDomain + "/api/" + pathToGetFromApi,
		method: 'GET',
		dataType: "json"
            };
        if(options !== undefined){
            defaultAjaxOptions = $.extend(defaultAjaxOptions, options);
        }
	$.ajax(defaultAjaxOptions);        
    },
    post: function(pathToPostInApi, data, options){
        if(loggedInUserData.isLoggedIn){
            var csrftoken = getCookie("csrftoken");
            data = $.extend(data, {"csrfmiddlewaretoken": csrftoken});
        }
        var defaultAjaxOptions = {
                url: baseDomain + "/api/" + pathToPostInApi,
                method: 'POST',
                data: data
                };
        if(options !== undefined){
            defaultAjaxOptions = $.extend(defaultAjaxOptions, options);
        }
        $.ajax(defaultAjaxOptions); 
    }
};


// Renew all Icons - display login status
function updateLoggedInNavigations(){
    if(loggedInUserData.isLoggedIn){
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
            $("#navbar_logStatus").attr("onclick", "api.users.logout()");
    } else  {
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
    }
}
$( "#logStatus" ).click(function(e) {
    if(loggedInUserData.isLoggedIn){
        api.users.logout();
    }
});


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

/**
 * checks if number is in array
 * @param {number} curNum
 * @param {Array|numbers} curArr
 * @returns {Boolean}
 */
function isNumberInArray(curNum, curArr){
    if ($.inArray(curNum, curArr) == -1){
        return false;
    } else {
    return true;
    }
}


/**
 * map user-array to their infos
 * @param {Array|userID} userIDs to be mapped
 * @returns {Array|users}
 */
function mapUserArray(curUserArray){
    return curUserArray.map(function(id) {
                return storedData.getById("users", id);
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
 * Sets new Title for current page
 * @param {String} titleString
 * @returns {undefined}
 */
function setDocumentTitle(titleString){
    document.title = titleString + " | Yunity"
}

/************* Init Stuff ******/

$( document ).ready(function() {
        api.users.updateLoggedInStatus();
        storedData.refresh("users");
        storedData.refresh("stores");
        storedData.refresh("groups");
        
        createNavbar();
        $.ajaxSetup({
            xhrFields: {
		withCredentials: true
            }
        });
});

