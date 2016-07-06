

// Look up adress in new Tab on Google
function searchForAdress(adressString){
    var adressString = replaceStringForSearch(adressString);
    window.open('https://www.google.de/maps?q='+adressString,'_blank');
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
    setDocumentTitle(data["name"]);
}

$("#store-adress-link").click(function( event ) {
  event.preventDefault();
  searchForAdress($("#store-adress-link").html().toString());
});

// get Pickups
var pickupUpdateFunc = function(){
        
        $.ajax({
                cache: false,
                url: baseDomain + "/api/pickup-dates/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    var storeID = getUrlVar("id");
                    data = $.grep(data, function(e){ return e.store == storeID; });
                    $("#store-pickups").pickupList("setData", data);
		}
        });
}

$( document ).ready(function() {
    getStoreData(getUrlVar("id"));
    
    $("#store-pickups").pickupList();
    $("#store-pickups").pickupList("setOptions", {storeID: getUrlVar("id"), infoToShow: ""});
    $("#store-pickups").pickupList("setUpdateFunction", pickupUpdateFunc);
    $("#store-pickups").pickupList("update");
    //getAndDisplayPickups();
    
});
	  		
