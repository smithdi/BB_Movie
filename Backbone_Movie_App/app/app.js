//app.js

//Require pulls in the modules/libraries required.
//The AppView which is main view is created along with the Router.  And the Backbone history is started, this most be done after the DOM is built

define( ['backbone', 'views/appview', 'routers/routers'],
        function( Backbone, AppView, Routers) {
            // Will throw errors
            "use strict";
           
           $(function(){
            
	        	
				var appview = new AppView();
				var routers = new Routers();
				
				Backbone.history.start();
           });

        } );
