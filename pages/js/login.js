function loginUser(){
	
	var email = document.getElementById("login-email-input").value;;
	var pw = document.getElementById("login-pw-input").value;
        
        api.users.login({email: email, password: pw});
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

$('#login-loginButton').click(function (e) {
  loginUser();
});


$( document ).ready(function() {
    $('#login-email-input').focus();
});
	  		
