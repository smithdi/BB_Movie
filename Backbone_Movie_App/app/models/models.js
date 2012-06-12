//This model is used to return a list of movies that match the entered text.

define( ['jquery', 'backbone'],
        function( $, Backbone) {
            // Using ECMAScript 5 strict mode during development
            "use strict";

			var moviesModel = Backbone.Model.extend({
				movie:			'',
				searchType:		'',
					
				initialize: function() {
					return this;
				},
			
				//This url function is automatically called in a Backbone model when fetch is called, see fetchData.
				url: function() {
					var url = 'http://192.168.1.7:3000/',
				 		movie = this.movie,
						searchType = this.searchType;
			
					// build the url for the node.js server	 		
					if (movie) {
						url = url + searchType + "/" + encodeURIComponent(movie);
					} 
						
					return "movie_search.json";
				},
			
				//This method is called from the view and will pass the model details back to the view
				fetchData: function( movie, searchType, callback ) {
			
					this.movie = movie;
					this.searchType = searchType;
			
					this.fetch({
						success: function() { callback(); },
						error: function() { callback(); }
					});		
				}	
			});
		return moviesModel;
});




