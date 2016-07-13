function renewDropdowns(){
    //******** dropdown menus **********
    $('.dropdown').hover(function() {
	  $('ul', this).stop().slideDown(200);
        },function() {
            $('ul', this).stop().slideUp(200);
        });
        
    $('.dropdown').bind('touchstart', function(e) {
        e.preventDefault();
        $('.dropdown ul').hide();
	$('ul', this).slideDown(200);
    });
    $('.dropdown').bind('touchend', function(e) {
        e.preventDefault();
        $('ul', this).delay(1000).slideUp(200);
    });
}

/************************* PickupList Component *************************************/

/**
 * Pickup List
 * 
 * To be created, it needs to be called blanc once "*.pickupList()", 
 * then, it needs to have an update-function, which it can call to update.
 * the update
 */
(function( $ ){

    var pickUpData =[],
        pickupArea,
        currentInstance,
        sortKeyword,
        updateFunction,
        settings;
        
    // public methods that can be called
    var methods = {
        init : function() {
            settings = {
                    reversed: false,
                    showHeaderDates: true,
                    sortKeyword: "date",
                    infoToShow: "date",
                    showSortButton: true,
                    showFilterButton: false,
                    storeID: -1,
                    headerTitle: 'Pick-Ups',
                    maxHeight: '20em',
                    filter: '',
            };
            currentInstance = this;
            _recreateMenu();
        },
        setData : function(data) {
             _clear();
            data.forEach(function(entry) {
                            entry["date"] = new Date(entry["date"]);
                    });
            pickUpData = data;
            _update();
        },
        setUpdateFunction : function(data) {
             updateFunction = data;
             updateFunction(currentInstance);
        },
        update : function() {
             updateFunction(currentInstance);
        },
        clear : function() {
            _clear();
        },
        setOptions : function(options){
            settings = $.extend(settings, options );
            _recreateMenu();
            _update();
        },
        sortBy: function(keyword){
            sortKeyword = keyword;
        },
        toggleReversed: function(){
            settings.reversed = !settings.reversed;
            _recreateMenu();
            _update();
        }
    };
    
    var _clear = function(){
        pickupArea.html("");
        pickUpData = null;
    };
    
    var _recreateMenu = function() {
        currentInstance.html("");
        var filterButton = "";
        var sortButton = "";
        var addPickupButton = "";
        
        if(settings.showFilterButton){
            var openPanelActive = '';
            var joinedPanelActive = '';
            
            if(settings.filter == 'open'){
                openPanelActive = ' style="background-color: #004400" ';
            }
            if(settings.filter == 'joined'){
                joinedPanelActive = ' style="background-color: #004400" ';
            }
            filterButton = '<ul class="dropdown"><li><span>Filter <i class="fa fa-filter" aria-hidden="true"></i></span><ul><li><a '+joinedPanelActive+'class="pickup-filter-joined">joined</a></li><li><a '+openPanelActive+' class="pickup-filter-open">open</a></li></ul></li></ul>';
        }
        if(settings.showSortButton){
            if(settings.reversed)
                sortButton = '<span style="cursor: pointer" onclick="$(this).parent().pickupList(' + "'toggleReversed'" + ')">Sort <i class="fa fa-angle-up" aria-hidden="true"></i></span>';
            else
                sortButton = '<span style="cursor: pointer" onclick="$(this).parent().pickupList(' + "'toggleReversed'" + ')">Sort <i class="fa fa-angle-down" aria-hidden="true"></i></span>';
        }
        if(settings.storeID != -1){
            addPickupButton = '<a class="jumplink" href="#createPickup?storeID=' + settings.storeID + '"><i style="display: inline; margin-left: 1em" class="icon iconButton fa-plus-circle"></i></a>';
        }
        currentInstance.append('<h3 style="display:inline"><i class="icon fa fa-shopping-basket" aria-hidden="true"></i>' + settings.headerTitle + '</h3>' + addPickupButton + '<span style="margin-left: .5em;"/>' + filterButton + sortButton);
        pickupArea = $('<div class="pickupList-pickupArea" style="max-height: '+ settings.maxHeight +';"></div>');
        currentInstance.append(pickupArea);
        renewDropdowns();
        
        if(settings.showFilterButton){
            $("#" + currentInstance.attr("id") + " .pickup-filter-joined").click(function(){
                if(settings.filter == 'joined'){
                    settings.filter = '';
                } else {
                    settings.filter = 'joined';
                }
                _recreateMenu();
                _update();
            });
            $("#" + currentInstance.attr("id") + " .pickup-filter-open").click(function(){
                if(settings.filter == 'open'){
                    settings.filter = '';
                } else {
                    settings.filter = 'open';
                }
                _recreateMenu();
                _update();
            });
        }
    };
    
    // comparable for sorting algorithm
    var _compareFunction = function(a,b) {
            if (a[settings.sortKeyword] > b[settings.sortKeyword])
              return (settings.reversed) ? -1 : 1;
            if (a[settings.sortKeyword] < b[settings.sortKeyword])
              return (settings.reversed) ? 1 : -1;
            return 0;
        };
    
    // needed to compare to Dates without their times
    Date.prototype.withoutTime = function () {
        var d = new Date(this);
        d.setHours(0, 0, 0, 0, 0);
        return d;
    };
    
    var _isDifferentDate = function(a, b){
        return a.withoutTime().getTime() !== b.withoutTime().getTime();
    };
    
    var _addLeadingZeros = function(num, size) {
        var s = "0000" + num;
        return s.substr(s.length-size);
    }
    
    // updates List to match pickupData
    var _update = function(){
        if(pickUpData == []){
            return;
        }
        pickupArea.html("");
        pickUpData.sort(_compareFunction);
        var prevEntry = null;
        pickUpData.forEach(function(entry) {
                if(settings.showHeaderDates && (prevEntry == null ||  _isDifferentDate(entry["date"], prevEntry["date"]) )){
                    pickupArea.append('<span class="pickupList-Header-infoString">' + entry["date"].toLocaleDateString() + '</span>');
                }
                prevEntry = entry;
                _displayEntry(entry);
            });        
        refreshJumplinks();
    };
    
    // gets all the information ready. Adds the pickup afterwards.
    var _displayEntry = function(entry) {
            var time = entry["date"];
            var timeToDisplay = _addLeadingZeros(time.getHours(), 2) + ":" + _addLeadingZeros(time.getMinutes(), 2);
            var info = "";
            if(settings.infoToShow == "date"){
                info = time.toLocaleDateString();
            } else if(settings.infoToShow == "store"){
                var storeData = storedData.getById("stores", entry["store"]);
                info = '<a class="jumplink" href="#store?id=' + storeData["id"] + '">' + storeData["name"] + '</a>';
            }
            _addPickup(entry["id"], timeToDisplay, info, entry["collector_ids"], entry["max_collectors"]);
        };
        
    var _isLoggedUserMember = function(people){
        return isNumberInArray(loggedInUserData["id"], people);
    };
    
    // adds a pickup at the end of the list
    var _addPickup = function(id, time, info, people, maxCollectors) {
            var buttonsRight = "";
            var collectorsNumber = people.length;
            var collectorAmountString = '<span style="font-size: 10pt;">('+collectorsNumber + "/" + maxCollectors + ')</span>';
            
            if(_isLoggedUserMember(people)){
                if(settings.filter == 'open') return;
                buttonsRight = '<div class="button small leave" onclick="api.pickups.leave('+id+",'" + currentInstance.attr("id") + "'"+ ')">leave</div></div>';
            } else if(collectorsNumber >= maxCollectors){
                if(settings.filter == 'joined') return;
                if(settings.filter == 'open') return;
                buttonsRight = '<div class="button small disabled")">full!</div></div>';
            } else {
                if(settings.filter == 'joined') return;
                buttonsRight = '<div class="button small" onclick="api.pickups.join('+id+",'" + currentInstance.attr("id") + "'"+ ')">join</div></div>';
            }
            
            people = mapUserArray(people);
            var peopleString = "";
            people.forEach(function(entry, index) {
                peopleString = peopleString + '<a href="#profile?userID='+entry["id"]+'" class="jumplink pickupMember">' + entry["first_name"] + '</a>';
            });
            var newPickupStr = '<div class="pickupList-pickup">' +
                                '<div class="leftSide">' +
                                    '<div class="2u 12u(mobile) time">' + time + '</div> ' +
                                    '<div class="10u store">' + info + '</div>' +
                                    '<div class="people">' + peopleString + collectorAmountString +'</div>' +
                                '</div>' +
                                '<div id="pickupList-pickup-Buttons'+id+'">' + buttonsRight + '</div>';
            pickupArea.append(newPickupStr);
        };

    $.fn.pickupList = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
        }    
    };


})( jQuery );

