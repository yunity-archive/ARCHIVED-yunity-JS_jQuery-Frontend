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
(function( $ ){

    var pickUpData =[],
        pickupArea,
        currentInstance,
        sortKeyword,
        updateFunction;
    
    var settings;
        
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
                    maxHeight: '20em' 
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
        },
        update : function() {
             updateFunction();
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
            filterButton = '<ul class="dropdown"><li><span>Filter <i class="fa fa-filter" aria-hidden="true"></i></span><ul><li><a href="#">Date</a></li><li><a href="#">Place</a></li></ul></li></ul>';
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
                var storeData = getStoreData(entry["store"]);
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
                buttonsRight = '<div class="button small leave" onclick="confirmPickupLeave('+id+",'" + currentInstance.attr("id") + "'"+ ')">leave</div></div>';
            } else if(collectorsNumber >= maxCollectors){
                buttonsRight = '<div class="button small disabled")">full!</div></div>';
            } else {
                buttonsRight = '<div class="button small" onclick="confirmPickupJoin('+id+",'" + currentInstance.attr("id") + "'"+ ')">join</div></div>';
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
/*
 * Chat with userlist, bubble-message and so on...
 * 
 * BIG TODO!
 */
(function( $ ){
    
    var recipients = [],
        currentRecipient = null,
        currentInstance;
        
        
    var settings = {
            colorSender: false,
            colorReceiver: true
    };
        
    // public methods that can be called
    var methods = {
        init : function() {
            currentInstance = this;
        }
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