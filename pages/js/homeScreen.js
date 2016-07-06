
var groupStores;

function displayHomeScreenPickupConfirm(id, setDisplay){
    alert("test" + setDisplay);
}


function addStore(id, name){
    var storeButtonString = '<a href="#store?id=' + id + '" class="jumplink"><div class="homeScreen-store">' + name + '</div></a>';
    $("#homeScreen-stores").append(storeButtonString);
}

// get Stores for current Group
function getStoresForCurrentGroup(){
    console.log(storedStoreData);
    groupStores =  $.grep(storedStoreData, function(e){return e.group == currentGroup; });  

    groupStores.forEach(function(entry) {
            addStore(entry["id"], entry["name"]);
            refreshJumplinks();
    });
}

function displayGroupInfo(data){
    $("#homeScreen-groupName").html(data["name"]);
    $("#homeScreen-groupDesc").html(data["description"]);
    setDocumentTitle(data["name"]);
}

// get User Group
function getThisGroup(){
        $.ajax({
                cache: false,
                url: baseDomain + "/api/groups/" + currentGroup + "/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    displayGroupInfo(data);
		}
        });
}

function isPickupStoreInGroup(storeID){
    return !(jQuery.isEmptyObject($.grep(groupStores, function(e){return e.id == storeID; })));
}

// filter out user pickups and display them
function displayPickupInfo(pickUps){
    var pickUpData = [];
    pickUps.forEach(function(entry, index) {
        if(isNumberInArray(loggedInUserData["id"], entry["collector_ids"])){
            if(isPickupStoreInGroup(entry["store"])){
                pickUpData.push(entry);    
            }
        }
    });
    $("#homescreen-pickups").pickupList("setData", pickUpData);
}

// get Pickups
var pickupUpdateFunc = function(){
        $.ajax({
                cache: false,
                url: baseDomain + "/api/pickup-dates/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    displayPickupInfo(data);
		}
        });
}

$("#homescreen-createStoreButton").click(function(e) {
    e.preventDefault();
    loadPage("createStore?groupID=" + currentGroup);
});

$( document ).ready(function() {

    
    if(getUrlVar("groupID") != undefined){
        currentGroup = getUrlVar("groupID");
    }
    
    if(currentGroup != null){
        getStoresForCurrentGroup();
        getThisGroup();

        $("#homescreen-pickups").pickupList();
        $("#homescreen-pickups").pickupList("setOptions", {headerTitle: "Your Pick-Ups", infoToShow: "store"});
        $("#homescreen-pickups").pickupList("setUpdateFunction", pickupUpdateFunc);
        $("#homescreen-pickups").pickupList("update");
    
    } else {
        
        if(loggedInUserData["id"] != null){
            $("#homeScreen-groupName").html("Please pick community first...");
            setTimeout(function(){loadPage("profile");}, 2000);
        } else {
            $("#homeScreen-groupName").html("Please login first...");
            setTimeout(function(){loadPage("login");}, 2000);
        }
    }
    
    
    //getStoreData(getUrlVar("id"));
});
	  		