/************************* ChatWindowBig Component *************************************/
/**
 * Chat with userlist, bubble-message and so on...
 * BIG TODO!
 */
(function( $ ){
    
    var recipients = [],
        currentRecipient = null,
        currentInstance,
        updateFunction,
        currentInstanceUserlist,
        currentInstanceMessages,
        settings;
        
    // public methods that can be called
    var methods = {
        init : function() {
            settings = {};
            currentInstance = this;
            currentInstanceUserlist = $('<div id="chatWindow-users" class="4u" style="height: 30em; overflow-y: auto;">');
            currentInstance.append(currentInstanceUserlist);
            currentInstanceMessages = $('<div id="chat-messages" style="height: 24em" class="8u 12u(mobile)">');
            currentInstance.append(currentInstanceMessages);
            currentInstance.append('<div class="8u 12u(mobile)" style="height: 6em; padding: 2em">'+
                    '<div style="width: 100%; position: relative">'+
                        '<div id="chat-message-textarea-div"><textarea rows="1" id="chat-message-textarea" style="width: 100%"placeholder="Your message..." type="text"></textarea></div>'+
                            '<div id="chat-message-send" class="button small" style="height:3em; margin: 0.2em;">send</div>'+
                    '</div></div>');
        },
        setRecipients: function(usersArray){
            recipients = usersArray;
            _createUserList();
            
            /*currentInstanceUserlist.panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    visibleClass: '4u'
            });*/
            
            
        }
    };
    
    var _createUserList = function(){
        recipients.forEach(function(entry, index) {
		if(recipients[index]["id"] == currentRecipient){
			currentInstanceUserlist.append('<a id="chat-chatUserButton' + recipients[index]["id"] + '" class="chat-user active">'+entry["display_name"]+'</a>');
                        $('#chat-chatUserButton' + recipients[index]["id"]).on("click", function(){hideChatUsersPanel();});
		} else {
			currentInstanceUserlist.append('<a id="chat-chatUserButton' + recipients[index]["id"] + '" class="chat-user">'+entry["display_name"]+'</a>');						
                        $('#chat-chatUserButton' + recipients[index]["id"]).on("click", function(){changeCurrentRecipient(recipients[index]["id"]);});
                }
            });
    };
    

    $.fn.chatWindowBig = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
        }    
    };


})( jQuery );