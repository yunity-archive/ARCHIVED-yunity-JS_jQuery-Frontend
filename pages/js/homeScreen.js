
var groupStores;

function addStore(id, name){
    var storeButtonString = '<a href="#store?id=' + id + '" class="jumplink"><div class="homeScreen-store">' + name + '</div></a>';
    $("#homeScreen-stores").append(storeButtonString);
}

// get Stores for current Group
function getStoresForCurrentGroup(){
    groupStores =  $.grep(storedData.getAll("stores"), function(e){return e.group == currentGroup; });  

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


// -------------- Pickup requests -------------------------

function isPickupStoreInGroup(storeID){
    return !(jQuery.isEmptyObject($.grep(groupStores, function(e){return e.id == storeID; })));
}

// filter out user pickups and display them
function displayPickupInfo(pickUps, pickupListInstance){
    var pickUpData = [];
    pickUps.forEach(function(entry, index) {
        if(isNumberInArray(loggedInUserData["id"], entry["collector_ids"])){
            if(isPickupStoreInGroup(entry["store"])){
                pickUpData.push(entry);    
            }
        }
    });
    pickupListInstance.pickupList("setData", pickUpData);
}

// get Pickups
var pickupUpdateFunc = function(pickupListInstance){
        $.ajax({
                cache: false,
                url: baseDomain + "/api/pickup-dates/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    displayPickupInfo(data, pickupListInstance);
		}
        });
}

// ---------------------------------------

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
        displayGroupInfo(storedData.getById("groups", currentGroup));

        $("#homescreen-pickups").pickupList();
        $("#homescreen-pickups").pickupList("setOptions", {headerTitle: "Your Pick-Ups", infoToShow: "store"});
        $("#homescreen-pickups").pickupList("setUpdateFunction", pickupUpdateFunc);
    
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
	  		
