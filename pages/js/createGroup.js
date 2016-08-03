function createStore(){
    var storeName = $("#createGroup-groupName").val();
    var storeDesc = $("#createGroup-groupDesc").val();
    var csrftoken = getCookie("csrftoken");
    
    	$.post(baseDomain + "/api/groups/",
			{
				name: storeName,
				description: storeDesc,
                                csrfmiddlewaretoken: csrftoken
			},
			function(data, status){
				if(status){
					alert("Community erstellt!");
                                        window.location.assign("#");
				}
	})  
            .fail(function() {
                alert( "Konnte keinen Store erstellen..." );
            });
}

$("#createGroup-createButton").click(function( event ) {
  event.preventDefault();
  createStore();
});

$( document ).ready(function() {
});
	  