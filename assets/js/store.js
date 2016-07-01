
// Look up adress in new Tab on Google
function searchForAdress(adressString){
    var adressString = replaceStringForSearch(adressString);
    window.open('https://www.google.de/maps?q='+adressString,'_blank');
}

// adds a new Pickup to the Pickup list
function addStorePickup(time, date, people){
    var newPickupStr = '<div class="homeScreen-pickup">' +
                            '<div class="leftSide">' +
                                '<div class="2u 12u(mobile) time">' + time + '</div> ' +
                                '<div class="10u store">' + date + '</div>' +
                                '<div class="people">' + people + '</div>' +
                            '</div><div class="button small join">join</div></div>';
    $("#store-pickups").append(newPickupStr);
}

// Change Strings for Google Search
function replaceStringForSearch(res) {
    res = res.replace(" ", "+"); 
    res = res.replace("-", "+"); 
    res = res.replace("&", "+"); 
    res = res.replace("<br>", "+");
    res = res.replace("<br/>", "+");
    res = res.replace(" ", "+");   
    return res;
}

// get all Stores
function getStoreData(storeID){
	$.ajax({
                cache: false,
                url: baseDomain + "/api/stores/" + storeID,
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    displayStoreData(data);
		}
	});
}

function displayStoreData(data){
    console.log(data);
    $("#store-storeName").html(data["name"]);
    $("#store-storeInfo").html(data["description"])
}

$("#store-adress-link").click(function( event ) {
  event.preventDefault();
  searchForAdress($("#store-adress-link").html().toString());
});


$( document ).ready(function() {
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addStorePickup("12:45", "Dienstag, 26.07", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    
    getStoreData(getUrlVar("id"))
});
	  		
