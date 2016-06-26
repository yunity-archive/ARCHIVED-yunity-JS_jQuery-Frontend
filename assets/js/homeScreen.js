
// adds a new Pickup to the Pickup list
function addHomeScreenPickup(time, place, people){
    var newPickupStr = '<div class="homeScreen-pickup">' +
                            '<div class="leftSide">' +
                                '<div class="2u 12u(mobile) time">' + time + '</div> ' +
                                '<div class="10u store">' + place + '</div>' +
                                '<div class="people">' + people + '</div>' +
                            '</div><div class="button small join">join</div></div>';
    $("#homeScreen-pickups").append(newPickupStr);
}

$( document ).ready(function() {
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
    addHomeScreenPickup("12:45", "Arheilgener Backstübchen", '<a href="#profile" class="jumplink">Lars</a>, Flo..');
});
	  		
