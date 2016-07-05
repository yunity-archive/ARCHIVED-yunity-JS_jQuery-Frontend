

var recipients = [];
var currentRecipient = null;

function hideChatUsersPanel() {
    $("#chat-users").addClass("hidden");
    $("#chat-header-button").removeClass("hidden").click(function() {
        showChatUsersPanel();
    });
}

function showChatUsersPanel() {
    $("#chat-users").removeClass("hidden");
    $("#chat-header-button").addClass("hidden").click(function() {
        hideChatUsersPanel();
    });
}
                    
function getUsers() {
	$.ajax({
		url: baseDomain + "/api/users/",
		dataType: "json",
		success : function(data) {
                        recipients = data;
			updateRecipientsList();
                        
                        // Für Testzwecke auskommentiert
                        //updateMessages(true);
                        //scrollToBottomOfMessageContainer();
		}
	});
        /*recipients = [{"id":1,"display_name":"ml","first_name":"m","last_name":"l","email":"m@l.de"},{"id":2,"display_name":"Lars","first_name":"Lars","last_name":"Wolf","email":"lars.m.wolf@gmx.de"}];
	updateRecipientsList();*/
        return;
}

function changeCurrentRecipient(id){
	currentRecipient = id;
        updateRecipientsList();
        updateMessages(false);
}

function updateMessages(instant){
    $('#chat-messages').fadeOut(instant ? 0 : 200, function() {
       $('#chat-messages').html('<a class="button small chat-messages-button">I want more!</a>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, ');
       
       $('#chat-messages').fadeIn(instant ? 10 : 200, function(){
                scrollToBottomOfMessageContainer();
            });
    });
}    


function updateRecipientsList(){
	var chatUserString = "";
        if(!currentRecipient){
            currentRecipient = recipients[0]["id"];
        }
	recipients.forEach(function(entry, index) {
		if(recipients[index]["id"] == currentRecipient){
			chatUserString += '<div onclick="hideChatUsersPanel()" class="chat-user active">'+entry["display_name"]+'</div>';
		} else {
			chatUserString += '<div onclick="changeCurrentRecipient('+entry["id"]+'), hideChatUsersPanel()" class="chat-user">'+entry["display_name"]+'</div>';						
		}
	});
	document.getElementById("chat-users").innerHTML = chatUserString;
}

// Show Bottom of Chat-Message Div
function scrollToBottomOfMessageContainer(){
    var element = document.getElementById("chat-messages");
    element.scrollTop = element.scrollHeight;
}

$( document ).ready(function() {
    getUsers();
    updateChatNotifNumber(5);
    showChatUsersPanel();
});
	  		
