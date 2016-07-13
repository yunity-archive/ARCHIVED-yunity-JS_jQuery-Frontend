
var displayCurrentUser = true;

function showUserData(data){
    console.log(data)
    $("#profile-name-header").html(data["first_name"] + " " + data["last_name"]);
    $("#profile-name-subheader").html(data["display_name"]);
    $("#profile-content-email").html(data["email"]);   
    
    setDocumentTitle(data["first_name"]);
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
                        joinGroupButton = '<i onclick="api.groups.leave('+entry["id"]+')" style="display: inline-block; margin-left: 1em" class="icon iconButton fa-sign-out"></i>';
                    }
                    $("#profile-communities").append('<div><a style="display:inline-block;" href="#homeScreen?groupID='+entry["id"]+'" class="jumplink"><div class="profile-community">'+entry["name"]+'</div></a>' + joinGroupButton + '</div>');
            } else {
                $("#profile-otherCommunities").append('<div><a style="display:inline-block;" href="#homeScreen?groupID='+entry["id"]+'" class="jumplink"><div class="profile-community">'+entry["name"]+'</div></a>' +
                        '<i onclick="api.groups.join('+entry["id"]+')" style="display: inline-block; margin-left: 1em" class="icon iconButton fa-sign-in"></i></div>');
            }
    });
}

$( document ).ready(function() {
    var urlGetUser = parseInt(getUrlVar("userID"));
    if(urlGetUser == undefined || isNaN(urlGetUser) || urlGetUser == loggedInUserData["id"]){
        displayCurrentUser = true;
        showUserData(loggedInUserData);
        displayCommunitiesForUser(loggedInUserData["id"], storedData.getAll("groups"));
    } else {
        displayCurrentUser = false;
        showUserData(storedData.getById("users", urlGetUser));
        displayCommunitiesForUser(urlGetUser, storedData.getAll("groups"));
        console.log(storedData.getAll("groups"));
        
        //var userCommunities = storedData.getByFunction("groups", function(a, urlGetUser){return isNumberInArray(urlGetUser, a.members);});
        //$("#profile-otherCommunities").hide();
    }
});