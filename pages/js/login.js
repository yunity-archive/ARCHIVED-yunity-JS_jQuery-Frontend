function loginUser(){
	
	var email = document.getElementById("login-email-input").value;;
	var pw = document.getElementById("login-pw-input").value;
	$.ajax(baseDomain + "/api/auth/", {
		 method: 'POST',
		 data: {email: email, password: pw},
		 crossDomain: true,
		 success: function(data) {
                    loggedInUserData = data;
                    updateLoggedInNavigations();
                    loadPage("homeScreen");
		},
		 error: loginUserError
	  });
}

$('#login-email-input').keypress(function (e) {
  if (e.which == 13) {
      $('#login-pw-input').focus();
  }
});

$('#login-pw-input').keypress(function (e) {
  if (e.which == 13) {
      loginUser();
  }
});

$( document ).ready(function() {
    $('#login-email-input').focus();
});
	  		
