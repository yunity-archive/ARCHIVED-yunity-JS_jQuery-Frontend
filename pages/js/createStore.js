

var groupID = 0;
function displayGroupInfo(data){
    $("#createStore-groupName").html(data["name"]);
    groupID = data["id"];
}

function createStore(){
    var storeName = $("#createStore-storeName").val();
    var storeDesc = $("#createStore-storeDesc").val();
    var csrftoken = getCookie("csrftoken");
    
    	$.post(baseDomain + "/api/stores/",
			{
				name: storeName,
				description: storeDesc,
                                group: groupID,
                                csrfmiddlewaretoken: csrftoken
			},
			function(data, status){
				if(status){
					alert("Store erstellt!")
                                        loadPage("homeScreen?groupID=" + getUrlVar("groupID"))
				}
	})  
            .fail(function() {
                alert( "Konnte keinen Store erstellen..." );
            });
}

$("#createStore-createButton").click(function( event ) {
  event.preventDefault();
  createStore();
});

$( document ).ready(function() {
    displayGroupInfo(storedData.getById("groups", getUrlVar("groupID")));
});
	  