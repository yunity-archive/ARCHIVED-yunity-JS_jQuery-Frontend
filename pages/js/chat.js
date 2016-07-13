

var recipientsa = storedData.getAll("users");
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
           

function changeCurrentRecipient(id){
	currentRecipient = id;
        updateRecipientsList();
        updateMessages(false);
        hideChatUsersPanel();
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
        if(!currentRecipient){
            currentRecipient = recipients[0]["id"];
        }
        $("#chat-users").html("");
	recipients.forEach(function(entry, index) {
		if(recipients[index]["id"] == currentRecipient){
			$("#chat-users").append('<a id="chat-chatUserButton' + recipients[index]["id"] + '" class="chat-user active">'+entry["display_name"]+'</a>');
                        $('#chat-chatUserButton' + recipients[index]["id"]).on("click", function(){hideChatUsersPanel();});
		} else {
			$("#chat-users").append('<a id="chat-chatUserButton' + recipients[index]["id"] + '" class="chat-user">'+entry["display_name"]+'</a>');						
                        $('#chat-chatUserButton' + recipients[index]["id"]).on("click", function(){changeCurrentRecipient(recipients[index]["id"]);});
            }
	});
}

// Show Bottom of Chat-Message Div
function scrollToBottomOfMessageContainer(){
    $("#chat-messages").scrollTop = $("#chat-messages").scrollHeight;
}

$( document ).ready(function() {
    /*updateRecipientsList();
    updateChatNotifNumber(5);
    showChatUsersPanel();*/
    
    $("#chat-chatWindow").chatWindowBig();
    var testData = [{"id": 1,"display_name": "Nick Sellen","first_name": "Nick","last_name": "Sellen","email": "yunity@nicksellen.co.uk"}, {"id": 1,"display_name": "Nick Sellen","first_name": "Nick","last_name": "Sellen","email": "yunity@nicksellen.co.uk"}];
    
    $("#chat-chatWindow").chatWindowBig("setRecipients", testData);
});
	  		
