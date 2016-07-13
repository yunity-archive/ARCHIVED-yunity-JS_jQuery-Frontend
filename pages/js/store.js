

// Look up adress in new Tab on Google
function searchForAdress(adressString){
    var adressString = replaceStringForSearch(adressString);
    window.open('https://www.google.de/maps?q='+adressString,'_blank');
}

/**
 * Changes a String in a way that google-maps can handle it
 * @param {String} Adress-String
 * @returns {String}
 */
function replaceStringForSearch(res) {
    res = res.replace(/ /g,'')
    res = res.replace("-", "+"); 
    res = res.replace("&", "+"); 
    res = res.replace("<br>", "+");
    res = res.replace("<br/>", "+");
    
    return res;
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
var pickupUpdateFunc = function(pickupListInstance){
        $.ajax({
                cache: false,
                url: baseDomain + "/api/pickup-dates/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    var storeID = getUrlVar("id");
                    data = $.grep(data, function(e){ return e.store == storeID; });
                    pickupListInstance.pickupList("setData", data);
		}
        });
}

$( document ).ready(function() {
    displayStoreData(storedData.getById("stores", getUrlVar("id")));
    
    $("#store-pickups").pickupList();
    $("#store-pickups").pickupList("setOptions", {storeID: getUrlVar("id"), infoToShow: "", showFilterButton: true});
    $("#store-pickups").pickupList("setUpdateFunction", pickupUpdateFunc);    
});
	  		
