
// adds a new Pickup to the Pickup list
function checkEMail(){
        console.log("change");
	/*var eMail = $("#signUp-email-input").val();
	if(eMail == ""){
		$("#signUp-notice-email").html("");
		return false;
	} else if (eMail.length < 3 || eMail.indexOf("@") == -1 || eMail.indexOf(".") == -1){
		$("#signUp-notice-email").html("Bitte gib eine gültige E-Mail Adresse an!");
		return false;
	}  else {
		//checkIfEmailExists();
		return false;
	}*/
}

$( document ).ready(function() {
    $("#signUp-email-input").on('change', checkEMail());
});
	  		
