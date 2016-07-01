

var groupID = 0;
function displayGroupInfo(data){
    $("#createStore-groupName").html(data["name"]);
    groupID = data["id"];
}


function getGroupInfo(){
	$.ajax({
                cache: false,
                url: baseDomain + "/api/groups/" + getUrlVar("groupID") + "/",
		method: 'GET',
		dataType: "json",
		success : function(data) {
                    displayGroupInfo(data);
		}
	});
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
                                        loadPage("homeScreen")
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
    getGroupInfo()
});
	  