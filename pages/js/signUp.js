


function signUp(){
    var pw = $("#signUp-pw-input").val();
    var pwRepeat = $("#signUp-pwRepeat-input").val();
    
    if(pw != pwRepeat){
        alert("Passwörter müssen übereinstimmen!")
        return;
    }
        
    api.users.signUp({
                display_name: $("#signUp-username-input").val(),
                first_name: $("#signUp-firstname-input").val(),
                last_name: $("#signUp-lastname-input").val(),
                email: $("#signUp-email-input").val(),
                password: pw
            });
}

$('#signUp-signUpButton').click(function (e) {
  signUp();
});



$( document ).ready(function() {
    $("#signUp-email-input").on('change', checkEMail());
});
	  		
