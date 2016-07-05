

var storeID = getUrlVar("storeID");

function displayStoreInfo(data){
    $("#createPickup-storeName").html(data["name"]);
    storeID = data["id"];
}

function getStoreInfo(){
	$.ajax({
                cache: false,
                url: baseDomain + "/api/stores/" + getUrlVar("storeID") + "/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    displayStoreInfo(data);
		}
	});
}


function createPickup(){
    var pickupDate = $("#createPickup-datetimepicker").val();
    var numColect = $("#createPickup-numCollectors").val();
    var csrftoken = getCookie("csrftoken");
    
    console.log({
                    date: pickupDate,
                    max_collectors: numColect,
                    store: storeID,
                    csrfmiddlewaretoken: csrftoken
            });
    
    	$.post(baseDomain + "/api/pickup-dates/",
			{
				date: pickupDate,
				max_collectors: numColect,
                                store: storeID,
                                csrfmiddlewaretoken: csrftoken
			},
			function(data, status){
				if(status){
					alert("Pickup erstellt!")
                                        loadPage("store?id=" + storeID)
				}
	})  
            .fail(function() {
                alert( "Konnte kein Pickup erstellen..." );
            });
}

$("#createGroup-createButton").click(function( event ) {
  event.preventDefault();
  createPickup();
});

$( document ).ready(function() { 
    getStoreInfo()
    $('#createPickup-datetimepicker').datetimepicker({
	inline:true,
	format:'Y-m-d H:i:s'
    });
    $('#createPickup-datetimepicker').datetimepicker('reset');
    
});
	  