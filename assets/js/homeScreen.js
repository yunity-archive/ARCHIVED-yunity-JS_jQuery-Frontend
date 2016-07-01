
// adds a new Pickup to the Pickup list
function addHomeScreenPickup(id, time, place, people){
    var newPickupStr = '<div class="homeScreen-pickup">' +
                            '<div class="leftSide">' +
                                '<div class="2u 12u(mobile) time">' + time + '</div> ' +
                                '<div class="10u store">' + place + '</div>' +
                                '<div class="people">' + people + '</div>' +
                            '</div>' +
                            '<div id="homescreenPickupsButtons'+id+'"><div class="button small join" onclick="confirmHomeScreenPickupJoin('+id+')">join</div></div> </div>';
    $("#homeScreen-pickups").append(newPickupStr);
}

function confirmHomeScreenPickupJoin(id){
    $("#homescreenPickupJoinButton" + id).html("Are you sure?");
    //$("#homescreenPickupJoinButton" + id).hover(displayHomeScreenPickupConfirm(id, true), displayHomeScreenPickupConfirm(id, false));
    
    $("#homescreenPickupJoinButton" + id).hover(function() {
        $( this ).html('Yes! No');
      }, function() {
        $( this).html("Are you sure?");
      });
}

function displayHomeScreenPickupConfirm(id, setDisplay){
    alert("test" + setDisplay);
}


function addStore(id, name){
    var storeButtonString = '<a href="#store?id=' + id + '" class="jumplink"><div class="homeScreen-store">' + name + '</div></a>';
    $("#homeScreen-stores").append(storeButtonString);
}

// get Stores for current User
// TODO: filter for user
function getStoresForCurrentUser(){
	$.ajax({
                cache: false,
                url: baseDomain + "/api/stores/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    data.forEach(function(entry) {
                            addStore(entry["id"], entry["name"]);
                            refreshJumplinks();
                    });
		}
	});
}

function displayGroupInfo(data){
    $("#homeScreen-groupName").html(data["name"]);
    $("#homeScreen-groupDesc").html(data["description"]);
        
    var members = data["members"]
    members.forEach(function(entry, index) {
        addHomeScreenPickup(1, "12:45", "Group Member Test", '<a href="#profile?userID=' + entry["id"] + '" class="jumplink">' + entry["display_name"] + '</a>');
    });
}

// get User Group
function getThisGroup(){
        var groupID = getUrlVar("groupID");
        
        console.log(groupID)
        if(getUrlVar("groupID") == undefined){
            groupID = 1;
        }
        $.ajax({
                cache: false,
                url: baseDomain + "/api/groups/" + groupID + "/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    displayGroupInfo(data);
		}
        });
}


$( document ).ready(function() {
    getStoresForCurrentUser();
    getThisGroup();
});
	  		
