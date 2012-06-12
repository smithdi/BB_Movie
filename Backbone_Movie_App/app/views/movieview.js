//This is the View for the Movie Details.
//It will query two models as the Movie Release information, e.g. Rating, requires a different API call to the rest of the details.

define( ['jquery', 'jquerymobile', 'underscore', 'backbone', 'mustache', 'jqueryMustache', 'models/movie', 'models/movieRelease', 'text!templates/moviesview.html'],
        function( $, jquerymobile, _, Backbone, Mustache, jQueryMustache, MovieDetailsModel, MovieReleaseModel, MovieDetailsTemplate ) {
            "use strict";

			var movieListView = Backbone.View.extend({
				el: $('#movieview'),
				
				//Handles a click event on the Movie Overview section which will display the movie summary page.
				events: {
                    "click .movieDetailsClick": "clickLink"
                },
				
				initialize: function() {
					var self = this;
					var id = '';
					var movieReleaseInfo = "";
					var movieDetailsInfo = "";
					
					//Used to reference the Mustache template on index.html
					this.template = $('#movie-details-template');
					
					//Will need a second model to bring back the release info for Rating
					this.model = new MovieDetailsModel;
					this.modelRelease = new MovieReleaseModel;
					

				},
				
				clickLink: function(e) {
					
					var url = '#movieoverview',
								effect = 'slideup',
								reverse = false,
								changeHash = false;
					$.mobile.changePage( url , { transition: effect}, reverse, changeHash );

				},
				
				fetch: function( id, searchType ) {

					var self = this;
					
					this.id = id;

					//Calls the fetchData method within the model which will return the movie details from the server.
					this.model.fetchData( id, searchType, function() {
						self.renderResults();
					});	
				
			
				},
				
				//This renderResults method will call the FetchData method from the MovieRelease model and then call the populateTemplate method to 
				//display information from both models.
				renderResults: function() {
					var self = this;
					var releaseInfo = '';
					var id = this.id;
					//Check what is required for the web service
					var searchType = "release";
					
					this.modelRelease.fetchData( id, searchType, function() {
						releaseInfo = self.renderReleaseResults();
						self.populateTemplate();
					});	
				},
				
				//Calls the Movie Release model
				renderReleaseResults: function() {
					var self = this;
					
					this.movieReleaseInfo = self.modelRelease.toJSON();
					
					return this.movieReleaseInfo;
				},
				
				//Used to create the View from the results of both models.
				populateTemplate: function() {
					var self = this;
					
					var movieDetails = self.model.toJSON();
					var movieReleaseDetails = self.modelRelease.toJSON();
					
					var template = this.template,
						listView = $(this.el);	
					
					//Convert the Movie Runtime into Hours and Minutes
					var movieRuntime = Math.floor(parseInt(movieDetails.runtime) / 60);
					movieRuntime = movieRuntime + "hrs " + (parseInt(movieDetails.runtime) % 60) + "mins.";

					//Get a list of the genres
					var genres = movieDetails.genres;
				    var name = "";
				    var i = 0;
				    
				    _.each( genres, function( genreItem, j) {
				        if (name == '') {
				            name = JSON.stringify(genreItem.name);
				        } else {
				            name = name + ", " + JSON.stringify(genreItem.name);
				        }
				    });
				    
				    var certUK = '';
				    var countries = movieReleaseDetails.countries;
				    _.each(countries, function(item, i) {
						if (item.iso_3166_1 == "GB") {
							certUK = item.certification;
						}
					});

				    //As Mustache is a logic free templating engine, the required information is all gathered here, Genre List, Runtime converted to hrs and mins etc..
				    //A JSON string is then compiled with all the necessary information which is then passed to the template on index.html
					var mustacheMovieDetails = {
							id:					movieDetails.id,
							title:				movieDetails.title,
							poster_path:		"http://cf2.imgobject.com/t/p/w92" + movieDetails.poster_path,
							overview:			movieDetails.overview.substring(0,100),
							release_date:		movieDetails.release_date.substring(0,4),
							full_release_date:	movieDetails.release_date,
							rating:				movieDetails.vote_average,
							runtime:			movieRuntime,
							tagLine:			movieDetails.tagline,
							genres:				name,
							cert:				certUK
					};
					
					listView.append(template.mustache(mustacheMovieDetails));
					
					var url = '#movie',
					effect = 'slideup',
					reverse = false,
					changeHash = false;

					localStorage.setItem("overview", movieDetails.overview);
					
					listView.listview();
					listView.listview('refresh');
	
					//Set localStorage for back navigation
					localStorage.setItem('movieDetailsItem', JSON.stringify(mustacheMovieDetails));
				}
			});		
		
		return movieListView;
		
	});