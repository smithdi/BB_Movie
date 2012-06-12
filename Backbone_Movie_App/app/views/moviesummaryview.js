//This View handles the MovieSummary page.
//No call to a model is required here as the necessary information is all stored within the LocalStorage.

define( ['jquery', 'jquerymobile', 'underscore', 'backbone', 'mustache', 'jqueryMustache', 'models/movie', 'models/movieRelease', 'text!templates/moviesview.html'],
        function( $, jquerymobile, _, Backbone, Mustache, jQueryMustache, MovieDetailsModel, MovieReleaseModel, MovieDetailsTemplate ) {
            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";

			var movieSummaryView = Backbone.View.extend({
				el: $('#moviesummary'),			
				
				initialize:	function() {
					this.template = $('#movie-overview-template');
				},
				
				//This render function is called from the router and is used to display the localStorage item 'overview'
				render:	function() {
				
					var summary = localStorage.getItem("overview");					
					summary = '{"overview": "' + summary + '"}';

					var modelSummary = JSON.parse(summary);

					var container = this.options.viewContainer,
						listView = $(this.el),
						template = this.template;

					$(this.el).empty();
					

					var mustacheMovieSummary = {
						overview:		modelSummary.overview
					};
					
					listView.append(template.mustache(mustacheMovieSummary));
					
					var url = '#movieoverview',
						effect = 'slideup',
						reverse = false,
						changeHash = false;
				
					$.mobile.changePage( url , { transition: effect}, reverse, changeHash );
				}
			});
			
		return movieSummaryView;
		
	});