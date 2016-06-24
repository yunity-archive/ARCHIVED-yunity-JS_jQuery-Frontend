<!DOCTYPE HTML>
<!--
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title>Yunity MVP Frontend Idee</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
		<link rel="stylesheet" href="assets/css/main.css" />
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
		<!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]-->
	</head>
	<body>

		<!-- Wrapper-->
			<div id="wrapper">

				<!-- Nav -->
					<nav id="nav">
						<a href="#homeScreen" class="icon yunity-logo active"><span>FS-Darmstadt</span></a>
						<a href="#profile" class="icon fa-user"><span>You!</span></a>
						<a href="#store" class="icon fa-home"><span>Store</span></a>
						<a href="#chat" class="icon fa-comments" style="position: relative">
												<div class="circle notification">2</div><span>Chat</span></a>
						<a href="#about" class="icon fa-question-circle-o"><span>FAQ</span></a>
						<a href="#login" class="icon fa-sign-in "><span>Login</span></a>						
					</nav>

				<!-- Main -->
					<div id="main">

						<!-- Me -->
							<article id="homeScreen" class="panel">
								<header>
									<h1>Foodsharing Darmstadt</h1>
								</header>
								<div class="row">
									<div class="6u">
										<h4>Pick-Ups</h4>
										<div>22.06.2016</div>
										<div class="homeScreen-pickup">
											<div class="row">
												<div class="2u 12u(mobile) time">12:35</div>
												<div class="10u store">Arheilgener Backstübchen</div>
											</div>
											
											<div class="people"><a href="#profile" class="jumplink">Lars</a>, Flo...</div>
											<div class="button small join">join</div>					
										</div>
											
									</div>
									<div class="6u">
										<h4>Stores</h4>
										<a href="#store" class="jumplink"><div class="homeScreen-store">Aldi</div></a>
										<div class="homeScreen-store">Rewe-Center</div>
										<div class="homeScreen-store">Kaufland</div>
										<br/>
										<div class="button small" style="float: right">Create New Store</div>
									</div>
								</div>
							</article>

						<!-- Communities -->
						
							<article id="store" class="panel">
								<header>
									<h2 style="display: inline">Aldi</h2>
									<i style="display: inline; margin-left: 1em"class="icon fa-pencil"></i>
									<i style="display: inline; margin-left: .3em"class="icon fa-trash"></i>
								</header>
								<section>
									<div class="row">
										<div class="4u" style="height: 20em">
											<h3>Information</h3>
											<div style="padding: .3em; background-color: #F5F5F5; border-radius: 5px;">
												<table style="margin-top: 0.5em;">
													<tr><td><i class="icon fa-home"/></td><td>Thomas-Mann Platz 5<br/>64291 Darmstadt</td></tr>
												</table>
											</div>
											
											<div>
												<i class="icon fa-mobile"></i> - Manager:<br/>
												+49 178 5501902
											</div>
											<div>
												<i class="icon fa-mobile"></i> - Worker:<br/>
												+49 178 5501902
											</div>
										</div>
										<div class="8u" style="height: 4em">
											<h3 style="display:inline">Pick-Ups</h3><i style="display: inline; margin-left: 1em"class="icon fa-plus-circle"></i>
											<div class="homeScreen-pickup">
												<div class="row">
													<div class="2u 12u(mobile) time">12:35</div>
													<div class="10u store">Dienstag, 26.02.2016</div>
												</div>
												
												<div class="people"><a href="#profile" class="jumplink">Lars</a>, Flo...</div>
												<div class="button small join">join</div>					
											</div>
										</div>
									</div>
								</section>
							</article>

						<!-- Chat -->
							<article id="chat" class="panel">
								<header>
									<h2>Chat</h2>
								</header>
								<section>
									<div class="row">
										<div id="chat-users" class="4u" style="height: 20em">
											<div class="chat-user">
												Konnte keine Verbindung herstellen!
											</div>
										</div>
										<div class="8u" style="height: 16em">
											<div class="chat-message received">
												Hallo! Wie geht's?
											</div>
											<div class="chat-message sent">
												Gut! Und dir? a multi-saving and sharing platform for food, items, skills, transport, spaces...
								be part of the transformation and make change possible
											</div>
										
										
										</div>
										<div class="8u" style="height: 4em; padding: 2em">
											<div class="row">
												<textarea placeholder="Your message..." type="text" class="8u" style="height:3em; margin: 0.2em; padding: 0.1em; padding-left: 0.4em; border-radius: 3px 3px 3px 3px;"></textarea>
												<input  type="submit" class="3u" style="height:3em; margin: 0.2em;" value="reply"></input>
											</div>
										</div>
									</div>
								</section>
							</article>
							
							
						<!-- Profil -->
							<article id="profile" class="panel">
								<header>
									<img style="width: 7em" class="image left" src="/images/prof01.jpg"></img>
									<h2  style="display: inline;">Lars Wolf</h2><i onclick="isLoggedIn()" style="display: inline; margin-left: 1em"class="icon fa-pencil"></i>
									<p>Newbie</p>
								</header>
								<section>
									<div class="row">
										<div class="5u">
											<h3>Contact</h3>
											<table style="margin-top: 0.5em">
												<tr><td><h3 class="icon fa-mobile"/></td><td>+49 178 5501902</td></tr>
												<tr><td><h3 class="icon fa-envelope-o"/></td><td>lars.m.wolf@gmx.de</td></tr>
												<tr><td><h3 class="icon fa-home"/></td><td>Hofheim</td></tr>
											</table>
										</div>
										<div class="7u">
											<h4>Communities</h4>
											<div class="profile-community">Berlin</div>
											<a href="#homeScreen" class="jumplink"><div class="profile-community">Foodsharing Darmstadt</div></a>
											<div class="profile-community">Free-Your-Stuff Darmstadt</div>
										</div>
									</div>
								</section>
							</article>
							
							
						<!-- FAQ -->
							<article id="about" class="panel">
								<header>
									<h2>FAQ</h2>
								</header>
								<h3>Question</h3>
								<div>Answer</div>
							</article>
							
							
						<!-- Login -->
							<article id="login" class="panel" style="text-align: center">
								<header>
									<h2>Login</h2>
								</header>
								<div style="width: 100%">
									<form>
										<input id="login-email-input" style="margin: 1em;" type="text" placeholder="Username"></input>
										<input id="login-pw-input" style="margin: 1em;" type="text" placeholder="Password"></input>
									</form>
									<a style="background-color: #BBBBBB" class="button small jumplink" href="#signUp">Sign-Up</a>
									<a class="button small" onclick="loginUser()">Login</a>
								</div>
							</article>
							
						<!-- Sign-Up -->
							<article id="signUp" class="panel" style="text-align: center">
								<header>
									<h2>Sign Up</h2>
								</header>
								<form>
									<input id="signUp-username-input"  style="margin: 1em; width: 80%" type="text" placeholder="Username"></input>
									<input id="signUp-firstname-input"  style="margin: 1em; width: 80%" type="text" placeholder="First Name"></input>
									<input id="signUp-lastname-input"  style="margin: 1em; width: 80%" type="text" placeholder="Last Name"></input>
									
									<input id="signUp-pw-input"  style="margin: 1em; width: 80%" type="text" placeholder="Password"></input>
									<input id="signUp-pwRepeat-input"  style="margin: 1em; width: 80%" type="text" placeholder="Repeat Password"></input>
									<input id="signUp-email-input"  style="margin: 1em; width: 80%" type="text" placeholder="E-Mail"></input>
								</form>
								<a class="button small" onclick="signUp()" style="float:right">Sign Up</a>
							</article>

					</div>

				<!-- Footer -->
					<div id="footer">
						<ul class="copyright">
							<li>&copy; Untitled.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</div>

			</div>

		<!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/skel.min.js"></script>
			<script src="assets/js/skel-viewport.min.js"></script>
			<script src="assets/js/util.js"></script>
			<!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
			<script src="assets/js/main.js"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
			<script>


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
				$.ajax("https://localhost/api/auth/", {
				     method: 'POST',
				     data: {email: email, password: pw},
				     crossDomain: true,
				     success: loginUserSuccess,
				     error: loginUserError,
				     complete:function (xhr) {
							var cookieToSet=xhr.getResponseHeader('Connection');
							alert(cookieToSet);
							console.log(xhr)
				     }
				  });
			}

			
			function signUp(){
				var username = document.getElementById("signUp-username-input").value;
				var firstname = document.getElementById("signUp-firstname-input").value;
				var lastname = document.getElementById("signUp-lastname-input").value;
				var pw = document.getElementById("signUp-pw-input").value;
				var pwRepeat = document.getElementById("signUp-pwRepeat-input").value;
				var email = document.getElementById("signUp-email-input").value;
				$.post("https://dev.yunity.org/api/users/",
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
	  			    url: "https://localhost/api/users/",
	  			    dataType: "json",
	  			    success : function(data) {
	  			    	displayUsers(data);
	  			    }
  	  			});
  			    return;
	  		}

			// https://dev.yunity.org
			
			
			function isLoggedIn(){				  
  	  			$.ajax({
	  			    url: "https://localhost/api/auth/status",
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
  			    return;
				
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
			
	  		$( document ).ready(function() {
	  			getUsers();
	  			//isLoggedIn();
	  		});
	  		
			</script>

	</body>
</html>