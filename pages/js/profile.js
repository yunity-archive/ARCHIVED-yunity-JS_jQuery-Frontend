
var displayCurrentUser = true;

function showUserData(data){
    console.log(data)
    $("#profile-name-header").html(data["first_name"] + " " + data["last_name"]);
    $("#profile-name-subheader").html(data["display_name"]);
    $("#profile-content-email").html(data["email"]);    
}

function getAndShowUserData(userID){
        $.ajax({
                cache: false,
                url: baseDomain + "/api/users/" + userID + "/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    showUserData(data);
		}
            });
}

function getAllCommunitiesForUser(userID){
        $.ajax({
                cache: false,
                url: baseDomain + "/api/groups/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    displayCommunitiesForUser(userID, data);
		}
            });    
}




function displayCommunitiesForUser(userID, data){
    data.forEach(function(entry) {
                            if(isNumberInArray(userID, entry["members"])){
                                var joinGroupButton = "";
                                if(displayCurrentUser){
                                    joinGroupButton = '<i onclick="leaveGroup('+entry["id"]+')" style="display: inline-block; margin-left: 1em" class="icon iconButton fa-sign-out"></i>';
                                }
                                $("#profile-communities").append('<div><a style="display:inline-block;" href="#homeScreen?groupID='+entry["id"]+'" class="jumplink"><div class="profile-community">'+entry["name"]+'</div></a>' +
                                        joinGroupButton + '</div>');
                            } else {
                                $("#profile-otherCommunities").append('<div><a style="display:inline-block;" href="#homeScreen?groupID='+entry["id"]+'" class="jumplink"><div class="profile-community">'+entry["name"]+'</div></a>' +
                                        '<i onclick="joinGroup('+entry["id"]+')" style="display: inline-block; margin-left: 1em" class="icon iconButton fa-sign-in"></i></div>');
                            }
                    });
}

$( document ).ready(function() {
    var urlGetUser = getUrlVar("userID");
    if(urlGetUser == undefined || urlGetUser == loggedInUserData["id"]){
        displayCurrentUser = true;
        showUserData(loggedInUserData);
        getAllCommunitiesForUser(loggedInUserData["id"]);
    } else {
        displayCurrentUser = false;
        getAndShowUserData(urlGetUser)
        getAllCommunitiesForUser(urlGetUser);
        $("#profile-otherCommunities").hide();
    }
});
	  		
