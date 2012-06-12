//This is the View that is loaded when the app is initiated.

define( ['jquery', 'backbone'],
        function( $, Backbone ) {	
            // Using ECMAScript 5 strict mode during development.
            "use strict";


            var AppView = Backbone.View.extend( {
                el: $( "#appview" ),
                
                //Used to handle the keydown event on the search field
                events: {
                    "keydown #search" : "handleKey"
                },

                //This is the function called when there is an keydown event. See above
                handleKey : function( event ) {
                	var key =  event.keyCode ? event.keyCode : e.which;
                	
                	//At the moment a call to the server (through the router) is only done when enter is pressed.
    				if(key == 13)
    				{
    					var movie = $( '#search' ).val();
    					if (movie) {
    						
    						var urlString = 'search/' + movie;
							
							var url = '#search',
								effect = 'slideup',
								reverse = false,
								changeHash = false;
							
							//Store movie search string in localstorage to be used within the router
							//Issue with passing as part of the changepage/hashchange. Issue between jQuery and Backbone. 
							//Look at this again!!!
							localStorage.setItem("searchTerm", movie);

							$.mobile.changePage( url , { transition: effect}, reverse, changeHash );
                		}
                	}
                }
            } );

            return AppView;
        } );





