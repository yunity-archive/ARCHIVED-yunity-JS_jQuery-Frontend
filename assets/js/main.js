/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function($) {
    
 	var settings = {

		// Speed to resize panel.
			resizeSpeed: 600,

		// Speed to fade in/out.
			fadeSpeed: 300,

		// Size factor.
			sizeFactor: 11.5,

		// Minimum point size.
			sizeMin: 15,

		// Maximum point size.
			sizeMax: 20

	};

	var $window = $(window);

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
			
            var	$body = $('body'),
                $main = $('#main'),
                $panels = $main.find('.panel'),
                $hbw = $('html,body,window'),
                $footer = $('#footer'),
                $wrapper = $('#wrapper'),
                $nav = $('#nav'), $nav_links = $nav.find('a'),
                $jumplinks = $('.jumplink'),
                $form = $('form'),
                panels = [],
                activePanelId = null,
                firstPanelId = 'homeScreen',
                isLocked = false,
                hash = window.location.hash.substring(1);

	   function loadPage(id){
                    instant = false
    
            // Check lock state and determine whether we're already at the target.
                    if (isLocked
                    ||	activePanelId == id)
                            return false;

            // Lock.
                    isLocked = true;

            // Change nav link (if it exists).
                    $nav_links.removeClass('active');
                    $nav_links.filter('[href="#' + id + '"]').addClass('active');

            // Change hash.
                    if (id == firstPanelId)
                            window.location.hash = '#';
                    else
                            window.location.hash = '#' + id;
                        		  
                    $.ajax({
                            url: "pages/" + id + ".html",
                            method: 'GET',
                            dataType: "html",
                            success : function(data) {
                                                            
                            // Add bottom padding.
                                var x = parseInt($wrapper.css('padding-top')) +
                                                $("article").first().outerHeight() +
                                                $nav.outerHeight() +
                                                $footer.outerHeight();

                                if (x > $window.height())
                                        $wrapper.addClass('tall');
                                else
                                        $wrapper.removeClass('tall');
                                    
                        // Fade out active panel.
                                $footer.fadeTo(settings.fadeSpeed, 0.0001);
                                $("article").first().fadeOut(instant ? 0 : settings.fadeSpeed, function() {

                                                 $("#main").html(data.toString());
                                                 $("article").first().hide();
                                                 eval($("#main script").first().innerHTML);
                                                 
                                        // Set new active.
                                                activePanelId = id;

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

                                                                        });
                                                        });

                                });
                            }
                    });


}		

				// Body.
					$body._resize = function() {
						var factor = ($window.width() * $window.height()) / (1440 * 900);
						$body.css('font-size', Math.min(Math.max(Math.floor(factor * settings.sizeFactor), settings.sizeMin), settings.sizeMax) + 'pt');
						$main.height($("article").first().outerHeight());
						$body._reposition();
					};

					$body._reposition = function() {
						if (skel.vars.touch && (window.orientation == 0 || window.orientation == 180))
							$wrapper.css('padding-top', Math.max((($window.height() - ($("article").first().outerHeight() + $footer.outerHeight())) / 2) - $nav.height(), 30) + 'px');
						else
							$wrapper.css('padding-top', ((($window.height() - $("article").first().height()) / 2) - $nav.height()) + 'px');
					};

				

				// Nav + Jumplinks.
					$nav_links.add($jumplinks).click(function(e) {
						var t = $(this), href = t.attr('href'), id;

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

// ************** Functions for ajax Requests ***********************

var baseDomain = "https://dev.yunity.org";

function loginUserSuccess(data, status, xhr){
	var cookieToSet=xhr.getResponseHeader('Connection');
	alert(cookieToSet);
	console.log(data)
	console.log(status)
	console.log(xhr)
}

function loginUserError(data, status){
	alert("Error!");
}
function loginUser(){
	
	var email = document.getElementById("login-email-input").value;;
	var pw = document.getElementById("login-pw-input").value;
	$.ajax(baseDomain + "/api/auth/", {
		 method: 'POST',
		 data: {email: email, password: pw},
		 crossDomain: true,
		 success: loginUserSuccess,
		 error: loginUserError
	  });
}


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
					alert("Eingeloggt!")
				}
			})  .fail(function() {
				alert( "Falsches Passwort oder Falsche E-Mail Adresse!" );
			});
}


function getUsers() {
	$.ajax({
		url: baseDomain + "/api/users/",
		dataType: "json",
		success : function(data) {
			displayUsers(data);
		}
	});
	return;
}

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



function isLoggedIn(){				  
	$.ajax({
                url: baseDomain + "/api/auth/status/",
		method: 'GET',
		dataType: "json",
		crossDomain: true,
		success : function(data) {
			if(data["display_name"] == ""){
				alert("nicht eingeloggt!");
			} else {
				alert("eingeloggt!");
				alert(data["display_name"])
			}
		}
	});
	
}

function displayUsers(data){
	var chatUserString = "";
	var firstOne = true;
	data.forEach(function(entry) {
		if(firstOne){
			chatUserString += '<div class="chat-user active">'+entry["display_name"]+'</div>';
			firstOne = false;
		} else {
			chatUserString += '<div class="chat-user">'+entry["display_name"]+'</div>';						
		}
	});
	document.getElementById("chat-users").innerHTML = chatUserString;
}

$( "#logStatus" ).click(function() {
    // add login / logout functionality here later
});


$( document ).ready(function() {   
        //isLoggedIn();
        updateChatNotifNumber(5)
        $.ajaxSetup({
            xhrFields: {
		withCredentials: true
            }
        });
});
	  		
