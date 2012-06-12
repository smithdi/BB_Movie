//This model is used to return movie information related to the selected movie from the list screen.
//A second model is also required for some of the movie information.  The Movie Rating is stored within a MovieRelease model.

define( ['jquery', 'backbone'],
        function( $, Backbone) {
            // Using ECMAScript 5 strict mode during development.
            "use strict";

			var MovieDetailsModel = Backbone.Model.extend({
				movie:			'',
				searchType:		'',
					
				initialize: function() {
					return this;
				},
			
				//This url function is automatically called in a Backbone model when fetch is called, see fetchData.
				url: function() {
					var url = 'http://localhost:3000/',
						params = '',
				 		movie = this.id,
						searchType = this.searchType;
				 	
					//CHECK NODE SERVER FOR CORRECT URL
					if (movie) {
						url = url + searchType + "/" + encodeURIComponent(movie);
					} 
						
					//return url;
					return "movie_details.json";
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
		return MovieDetailsModel;
});




